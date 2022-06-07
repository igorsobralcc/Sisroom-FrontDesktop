const db = require("../models");
const Coordenador = db.coordenadores;
const Op = db.Sequelize.Op;
const Usuario = db.usuarios;
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

function generateToken(params = {}) {
  return jwt.sign(
    params,
    authConfig.secret,
    {
      expiresIn: 86400
    }
  )
}

// Create and Save a new Coordenador
exports.create = async (req, res) => {

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({where: {
      id: userId
    }})

  const coordenador = {
    gestor_id: req.body.gestor_id ? req.body.gestor_id : funcaoFind.dataValues.gestor_id,
    nome: req.body.nome,
    matricula: req.body.matricula,
    area: req.body.area,
    contato: req.body.contato,
    status: req.body.status ? req.body.status : true,
  };

  // Create a Usuario
  const usuario = {
    coordenador_id: req.body.coordenador_id,
    email: req.body.email,
    senha: req.body.senha,
    funcao: req.body.funcao ? req.body.funcao : "coordenador",
    status: req.body.status ? req.body.status : true,
  };

  var coordenadorFind = await Coordenador.findOne({ where: {
    matricula: coordenador.matricula
  }})
  var emailFind = await Usuario.findOne({ where: {
    email: usuario.email
  }})

if(coordenadorFind != null){
  if (coordenadorFind.dataValues.matricula == coordenador.matricula)
    return res.status(400).send({ error: 'Matricula ja existe' })}
if(emailFind != null){
  if (emailFind.dataValues.email == usuario.email)
    return res.status(400).send({ error: 'Email ja existe' })}
if(funcaoFind != null){
  if (!(funcaoFind.dataValues.funcao == "gestor" || funcaoFind.dataValues.funcao == "admin"))
    return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse usuario' })}


    Coordenador.create(coordenador)
      .then(data => {
        usuario.coordenador_id = data.id
        Usuario.create(usuario)
          .then(data => {
            res.send({ gestor_id: coordenador.gestor_id, nome: coordenador.nome, matricula: coordenador.matricula, area: coordenador.area, contato: coordenador.contato, email: data.email, função: data.funcao, status: data.status, token: generateToken({ id: data.id }) });
          })
      })
      .catch(error => {
        res.status(400).send({
          error: "Ocorreu um erro ao criar o Coordenador."
        });
      },
      )
  
}

// Retrieve all Coordenadores from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Coordenador.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao consultar os coordenadores."
      });
    });
};

// Find a single Coordenador with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Coordenador.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao pegar o coordenador com id=" + id
      });
    });
};

// Update a Coordenador by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({where: {
      id: userId
    }})
  var coordenadorFind = await Coordenador.findOne({where: {
      matricula: req.body.matricula
    }})
  var emailFind = await Usuario.findOne({where: {
      email: req.body.email
    }})

  if (coordenadorFind != null) {
    if (coordenadorFind.dataValues.matricula == req.body.matricula)
      return res.status(400).send({ error: 'Matricula ja existe' })}
  if (emailFind != null) {
    if (emailFind.dataValues.email == req.body.email)
      return res.status(400).send({ error: 'Email ja existe' })}
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "gestor" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para alterar esse usuario' })}

  await Coordenador.update(req.body, {
    where: { id: id }
  })
    .then(async num => {
      var idFind = await Coordenador.findOne({where: {
          id: id
        }})
      if (idFind.dataValues.status == false){
        await Usuario.update({ status: false }, {where: {
            coordenador_id: id
          }})
      } else {
        await Usuario.update({ status: true }, {where: {
            coordenador_id: id
          }})
      }
      if (num == 1) {
        res.send({
          message: "Coordenador foi atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Nao pode atualizar coordenador com id=${id}. talvez coordenador nao foi encontrado ou o req.body está.vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erro ao atualizar coordenador com id=" + id
      });
    });
};

// Delete a Coordenador with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({where: {
      id: userId
    }})
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "gestor" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para alterar esse usuario' })}

  Coordenador.update({ status: false },{
    where: { id: id }
  })
    .then(async(num) => {
      var idFind = await Usuario.findOne({where: {
          coordenador_id: userId
        }})
      if (idFind.dataValues.status == true){
        await Usuario.update({ status: false }, {where: {
            coordenador_id: userId
          }})
      }
      if (num == 1) {
        res.send({
          message: "Coordenador foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Nao pode atualizar coordenador com id=${id}. Talvez coordenador nao foi encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nao pode deletar coordenador com id=" + id
      });
    });
};

// Delete all Coordenadores from the database.
exports.deleteAll = async (req, res) => {

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({where: {
      id: userId
    }})
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "gestor" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para alterar esse usuario' })}

  Coordenador.update({ status: false },{
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Coordenadores foram deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao deletar todos os coordenadores."
      });
    });
};

// find all status Coordenador
exports.findAllAtivo = (req, res) => {
  Coordenador.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao pegar todos os coordenadores."
      });
    });
};
