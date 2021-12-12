from PIL import Image
import imagehash
import sys
import os
import requests

# Returns hash from specified path
def getHashFromPath(path):
    return imagehash.average_hash(Image.open(path))


## Takes in a directory path and creates a dictionary of: {name, hash}
def getHashDatabase(directory, files):
    hashDB = {}
    for file in files:
        hashDB[str("/UK/" + file)] = getHashFromPath(directory + file)
    return hashDB.copy()


def findSimilarImages(imageToCheck, hashDB):
    similarImages = []
    for selected in hashDB:
        if ((hashDB[selected] - imageToCheck["hash"]) < 2):
            similarImages.append(selected)
    return similarImages

def postToBackend(similarImages):
    url = 'http://localhost:5000/api/similar'
    jsonData = ""
    for img in similarImages:
        jsonData += img
        jsonData += ","
    jsonData = jsonData[:-1]
    data = {"similarImages" : jsonData}
    print(data)
    x = requests.post(url, json=data)
    return x


# Inputted image structure {name, hash}
imageToCheck = {
"path" : sys.argv[1],
"hash" : getHashFromPath(sys.argv[1])
}

# Directory of image database
databasePath = '/Users/jackhancock/Desktop/Coding/webDevelopment/reactPlayground/backend/util/imageCheck/imgDatabase/UK/'

# Returns {path, hash} dictionary of database
hashDatabase = getHashDatabase(databasePath, os.listdir(databasePath))

similarImages = findSimilarImages(imageToCheck, hashDatabase)


response = postToBackend(similarImages)

# print(similarImages)
