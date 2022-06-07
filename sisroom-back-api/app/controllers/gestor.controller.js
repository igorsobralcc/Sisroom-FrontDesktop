const db = require("../models");
const Gestor = db.gestores;
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

// Create and Save a new Gestor
exports.create = async (req, res) => {

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })

  const gestor = {
    nome: req.body.nome,
    matricula: req.body.matricula,
    contato: req.body.contato,
    status: req.body.status ? req.body.status : true,
  };

  // Create a Usuario
  const usuario = {
    gestor_id: req.body.gestor_id,
    email: req.body.email,
    senha: req.body.senha,
    funcao: req.body.funcao ? req.body.funcao : "gestor",
    status: req.body.status ? req.body.status : true,
  };

  var gestorFind = await Gestor.findOne({
    where: {
      matricula: gestor.matricula
    }
  })
  var emailFind = await Usuario.findOne({
    where: {
      email: usuario.email
    }
  })

  if (gestorFind != null) {
    if (gestorFind.dataValues.matricula == gestor.matricula)
      return res.status(400).send({ error: 'Matricula ja existe' })
  }
  if (emailFind != null) {
    if (emailFind.dataValues.email == usuario.email)
      return res.status(400).send({ error: 'Email ja existe' })
  }
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse usuario' })
  }

  await Gestor.create(gestor)
    .then(data => {
      usuario.gestor_id = data.id
      Usuario.create(usuario)
        .then(data => {
          res.send({ nome: gestor.nome, matricula: gestor.matricula, contato: gestor.contato, email: data.email, função: data.funcao, status: data.status, token: generateToken({ id: data.id }) });
        })
    })
    .catch(error => {
      res.status(400).send({
        error: "Ocorreu um erro ao criar o Gestor."
      });
    },
    )

}

// Retrieve all Gestores from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Gestor.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao consultar os gestores."
      });
    });
};

// Find a single Gestor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Gestor.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao pegar o gestor com id=" + id
      });
    });
};

// Update a Gestor by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })
  var gestorFind = await Gestor.findOne({
    where: {
      matricula: req.body.matricula
    }
  })
  var emailFind = await Usuario.findOne({
    where: {
      email: req.body.email
    }
  })

  if (gestorFind != null) {
    if (gestorFind.dataValues.matricula == req.body.matricula)
      return res.status(400).send({ error: 'Matricula ja existe' })
  }
  if (emailFind != null) {
    if (emailFind.dataValues.email == req.body.email)
      return res.status(400).send({ error: 'Email ja existe' })
  }
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para alterar esse usuario' })
  }

  Gestor.update(req.body, {
    where: { id: id }
  })
    .then(async num => {
      var idFind = await Gestor.findOne({
        where: {
          id: id
        }
      })
      if (idFind.dataValues.status == false) {
        await Usuario.update({ status: false }, {
          where: {
            gestor_id: id
          }
        })
      } else {
        await Usuario.update({ status: true }, {
          where: {
            gestor_id: id
          }
        })
      }
      if (num == 1) {
        res.send({
          message: "Gestor foi atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Nao pode atualizar gestor com id=${id}. talvez gestor nao foi encontrado ou o req.body está.vazio!`
        });
      }
    })
    .catch(error => {
      res.status(400).send({
        error: "erro ao atualizar gestor com id=" + id
      });
    });
};

// Delete a Gestor with the specified id in the request
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

  Gestor.update({ status: false }, {
    where: { id: id }
  })
    .then(async (num) => {
      var idFind = await Usuario.findOne({
        where: {
          gestor_id: userId
        }
      })
      if (idFind.dataValues.status == true) {
        await Usuario.update({ status: false }, {
          where: {
            gestor_id: userId
          }
        })
      }
      if (num == 1) {
        res.send({
          message: "Gestor foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Nao pode atualizar gestor com id=${id}. Talvez gestor nao foi encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nao pode deletar gestor com id=" + id
      });
    });
};

// Delete all Gestores from the database.
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

  Gestor.update({ status: false }, {
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Gestores foram deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao deletar todos os gestores."
      });
    });
};

// find all status Gestor
exports.findAllAtivo = (req, res) => {
  Gestor.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao pegar todos os gestores."
      });
    });
};
