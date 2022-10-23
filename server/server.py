from flask import Flask
from flask_cors import CORS, cross_origin
from random import randint
from Additions import getFileCount, jsonToDict, dictToJson
config = jsonToDict("config.json")

class Quote:
    def __init__(self, text, author, color):
        self.text = text
        self.author = author
        self.color = color

    def __dict__(self):
        return {'text': self.text, 'author': self.author, 'color': self.color}

def getRandomQuote():
    fragd = randint(0, getFileCount(config['dataPath'])-1)
    selectedFrag = jsonToDict(f"data/dataFrag{fragd}.json")
    return selectedFrag[str(randint(0, len(selectedFrag)-1))]

def addQuote(text=None, author=None, color=None):
    fragd = getFileCount(config['dataPath'])
    selectedFrag = jsonToDict(f"data/dataFrag{fragd-1}.json")
    entry = Quote(text, author, color).__dict__()
    if len(selectedFrag) > int(config["fragLimit"]):
        dictToJson(f"data/dataFrag{fragd}.json", {"0": entry})
    else:
        selectedFrag[str(len(selectedFrag))] = entry
        dictToJson(f"data/dataFrag{fragd-1}.json", selectedFrag)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/random')
@cross_origin()
def getQuote():
    return getRandomQuote()

if __name__ == '__main__': app.run(port=int(config['port']), debug=True)