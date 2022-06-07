const db = require("../models");
const Sala = db.salas;
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

// Create and Save a new Sala
exports.create = async (req, res) => {

  const sala = {
    numero: req.body.numero,
    andar: req.body.andar,
    tipo: req.body.tipo,
    chave: req.body.chave,
    status: req.body.status ? req.body.status : 'ativo',
  };

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })

  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar essa sala' })
  }

  // Save Sala in the database
  Sala.create(sala)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao criar a Sala."
      });
    });
};

// Retrieve all Salas from the database.
exports.findAll = (req, res) => {
  const numero = req.query.numero;
  var condition = numero ? { numero: { [Op.iLike]: `%${numero}%` } } : null;

  Sala.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao consultar as salas."
      });
    });
};

// Find a single Sala with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sala.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao pegar o sala com id=" + id
      });
    });
};

// Update a Sala by the id in the request
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
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar essa sala' })
  }

  Sala.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sala foi atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Nao pode atualizar sala com id=${id}. talvez sala nao foi encontrado ou o req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erro ao atualizar sala com id=" + id
      });
    });
};

// Delete a Sala with the specified id in the request
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
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar essa sala' })
  }

  Sala.update({ status: 'inativo' }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sala foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Nao pode atualizar sala com id=${id}. Talvez sala nao foi encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nao pode deletar sala com id=" + id
      });
    });
};

// Delete all Salas from the database.
exports.deleteAll = async (req, res) => {

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })

  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar essa sala' })
  }

  Sala.update({ status: 'inativo' }, {
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Salas foram deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao deletar todos os salas."
      });
    });
};

exports.activate = async (req, res) => {
  const id = req.params.id;

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({where: {
      id: userId
    }})

  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar essa sala' })}

  Sala.update({ status: 'ativo' }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sala foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Nao pode atualizar sala com id=${id}. Talvez sala nao foi encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nao pode deletar sala com id=" + id
      });
    });
};

exports.maintenance = async (req, res) => {
  const id = req.params.id;

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({where: {
      id: userId
    }})

  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar essa sala' })}

  Sala.update({ status: 'manutencao' }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sala foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Nao pode atualizar sala com id=${id}. Talvez sala nao foi encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nao pode deletar sala com id=" + id
      });
    });
};

exports.occupied = async (req, res) => {
  const id = req.params.id;

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({where: {
      id: userId
    }})

  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar essa sala' })}

  Sala.update({ status: 'ocupada' }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sala foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Nao pode atualizar sala com id=${id}. Talvez sala nao foi encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nao pode deletar sala com id=" + id
      });
    });
};

// find all status Sala
exports.findAllAtivo = (req, res) => {
  Sala.findAll({ where: { status: 'ativo' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao pegar todos os salas."
      });
    });
};

exports.findAllManutencao = (req, res) => {
  Sala.findAll({ where: { status: 'manutencao' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao pegar todos os salas."
      });
    });
};

exports.findAllOcupada = (req, res) => {
  Sala.findAll({ where: { status: 'ocupada' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao pegar todos os salas."
      });
    });
};
