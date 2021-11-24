import pandas as pd
import sys
import numpy as np
import pickle
import io
import os
import boto3
from dotenv import load_dotenv


load_dotenv()

impute_dict = {'gender':{'Male':1,'Female':0,'Other':2},
              'ever_married':{'Yes':1,'No':0},
              'hypertension':{'Yes':1,'No':0},
              'heart_disease':{'Yes':1,'No':0},
               'work_type':{'Private Job':2,'Self Employed / Business':3,'Government Job':0,'Children':4,'Not Working':1},
               'Residence_type':{'Rural':0,'Urban':1},
               'smoking_status':{'Prefer not to say':0,'Never Smoked':2,'Formerly Smoked':1,'Smokes':3}
              }

fileName = sys.argv[1]

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_KEY")
TABLE_BUCKET = os.getenv("TABLE_BUCKET")

s3_client = boto3.client("s3", aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)


data = s3_client.get_object(Bucket=TABLE_BUCKET, Key=fileName)

status = data.get("ResponseMetadata", {}).get("HTTPStatusCode")

if status == 200:
    # print(f"Successful S3 get_object response. Status - {status}")
    df_data = pd.read_csv(data.get("Body"))
    # print(df_data)
# else:
    # print(f"Unsuccessful S3 get_object response. Status - {status}")


prediction_data = df_data.replace(impute_dict).fillna(0)

preds = ['gender',
 'age',
 'hypertension',
 'heart_disease',
 'ever_married',
 'work_type',
 'Residence_type',
 'avg_glucose_level',
 'bmi',
 'smoking_status']

# load
with open('src/api/controllers/model.pkl', 'rb') as f:
    clf2 = pickle.load(f)

predictions = clf2.predict_proba(prediction_data[preds].values)


for i in range(len(predictions)):
    print(round(predictions[i][1],3))

