const db = require("../models");
const Disciplina = db.disciplinas;
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

// Create and Save a new Disciplina
exports.create = async (req, res) => {

  const disciplina = {
    nome: req.body.nome,
    status: req.body.status ? req.body.status : true,
  };

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({where: {
      id: userId
    }})
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse usuario' })}

  Disciplina.create(disciplina)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao criar o Disciplina."
      });
    });
};

// Retrieve all Disciplinas from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Disciplina.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao consultar os disciplina."
      });
    });
};

// Find a single Disciplina with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Disciplina.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao pegar o disciplina com id=" + id
      });
    });
};

// Update a Disciplina by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({where: {
      id: userId
    }})
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse usuario' })}

  Disciplina.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Disciplina foi atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Nao pode atualizar disciplina com id=${id}. talvez disciplina nao foi encontrado ou o req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erro ao atualizar disciplina com id=" + id
      });
    });
};

// Delete a Disciplina with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({where: {
      id: userId
    }})
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse usuario' })}

  Disciplina.update({ status: false },{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Disciplina foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Nao pode atualizar disciplina com id=${id}. Talvez disciplina nao foi encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nao pode deletar disciplina com id=" + id
      });
    });
};

// Delete all Disciplinas from the database.
exports.deleteAll = async (req, res) => {

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({where: {
      id: userId
    }})
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse usuario' })}

  Disciplina.update({ status: false },{
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Disciplinas foram deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao deletar todos os disciplina."
      });
    });
};

// find all status Disciplina
exports.findAllAtivo = (req, res) => {
  Disciplina.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao pegar todos os disciplina."
      });
    });
};
