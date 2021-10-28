from flask import Flask
import pandas as pd
from bson.json_util import dumps
import random
import string
from flask import jsonify, request
import smtplib
from flask import Flask, request
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
import json
import datetime

date_handler = lambda obj: (obj.isoformat() if isinstance(obj, (datetime.datetime, datetime.date, datetime.time))else None)


app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb+srv://jsoeiro:1234@bycardb.lrp4p.mongodb.net/dbycar' #conexao com o mongo 
mongo = PyMongo(app)
CORS(app)


class Cadastro:    
    def sender_email(email, senha):
        SUBJECT = "Cadastro realizado com sucesso!!!"
        TO = email
        FROM = "contato.bycar@gmail.com"
        PASSWORD = "@bycarApp2021"
        text = "Tenha seu primeiro acesso usando essa senha:"f"{senha}"
        BODY = "\r\n".join((
        f"From: {FROM}",
        f"To: {TO}",
        f"Subject: {SUBJECT}",
        "",
        text))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(FROM, PASSWORD)
        print("Login funfou")
        server.sendmail(FROM, TO, BODY)
        print("Email enviado para", TO)
        server.quit()

        return "200"

    def sender_email_1(email, senha):
        SUBJECT = "Redefinição de senha"
        TO = email
        FROM = "contato.bycar@gmail.com"
        PASSWORD = "@bycarApp2021"
        text = "SENHA:"f"{senha}"
        BODY = "\r\n".join((
        f"From: {FROM}",
        f"To: {TO}",
        f"Subject: {SUBJECT}",
        "",
        text))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(FROM, PASSWORD)
        print("Login funfou")
        server.sendmail(FROM, TO, BODY)
        print("Email enviado para", TO)
        server.quit()

        
data = 1
        
@app.route('/create/user', methods=['POST'])
def create():
    if 'arq_do_cara' in request.files: 
        arquivo = request.files['arq_do_cara']     
        df = pd.read_csv(arquivo)
        data = df.to_dict(orient="records")
        cod = 6

        df['id'] = 0
        df['senha'] = 0
        df['status'] = 0
        df['cod'] = 0
        df['atividade'] = 1
        df.reset_index(inplace=True)
        x=0
        df = pd.DataFrame(data)
        while x < (len(data)):
            data[x]['id'] = mongo.db.usuarios.count()
            data[x]['senha'] = ''.join(random.choice(string.digits) for x in range(cod))
            mongo.db.usuarios.insert_one(data[x])
            x+=1       
            b = 0
        while b < (len(data)):
            email = data[b]['email']
            senha = data[b]['senha']
            b+=1
            Cadastro.sender_email(email, senha)
            return 'Arquivo enviado com sucesso!'


    
#lista todos os usuarios
@app.route('/listar/usuarios', methods = ["GET"])
def users():
    users = mongo.db.usuarios.find({})
    resp = dumps(users)
    return resp

#lista usuario por id
@app.route('/listar/usuario/<id>', methods = ["GET"])
def user(id):
    users = mongo.db.usuarios.find({'id':int(id)})
    resp = dumps(users)
    return resp

#atualiza usuario
@app.route('/atualizar/usuario/<id>', methods=["PUT"])
def update_user(id):
    _json = request.json
    _nome = _json['nome']
    _cpf = _json['cpf']
    _email = _json['email']
    _telefone = _json['telefone']
    _endereco = _json['endereco']
    _senha = _json['senha']
    _status = _json['status']
    _cod = _json['cod']
    _atividade = _json['atividade']
    mongo.db.usuarios.find_one_and_update(
        {'id':int(id)}, {"$set":{
                                'nome' : _nome,
                                'cpf': _cpf, 
                                'email': _email,
                                'telefone': _telefone,
                                'endereco': _endereco,
                                'senha': _senha,
                                'status': _status,
                                'cod': _cod,
                                'atividade': _atividade}})
    resp = jsonify("Usuario atualizada com sucesso")
    return resp
#exclui usuario
@app.route('/deletar/usuario/<id>', methods=["PUT"])
def delete_user(id):
    _json = request.json
    _atividade = _json['atividade']
    mongo.db.usuarios.find_one_and_update(
        {'id':int(id)}, {"$set":{'atividade': _atividade}})
    resp = jsonify("usuario atualizado")
    return resp

#login
@app.route('/login', methods = ["POST"])
def login_user():

    _json = request.json
    _email = _json['email']
    _senha = _json['senha']

    find_user = mongo.db.usuarios.find({'email' : _email, 'senha' : _senha})
    not_found = jsonify("usuario não encontrado")
    resp = dumps(find_user)

    if (len(resp)) > 2:
        return resp
    else:
        return not_found

#atualiza senha
@app.route('/updatesenha/<id>', methods=["PUT"])
def update_senha(id):
    _json = request.json
    _senha = _json['senha']
    mongo.db.usuarios.find_one_and_update(
        {'id':int(id)}, {"$set":{'senha': _senha}})
    resp = jsonify("senha atualizada com sucesso")
    return resp


#esqueceu a senha
@app.route('/redefinesenha', methods = ["POST"])
def redefine_senha():

    _json = request.json
    _email = _json['email']

    cod = 6 
    find_user = mongo.db.usuarios.find({'email' : _email})
    not_found = jsonify("usuario não existe")
    resp = dumps(find_user)
    if (len(resp)) > 2:
        senha = ''.join(random.choice(string.digits) for x in range(cod))
        mongo.db.usuarios.find_one_and_update({'email' : _email}, {"$set":{'senha': senha}})
        Cadastro.sender_email_1(email, senha)
        return resp
    else:
        return not_found

#--------------------------------------------anuncio-----------------------------------------------------#


@app.route('/create/anuncio', methods=['POST'])
def create_anuncio():
    if 'anuncio' in request.files:
        anuncio = request.files['anuncio']     
        dfa = pd.read_csv(anuncio)
        data_anuncio = dfa.to_dict(orient="records")  
        dfa['id'] = 0 
        dfa['img'] = 'https://th.bing.com/th/id/R.fec6e407bf5e2d8c7a7a5519815d5656?rik=tlDK22b8zAwMYg&riu=http%3a%2f%2fbestcars.uol.com.br%2fbc%2fwp-content%2fuploads%2f2013%2f09%2fFiat-Palio-Fire-Italia-01.jpg&ehk=XtcmILycKE6YzWmTK%2b9dXitDVI7%2b%2f7QEEHpPy47gki8%3d&risl=&pid=ImgRaw&r=0'
        x=0
        dfa = pd.DataFrame(data_anuncio) 
        while x < (len(data_anuncio)):
            data_anuncio[x]['id'] = mongo.db.anuncios.count()
            data_anuncio[x]['img'] = 'https://th.bing.com/th/id/R.fec6e407bf5e2d8c7a7a5519815d5656?rik=tlDK22b8zAwMYg&riu=http%3a%2f%2fbestcars.uol.com.br%2fbc%2fwp-content%2fuploads%2f2013%2f09%2fFiat-Palio-Fire-Italia-01.jpg&ehk=XtcmILycKE6YzWmTK%2b9dXitDVI7%2b%2f7QEEHpPy47gki8%3d&risl=&pid=ImgRaw&r=0'
            mongo.db.anuncios.insert_one(data_anuncio[x])
            x+=1     
    return 'Arquivo enviado com sucesso!'

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
            'id': doc['id'],
            'img': doc['img']
        })
    return jsonify(anuncios)

#lista anuncio por cpf do usuario
@app.route('/listar/anuncio/<cpf_anunciante>', methods = ["GET"])
def anuncio(cpf_anunciante):
    anuncios = []
    for doc in mongo.db.anuncios.find({'cpf_anunciante': int(cpf_anunciante)}):
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
            'id': doc['id'],
            'img': doc['img']
        })
    return jsonify(anuncios)
  
#Lista anuncio especifico
@app.route('/anuncio/<id>', methods=['GET'])
def getAnuncio(id):
  anuncios = mongo.db.anuncios.find_one({'id': int(id)})
  return jsonify({
     '_id': str(ObjectId(anuncios['_id'])),
      'fabricante' : anuncios['fabricante'],
      'desc_marca': anuncios['desc_marca'], 
      'desc_veiculo': anuncios['desc_veiculo'],
      'cod_anunciante': anuncios['cod_anunciante'],
      'ano_fabricacao': anuncios['ano_fabricacao'],
      'ano_modelo': anuncios[ 'ano_modelo'],
      'cpf_anunciante': anuncios['cpf_anunciante'],
      'valor_veiculo': anuncios['valor_veiculo'],
      'id': anuncios['id'],
      'img': anuncios['img']
  })

#exclui anuncio
@app.route('/anuncios/<id>', methods=['DELETE'])
def deleteAnuncios(id):
       mongo.db.anuncios.delete_one({'_id': ObjectId(id)})
       return jsonify({'message': 'Anuncio excluido'})

@app.route('/atualizar/anuncio/<id>', methods=["PUT"])
def updateAnuncios(id):
    
    json = request.json
    _fabricante = json['fabricante']
    _desc_marca = json['desc_marca']
    _desc_veiculo = json['desc_veiculo']
    _cod_anunciante = json['cod_anunciante']
    _ano_fabricacao = json['ano_fabricacao']
    _ano_modelo = json['ano_modelo']
    _valor_veiculo = json['valor_veiculo']
    
    mongo.db.anuncios.find_one_and_update(
        {'id': int(id)}, {"$set": {
            
         'fabricante': _fabricante,
         'desc_marca': _desc_marca,
         'desc_veiculo': _desc_veiculo,
         'cod_anunciante': _cod_anunciante,
         'ano_fabricacao': _ano_fabricacao,
         'ano_modelo': _ano_modelo,
         'valor_veiculo': _valor_veiculo}})
    return jsonify({'message': 'Anuncio atualizado'})
if __name__ == "__main__":
    app.run()