# Clinical Authentication as a Service (CAaaS)

## About
An ML Application where medical facilities, hospitals and even patients can push their medical attributes and clinical history like Blood Pressure, Weight, Height, Demographics, blood test reports, X-Ray images and ECG Reports and the application would generate a Clinical Risk Score based on Computer Vision and Probabilistic Models.

DEMO 👉  [https://drive.google.com/file/d/1rS7xpItZSotGmn-d4KCcn0_pCqHxUUtd/view?usp=sharing](https://drive.google.com/file/d/1rS7xpItZSotGmn-d4KCcn0_pCqHxUUtd/view?usp=sharing)

## Technology Stack
- React
- Next.js
- Node.js
- Python
- Spark
- TypeScript
- AWS DynamoDB
- AWS S3
- Chart.js

## Setup
Get the code by cloning this repository using git
```
git clone https://github.com/harshakoneru98/CAaaS.git
```
Once downloaded, open terminal in the project directory, go to app folder and install dependencies with:
```
npm install
```
Open another terminal in the project directory, go to server folder and install dependencies with:
```
npm install
```
Create **.env** file in server folder with the following attribute names:
```
PORT = <server_port_number> Ex: 8080
AWS_ACCESS_KEY = <your_aws_access_key>
AWS_SECRET_KEY = <your_aws_secret_key>
AWS_REGION = <your_aws_region>
Python_Path = <your_python_path> Ex: '/opt/anaconda3/bin/python'
TABLE_BUCKET = <your_tabular_s3_bucket_name> Ex: 'caaas-tabular'
IMAGE_BUCKET = <your_image_s3_bucket_name> Ex: 'caaas-image'
DATABASE_NAME = <your_dynamodb_database_name> Ex: 'user_data'
```
Install following python libraries
```
sys
os
io
numpy
pandas
cv2
pickle
urllib
boto3
dotenv
pyspark
```
## Run the Application
First open the terminal at app folder in project directory. Run the following command to run the front-end application.
``` bash
npm run dev
```
Next open the terminal at server folder in project directory. Run the following command to run the back-end server.
``` bash
npm run start
```
The app should now be up and running at [http://localhost:3000](http://localhost:3000/)  🚀