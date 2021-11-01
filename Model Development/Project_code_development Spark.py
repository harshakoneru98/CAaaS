from pyspark.ml.feature import StringIndexer


df = spark.read.option("header","true").csv("/Users/satwant/Downloads/healthcare-dataset-stroke-data.csv")


cat_cols = ["ever_married", "work_type","Residence_type", "smoking_status"]

for col in cat_cols:
    indexer = StringIndexer(inputCol=col, outputCol=col + "Index")
    df = indexer.fit(df).transform(df)
df.show()


from pyspark.sql.types import DoubleType

numeric_cols=['age', 'hypertension', 'heart_disease', 'avg_glucose_level', 'bmi']
for col in numeric_cols:
    df = df.withColumn(col, df[col].cast(DoubleType()))


df_model = df.fillna(value=0)


from pyspark.sql.functions import col,sum
df_model.select(*(sum(col(c).isNull().cast("int")).alias(c) for c in df_model.columns)).show()


pred_list = [ 'age', 'hypertension', 'heart_disease', 'avg_glucose_level', 'bmi', 'ever_marriedIndex', 'work_typeIndex', 'Residence_typeIndex', 'smoking_statusIndex']

from pyspark.ml.feature import VectorAssembler

vectorAssembler = VectorAssembler(inputCols=pred_list,
                                  outputCol="features")
                                  
features_vectorized = vectorAssembler.transform(df_model)

features_vectorized.show()

from pyspark.ml.feature import Normalizer

normalizer = Normalizer(inputCol="features", outputCol="features_norm", p=1.0)
l1NormData = normalizer.transform(features_vectorized)
l1NormData.show()

from pyspark.sql.types import IntegerType

l1NormData = l1NormData.withColumn("stroke_int", df["stroke"].cast(IntegerType()))


splits = l1NormData.randomSplit([0.8, 0.2])
df_train = splits[0]
df_test = splits[1]




from pyspark.ml.classification import GBTClassifier
gbt = GBTClassifier(labelCol="stroke_int", featuresCol="features_norm", maxIter=10)


from pyspark.ml import Pipeline

pipeline = Pipeline(stages=[gbt])
  
model = pipeline.fit(df_train)
prediction = model.transform(df_train)
prediction.printSchema()

from pyspark.ml.evaluation import MulticlassClassificationEvaluator
binEval = MulticlassClassificationEvaluator().setMetricName("accuracy") .setPredictionCol("prediction").setLabelCol("stroke_int")
    
train_accuracy = binEval.evaluate(prediction)


## 0.9583538689009364    

prediction = model.transform(df_test)
from pyspark.ml.evaluation import MulticlassClassificationEvaluator
binEval = MulticlassClassificationEvaluator().setMetricName("accuracy") .setPredictionCol("prediction").setLabelCol("stroke_int")
    
test_accuracy = binEval.evaluate(prediction)

## 0.9439163498098859

print("Train Data Accuracy for GBM Model : {}".format(round(train_accuracy,3)))

print("Test Data Accuracy for GBM Model : {}".format(round(test_accuracy,3)))

binEval = MulticlassClassificationEvaluator().setMetricName("f1") .setPredictionCol("prediction").setLabelCol("stroke_int")
    
test_accuracy = binEval.evaluate(prediction)


from pyspark.mllib.evaluation import MulticlassMetrics


    

