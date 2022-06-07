const db = require("../models");
const { occupied } = require("./sala.controller");
const Historico = db.historicos;
const Sala = db.salas;
const Alocacao = db.alocacoes;
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

// Create and Save a new Historico
exports.create = async (req, res) => {

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })

  const historico = {
    alocacao_id: req.body.alocacao_id,
    status_entrada: req.body.status_entrada ? req.body.status_entrada : false,
    status_saida: req.body.status_saida ? req.body.status_saida : false,
    obs: req.body.obs
  };

  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "professor" || funcaoFind.dataValues.funcao == "porteiro" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para criar um histórico' })
  }

  Historico.create(historico)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao criar o Historico."
      });
    });
};

exports.entry = async (req, res) => {
  const id = req.params.id;

  var confirmacao = req.body.confirmacao ? req.body.confirmacao : 'confirmado'

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "professor" || funcaoFind.dataValues.funcao == "porteiro" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse Historico' })
  }

  if (confirmacao == 'confirmado') {
    Historico.update({ status_entrada: true, porteiro_id: funcaoFind.dataValues.porteiro_id, createdAt: Date.now() }, {
      where: { id: id }
    })
      .then(async num => {
        var historicoFind = await Historico.findOne({
          where: {
            id: id
          }
        })
        var alocacaoFind = await Alocacao.findOne({
          where: {
            id: historicoFind.dataValues.alocacao_id
          }
        })
        var salaFind = await Sala.findOne({
          where: {
            id: alocacaoFind.dataValues.sala_id
          }
        })
        Sala.update({ status: "ocupada" }, {
          where: { id: salaFind.dataValues.id }
        })
        if (num == 1) {
          res.send({
            message: "Historico foi atualizado com sucesso."
          });
        } else {
          res.send({
            message: `Nao pode atualizar historico com id=${id}. talvez historico nao foi encontrado ou o req.body está vazio!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "erro ao atualizar historico com id=" + id
        });
      });
  }
  if (confirmacao == 'recusado') {
    Historico.update({ status_entrada: true, status_saida: true, porteiro_id: funcaoFind.dataValues.porteiro_id, obs: "a chave não foi entregue", createdAt: Date.now(), updatedAt: Date.now() }, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Historico foi atualizado com sucesso."
          });
        } else {
          res.send({
            message: `Nao pode atualizar historico com id=${id}. talvez historico nao foi encontrado ou o req.body está vazio!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "erro ao atualizar historico com id=" + id
        });
      });
  }
};

exports.exit = async (req, res) => {
  const id = req.params.id;

  var confirmacao = req.body.confirmacao ? req.body.confirmacao : 'confirmado'

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })
  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "professor" || funcaoFind.dataValues.funcao == "porteiro" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse Historico' })
  }

  if (confirmacao == 'confirmado') {
    Historico.update({ status_saida: true, updatedAt: Date.now() }, {
      where: { id: id }
    })
      .then(async num => {
        var historicoFind = await Historico.findOne({
          where: {
            id: id
          }
        })
        var alocacaoFind = await Alocacao.findOne({
          where: {
            id: historicoFind.dataValues.alocacao_id
          }
        })
        var salaFind = await Sala.findOne({
          where: {
            id: alocacaoFind.dataValues.sala_id
          }
        })
        Sala.update({ status: "ativo" }, {
          where: { id: salaFind.dataValues.id }
        })
        if (num == 1) {
          res.send({
            message: "Historico foi atualizado com sucesso."
          });
        } else {
          res.send({
            message: `Nao pode atualizar historico com id=${id}. talvez historico nao foi encontrado ou o req.body está vazio!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "erro ao atualizar historico com id=" + id
        });
      });
  }
  if (confirmacao == 'recusado') {
    Historico.update({ status_saida: true, obs: "a chave não foi devolvida", updatedAt: Date.now() }, {
      where: { id: id }
    })
      .then(async num => {
        var historicoFind = await Historico.findOne({
          where: {
            id: id
          }
        })
        var alocacaoFind = await Alocacao.findOne({
          where: {
            id: historicoFind.dataValues.alocacao_id
          }
        })
        var salaFind = await Sala.findOne({
          where: {
            id: alocacaoFind.dataValues.sala_id
          }
        })
        Sala.update({ status: "ativo" }, {
          where: { id: salaFind.dataValues.id }
        })
        if (num == 1) {
          res.send({
            message: "Historico foi atualizado com sucesso."
          });
        } else {
          res.send({
            message: `Nao pode atualizar historico com id=${id}. talvez historico nao foi encontrado ou o req.body está vazio!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "erro ao atualizar historico com id=" + id
        });
      });
  }
};

exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Historico.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao consultar os historicos."
      });
    });
};

// Find a single Historico with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Historico.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao pegar o historico com id=" + id
      });
    });
};

exports.findAllRequest = (req, res) => {
  Historico.findAll({ where: { status_saida: false } })
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