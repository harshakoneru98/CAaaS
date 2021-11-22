import numpy

import cv2

import pickle

import pandas as pd

import sys

import urllib.request


def dataloader_live(path):
    urllib.request.urlretrieve(path, 'filename')
    img = cv2.imread('filename')
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    res1 = cv2.resize(gray,dsize=(64, 64))
    vector = res1.reshape(64*64)
    return vector

path = sys.argv[1]

#data = dataloader_live("NormalPersonECGImages859/MI.jpg")

data = dataloader_live(path)



loaded_model = pickle.load(open("src/api/controllers/CVV_model_Sk.sav", 'rb'))

pd.DataFrame([data])



x = loaded_model.predict_proba(pd.DataFrame([data]))

print(x[0][1])

