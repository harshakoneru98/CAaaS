import numpy
import cv2
import pickle
import pandas as pd
import sys
import os
import urllib.request


def dataloader_live(path):
    path = path.replace(" ", "%20")
    urllib.request.urlretrieve(path, fileName)
    img = cv2.imread(fileName)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    res1 = cv2.resize(gray,dsize=(64, 64))
    vector = res1.reshape(64*64)
    os.remove(fileName)
    return vector

path = sys.argv[1]
fileName = sys.argv[2]

data = dataloader_live(path)

loaded_model = pickle.load(open("src/api/controllers/CVV_model_Sk.sav", 'rb'))

pd.DataFrame([data])

x = loaded_model.predict_proba(pd.DataFrame([data]))

print(x[0][1])