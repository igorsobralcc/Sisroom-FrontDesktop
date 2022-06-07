const db = require("../models");
const Turma = db.turmas;
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

// Create and Save a new Turma
exports.create = async (req, res) => {

  const turma = {
    curso_id: req.body.curso_id,
    nome: req.body.nome,
    status: req.body.status ? req.body.status : true,
  };

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar essa turma' })
  }

  Turma.create(turma)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao criar o Turma."
      });
    });
};

// Retrieve all Turmas from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Turma.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao consultar os turma."
      });
    });
};

// Find a single Turma with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Turma.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao pegar o turma com id=" + id
      });
    });
};

// Update a Turma by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar essa turma' })
  }

  Turma.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Turma foi atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Nao pode atualizar turma com id=${id}. talvez turma nao foi encontrado ou o req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erro ao atualizar turma com id=" + id
      });
    });
};

// Delete a Turma with the specified id in the request
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
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar essa turma' })
  }

  Turma.update({ status: false }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Turma foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Nao pode atualizar turma com id=${id}. Talvez turma nao foi encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nao pode deletar turma com id=" + id
      });
    });
};

// Delete all Turmas from the database.
exports.deleteAll = async (req, res) => {

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar essa turma' })
  }

  Turma.update({ status: false }, {
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Turmas foram deletadas com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao deletar todas as turmas."
      });
    });
};

// find all status Turma
exports.findAllAtivo = (req, res) => {
  Turma.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao pegar todas as turmas."
      });
    });
};
