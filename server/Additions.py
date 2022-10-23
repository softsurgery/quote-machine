import json
import os

def jsonToDict(json_file):
    with open(json_file) as f:
        data = json.load(f)
    return data

def dictToJson(json_file,dictionary):
    with open(json_file,'w') as f:
        json.dump(dictionary, f)

def getFileCount(path=os.getcwd()):
    return len([file for file in os.listdir(path) if os.path.isfile(os.path.join(path, file))]) 