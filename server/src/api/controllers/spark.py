import pyspark
from pyspark.sql import SparkSession
from pyspark.ml.classification import GBTClassifier,GBTClassificationModel
from pyspark.sql.types import DoubleType
from pyspark.sql.functions import udf
from pyspark.sql.types import FloatType
from pyspark.sql.types import StructType,StructField,LongType, StringType,DoubleType,TimestampType



jars = ",".join(['/Downloads/aws-java-sdk-bundle-1.11.199.jar',
                 '/Downloads/hadoop-aws-3.0.0.jar',
                 '/Downloads/hadoop-common-3.0.0.jar'])



spark = SparkSession.builder \
            .appName("CAaas") \
            .getOrCreate()

spark._jsc.hadoopConfiguration().set("fs.s3a.access.key", AWS_ACCESS_KEY_ID)
spark._jsc.hadoopConfiguration().set("fs.s3a.secret.key", AWS_SECRET_ACCESS_KEY)
spark._jsc.hadoopConfiguration().set("fs.s3a.impl","org.apache.hadoop.fs.s3a.S3AFileSystem")
spark._jsc.hadoopConfiguration().set("com.amazonaws.services.s3.enableV4", "true")
spark._jsc.hadoopConfiguration().set("fs.s3a.aws.credentials.provider","org.apache.hadoop.fs.s3a.BasicAWSCredentialsProvider")
spark._jsc.hadoopConfiguration().set("fs.s3a.endpoint", "us-east-2.amazonaws.com")



gbt1 = GBTClassificationModel.load("GBM_model.model_tab")





schema = StructType( \
                     [StructField("id", StringType(),True), \
                      StructField("gender", StringType(), True), \
                      StructField("age", StringType(), True), \
                      StructField('hypertension', StringType(), True), \
                      StructField("heart_disease", StringType(), True), \
                      StructField("ever_married", StringType(), True), \
                      StructField("work_type", StringType(), True), \
                      StructField("Residence_type", StringType(), True),\
                      StructField("avg_glucose_level", StringType(), True), \
                      StructField("bmi", StringType(), True), \
                      StructField("smoking_status", StringType(),True), \
                      StructField("stroke", StringType(), True)
                        ])


print("Model Loaded")

print("+"*117)


sourceStream=spark.readStream.format("csv").option("header",True).\
schema(schema).option("ignoreLeadingWhiteSpace",True).\
option("mode","dropMalformed").\
option("maxFilesPerTrigger",1).\
load("s3a://casstream/input_folder")

sourceStream.createOrReplaceTempView("df")

df_1 = spark.sql('''
select *, 
case when trim(upper(gender)) ='MALE' then 1 else 0 end as gender_flg,
case when trim(upper(ever_married))=='YES' then 0 else 1 end as ever_marriedIndex,
case when trim(upper(work_type))=='Private' then 0 
when trim(upper(work_type))=='Self-employed' then 1
when trim(upper(work_type))=='Govt_job' then 3
else 2 end as work_typeIndex,
case when trim(upper(Residence_type))=='URBAN' then 0 else 1 end as Residence_typeIndex,
case when trim(upper(smoking_status))=='FORMARLY SMOKED' then 2 
when trim(upper(smoking_status))=='SMOKES' then 0
when trim(upper(smoking_status))=='UNKNOWN' then 1
else 3 end as smoking_statusIndex
from df
''')


numeric_cols=['age', 'hypertension', 'heart_disease', 'avg_glucose_level', 'bmi']
for col in numeric_cols:
    df_1 = df_1.withColumn(col, df_1[col].cast(DoubleType()))


df_model = df_1.fillna(value=0)


pred_list = [ 'gender_flg','age', 'hypertension', 'heart_disease', 'avg_glucose_level', 'bmi', 'ever_marriedIndex', 'work_typeIndex', 'Residence_typeIndex', 'smoking_statusIndex']

from pyspark.ml.feature import VectorAssembler

vectorAssembler = VectorAssembler(inputCols=pred_list,
                                  outputCol="features")
                                  
features_vectorized = vectorAssembler.transform(df_model)




preds = gbt1.transform(features_vectorized)

###
# returns predictions

 
firstelement=udf(lambda v:float(v[1]),FloatType())

results =  preds.select(['id',firstelement('probability')])



print("+"*117)

print("Scoring")

print("+"*117)


##results.writeStream.format("console").start()




results.writeStream.format("csv")  \
  .trigger(processingTime="10 seconds")\
  .option("checkpointLocation", "checkpoint/")\
  .option("path", "s3a://casstream/output_folder/")\
  .outputMode("append")\
  .start()\
  .awaitTermination()

print("+"*117)