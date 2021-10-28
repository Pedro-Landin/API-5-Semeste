from flask import Flask, request, jsonify, send_from_directory
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
import os
import pandas as pd
from pymongo import MongoClient

DIRETORIO = "C:\\Users\\Pedro\\Documents\\API-5semestre-main\\frontend\\teste"

app = Flask(__name__)

app.config['MONGO_URI']='mongodb+srv://jsoeiro:1234@bycardb.lrp4p.mongodb.net/dbycar'
mongo = PyMongo(app)
CORS(app)
db = mongo.db.anuncios


#AQUI
@app.route('/anuncios', methods=['POST'])
def createAnuncio():
     id = db.insert({
         'fabricante': request.json['fabricante'],
         'desc_marca': request.json['desc_marca'],
         'desc_veiculo': request.json['desc_veiculo'],
         'cod_anunciante': request.json['cod_anunciante'],
         'ano_fabricacao': request.json['ano_fabricacao'],
         'ano_modelo': request.json['ano_modelo'],
         'cpf_anunciante': request.json['cpf_anunciante'],
         'valor_veiculo': request.json['valor_veiculo'],
         'img': request.json['img'],
     })
  
     return jsonify(str(ObjectId(id)))

#lista todos os anuncios
@app.route('/listar/anuncios', methods = ["GET"])
def lista_anuncio():
    anuncios = []
    for doc in mongo.db.anuncios.find():
        anuncios.append({
            '_id': str(ObjectId(doc['_id'])),
            'fabricante': doc['fabricante'],
            'desc_marca': doc['desc_marca'],
            'desc_veiculo': doc['desc_veiculo'],
            'cod_anunciante': doc['cod_anunciante'],
            'ano_fabricacao': doc['ano_fabricacao'],
            'ano_modelo': doc['ano_modelo'],
            'cpf_anunciante': doc['cpf_anunciante'],
            'valor_veiculo': doc['valor_veiculo'],
            'img': doc['img']
        })
    return jsonify(anuncios)

@app.route('/anuncios/<id>', methods=['GET'])
def getAnuncio(id):
    anuncios = db.find_one({'_id': ObjectId(id)})
    print(anuncios)
    return jsonify({
      '_id': str(ObjectId(anuncios['_id'])),
      'name': anuncios['name'],
      'by': anuncios['by'],
      'price': anuncios['price'],
      'cpf': anuncios['cpf'],
      'color': anuncios['color'],
      'endereço': anuncios['endereço'],
      'troca': anuncios['troca'],
      'combustivel': anuncios['combustivel'],
      'km': anuncios['km'],
      'model': anuncios['model'],
      'year': anuncios['year'],
      'img': anuncios['img'],
  })

@app.route('/anuncios/<id>', methods=['DELETE'])
def deleteAnuncios(id):
       db.delete_one({'_id': ObjectId(id)})
       return jsonify({'message': 'Anuncio excluido'})

@app.route("/anuncios/<id>", methods=['PUT'])
def updateAnuncios(id):
     print(request.json)
     db.update_one({'_id': ObjectId(id)}, {"$set": {
         'name': request.json['name'],
         'by': request.json['by'],
         'price': request.json['price'],
         'cpf': request.json['cpf'],
         'color': request.json['color'],
         'endereço': request.json['endereço'],
         'troca': request.json['troca'],
         'combustivel': request.json['combustivel'],
         'km': request.json['km'],
         'model': request.json['model'],
         'year': request.json['year'],
         'img': request.json['img'],
     }})
     return jsonify({'message': 'Anuncio atualizado'})

@app.route("/arquivos", methods=['GET'])
def lista_arquivos():
    arquivos = []
     
   
    for nome_do_arquivo in os.listdir(DIRETORIO):
        endereco_do_arquivo = os.path.join(DIRETORIO, nome_do_arquivo)

        if(os.path.isfile(endereco_do_arquivo)):
            arquivos.append(nome_do_arquivo)

    return jsonify(arquivos)

@app.route("/arquivos/<nome_do_arquivo>", methods=['GET'])
def get_arquivo(nome_do_arquivo):
    return send_from_directory(DIRETORIO, nome_do_arquivo, as_attachment=True)


@app.route("/arquivos/", methods=['POST'])
def post_arquivo():
    arquivo = request.files.get("meuArquivo")

    print(arquivo)
    nome_do_arquivo = arquivo.filename
    arquivo.save(os.path.join(DIRETORIO, nome_do_arquivo))

    return '', 201

    

@app.route('/create', methods=['POST'])
def create():
    if 'arquivo_do_cara' in request.files:
        arquivo_do_cara = request.files['arquivo_do_cara']
        data = pd.read_csv(arquivo_do_cara)
        data.reset_index(inplace=True)
        data_dict = data.to_dict("records")
        df = pd.DataFrame(data_dict)
       
        collection.insert_many(data_dict)

    return 'Arquivo enviado com sucesso!'

if __name__ == "__main__":
  app.run(debug=True)