const db = require("../models");
const Porteiro = db.porteiros;
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

// Create and Save a new Porteiro
exports.create = async (req, res) => {

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })


  const porteiro = {
    gestor_id: req.body.gestor_id ? req.body.gestor_id : funcaoFind.dataValues.gestor_id,
    nome: req.body.nome,
    matricula: req.body.matricula,
    contato: req.body.contato,
    status: req.body.status ? req.body.status : true,
  };

  const usuario = {
    porteiro_id: req.body.porteiro_id,
    email: req.body.email,
    senha: req.body.senha,
    funcao: req.body.funcao ? req.body.funcao : "porteiro",
    status: req.body.status ? req.body.status : true,
  };

  var porteiroFind = await Porteiro.findOne({
    where: {
      matricula: porteiro.matricula
    }
  })
  var emailFind = await Usuario.findOne({
    where: {
      email: usuario.email
    }
  })

  if (porteiroFind != null) {
    if (porteiroFind.dataValues.matricula == porteiro.matricula)
      return res.status(400).send({ error: 'Matricula ja existe' })
  }
  if (emailFind != null) {
    if (emailFind.dataValues.email == usuario.email)
      return res.status(400).send({ error: 'Email ja existe' })
  }
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "gestor" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse usuario' })
  }


  Porteiro.create(porteiro)
    .then(data => {
      usuario.porteiro_id = data.id
      Usuario.create(usuario)
        .then(data => {
          res.send({ gestor_id: porteiro.gestor_id, nome: porteiro.nome, matricula: porteiro.matricula, contato: porteiro.contato, email: data.email, função: data.funcao, status: data.status, token: generateToken({ id: data.id }) });
        })
    })
    .catch(error => {
      res.status(400).send({
        error: "Ocorreu um erro ao criar o Porteiro."
      });
    },
    )
}

// Retrieve all Porteiroes from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Porteiro.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao consultar os porteiros."
      });
    });
};

// Find a single Porteiro with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Porteiro.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao pegar o porteiro com id=" + id
      });
    });
};

// Update a Porteiro by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })
  var porteiroFind = await Porteiro.findOne({
    where: {
      matricula: req.body.matricula
    }
  })
  var emailFind = await Usuario.findOne({
    where: {
      email: req.body.email
    }
  })

  if (porteiroFind != null) {
    if (porteiroFind.dataValues.matricula == req.body.matricula)
      return res.status(400).send({ error: 'Matricula ja existe' })
  }
  if (emailFind != null) {
    if (emailFind.dataValues.email == req.body.email)
      return res.status(400).send({ error: 'Email ja existe' })
  }
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "gestor" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para alterar esse usuario' })
  }


  Porteiro.update(req.body, {
    where: { id: id }
  })
    .then(async num => {
      var idFind = await Coordenador.findOne({
        where: {
          id: id
        }
      })
      if (idFind.dataValues.status == false) {
        await Usuario.update({ status: false }, {
          where: {
            porteiro_id: id
          }
        })
      } else {
        await Usuario.update({ status: true }, {
          where: {
            porteiro_id: id
          }
        })
      }
      if (num == 1) {
        res.send({
          message: "Porteiro foi atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Nao pode atualizar porteiro com id=${id}. talvez porteiro nao foi encontrado ou o req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erro ao atualizar porteiro com id=" + id
      });
    });
};

// Delete a Porteiro with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "gestor" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para alterar esse usuario' })
  }

  Porteiro.update({ status: false }, {
    where: { id: id }
  })
    .then(async (num) => {
      var idFind = await Usuario.findOne({
        where: {
          porteiro_id: userId
        }
      })
      if (idFind.dataValues.status == true) {
        await Usuario.update({ status: false }, {
          where: {
            porteiro_id: userId
          }
        })
      }
      if (num == 1) {
        res.send({
          message: "Porteiro foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Nao pode atualizar porteiro com id=${id}. Talvez porteiro nao foi encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nao pode deletar porteiro com id=" + id
      });
    });
};

// Delete all Porteiroes from the database.
exports.deleteAll = async (req, res) => {

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "gestor" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para alterar esse usuario' })
  }


  Porteiro.update({ status: false }, {
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Porteiroes foram deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao deletar todos os porteiros."
      });
    });
};

// find all status Porteiro
exports.findAllAtivo = (req, res) => {
  Porteiro.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao pegar todos os porteiros."
      });
    });
};
