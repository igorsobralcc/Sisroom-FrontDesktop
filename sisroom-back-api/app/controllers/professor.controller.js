const db = require("../models");
const Professor = db.professores;
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

// Create and Save a new Professor
exports.create = async (req, res) => {

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })

  const professor = {
    coordenador_id: req.body.coordenador_id ? req.body.coordenador_id : funcaoFind.dataValues.coordenador_id,
    nome: req.body.nome,
    matricula: req.body.matricula,
    contato: req.body.contato,
    status: req.body.status ? req.body.status : true,
  };

  const usuario = {
    professor_id: req.body.professor_id,
    email: req.body.email,
    senha: req.body.senha,
    funcao: req.body.funcao ? req.body.funcao : "professor",
    status: req.body.status ? req.body.status : true,
  };

  var professorFind = await Professor.findOne({
    where: {
      matricula: professor.matricula
    }
  })
  var emailFind = await Usuario.findOne({
    where: {
      email: usuario.email
    }
  })

  if (professorFind != null) {
    if (professorFind.dataValues.matricula == professor.matricula)
      return res.status(400).send({ error: 'Matricula ja existe' })
  }
  if (emailFind != null) {
    if (emailFind.dataValues.email == usuario.email)
      return res.status(400).send({ error: 'Email ja existe' })
  }
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse usuario' })
  }

  Professor.create(professor)
    .then(data => {
      usuario.professor_id = data.id
      Usuario.create(usuario)
        .then(data => {
          res.send({ coordenador_id: professor.coordenador_id, nome: professor.nome, matricula: professor.matricula, contato: professor.contato, email: data.email, função: data.funcao, status: data.status, token: generateToken({ id: data.id }) });
        })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao criar o Professor."
      });
    },
    )

}

// Retrieve all Professores from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Professor.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao consultar os professores."
      });
    });
};

// Find a single Professor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Professor.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao pegar o professor com id=" + id
      });
    });
};

// Update a Professor by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })

  var professorFind = await Professor.findOne({
    where: {
      matricula: req.body.matricula
    }
  })
  if (req.body.email != null) {
    var emailFind = await Usuario.findOne({
      where: {
        email: req.body.email
      }
    })
  }

  if (professorFind != null) {
    if (professorFind.dataValues.matricula == req.body.matricula)
      return res.status(400).send({ error: 'Matricula ja existe' })
  }
  if (emailFind != null) {
    if (emailFind.dataValues.email == req.body.email)
      return res.status(400).send({ error: 'Email ja existe' })
  }
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para alterar esse usuario' })
  }

  Professor.update(req.body, {
    where: { id: id }
  })
    .then(async num => {
      var idFind = await Professor.findOne({
        where: {
          id: id
        }
      })
      if (idFind.dataValues.status == false) {
        await Usuario.update({ status: false }, {
          where: {
            professor_id: id
          }
        })
      } else {
        await Usuario.update({ status: true }, {
          where: {
            professor_id: id
          }
        })
      }
      if (num == 1) {
        res.send({
          message: "Professor foi atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Nao pode atualizar professor com id=${id}. talvez professor nao foi encontrado ou o req.body está.vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erro ao atualizar professor com id=" + id
      });
    });
};

// Delete a Professor with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para alterar esse usuario' })
  }

  Professor.update({ status: false }, {
    where: { id: id }
  })
    .then(async (num) => {
      var idFind = await Usuario.findOne({
        where: {
          professor_id: userId
        }
      })
      if (idFind.dataValues.status == true) {
        await Usuario.update({ status: false }, {
          where: {
            professor_id: userId
          }
        })
      }
      if (num == 1) {
        res.send({
          message: "Professor foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Nao pode atualizar professor com id=${id}. Talvez professor nao foi encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nao pode deletar professor com id=" + id
      });
    });
};

// Delete all Professores from the database.
exports.deleteAll = async (req, res) => {

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para alterar esse usuario' })
  }

  Professor.update({ status: false }, {
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Professores foram deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao deletar todos os professores."
      });
    });
};

// find all status Professor
exports.findAllAtivo = (req, res) => {
  Professor.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao pegar todos os professores."
      });
    });
};
