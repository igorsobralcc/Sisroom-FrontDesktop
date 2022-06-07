const db = require("../models");
const Alocacao = db.alocacoes;
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

// Create and Save a new Alocacao
exports.create = async (req, res) => {

  const alocacao = {
    disciplina_id: req.body.disciplina_id,
    turma_id: req.body.turma_id,
    sala_id: req.body.sala_id,
    professor_id: req.body.professor_id,
    dataInicio: req.body.dataInicio ? req.body.dataInicio : Date.now(),
    dataFim: req.body.dataFim ? req.body.dataFim : Date.now(),
    status: req.body.status ? req.body.status : true,
  };

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({where: {
      id: userId
    }})
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse usuario' })}

  Alocacao.create(alocacao)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao criar o Alocacao."
      });
    });
};

// Retrieve all Alocacaos from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Alocacao.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao consultar as alocacoes."
      });
    });
};

// Find a single Alocacao with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Alocacao.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao pegar o alocacao com id=" + id
      });
    });
};

// Update a Alocacao by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Alocacao.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Alocacao foi atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Nao pode atualizar alocacao com id=${id}. talvez alocacao nao foi encontrado ou o req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erro ao atualizar alocacao com id=" + id
      });
    });
};

// Delete a Alocacao with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({where: {
      id: userId
    }})
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse usuario' })}

  Alocacao.update({ status: false },{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Alocacao foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Nao pode atualizar alocacao com id=${id}. Talvez alocacao nao foi encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nao pode deletar alocacao com id=" + id
      });
    });
};

// Delete all Alocacaos from the database.
exports.deleteAll = async (req, res) => {

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({where: {
      id: userId
    }})
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse usuario' })}

  Alocacao.update({ status: false },{
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Alocacaos foram deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao deletar todos os alocacoes."
      });
    });
};

// find all status Alocacao
exports.findAllAtivo = (req, res) => {
  Alocacao.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao pegar todos os alocacoes."
      });
    });
};
