const db = require("../models");
const Curso = db.cursos;
const Coordenador = db.coordenadores;
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

// Create and Save a new Curso
exports.create = async (req, res) => {

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })
  var coordenadorFind = await Coordenador.findOne({
    where: {
      id: funcaoFind.dataValues.coordenador_id
    }
  })

  const curso = {
    nome: req.body.nome,
    area: req.body.area ? req.body.area : coordenadorFind.dataValues.area,
    status: req.body.status ? req.body.status : true,
  }

  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse usuario' })
  }

  Curso.create(curso)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao criar o Curso."
      });
    });
};

// Retrieve all Cursos from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Curso.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao consultar os cursos."
      });
    });
};

// Find a single Curso with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Curso.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao pegar o curso com id=" + id
      });
    });
};

// Update a Curso by the id in the request
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
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse usuario' })
  }

  Curso.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Curso foi atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Nao pode atualizar curso com id=${id}. talvez curso nao foi encontrado ou o req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erro ao atualizar curso com id=" + id
      });
    });
};

// Delete a Curso with the specified id in the request
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
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse usuario' })
  }

  Curso.update({ status: false }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Curso foi deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Nao pode atualizar curso com id=${id}. Talvez curso nao foi encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nao pode deletar curso com id=" + id
      });
    });
};

// Delete all Cursos from the database.
exports.deleteAll = async (req, res) => {

  var userId = req.userId
  var funcaoFind = await Usuario.findOne({
    where: {
      id: userId
    }
  })

  if (funcaoFind != null) {
    if (!(funcaoFind.dataValues.funcao == "coordenador" || funcaoFind.dataValues.funcao == "admin"))
      return res.status(400).send({ error: 'Voce não tem permissão para cadastrar esse usuario' })
  }

  Curso.update({ status: false }, {
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Cursos foram deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao deletar todos os cursos."
      });
    });
};

// find all status Curso
exports.findAllAtivo = (req, res) => {
  Curso.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Aconteceu um erro ao pegar todos os cursos."
      });
    });
};
