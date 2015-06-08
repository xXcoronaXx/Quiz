var models = require('../models/models.js');


// GET quizes
exports.index = function (req, res) {
	if (req.query.search === undefined) {
		models.Quiz.findAll().then(function (quizes) {
			res.render('quizes/index', { quizes: quizes});
		})
	}else{
		models.Quiz.findAll({
			order: [['pregunta', 'ASC']],
			where: ["pregunta like ?", '%'+req.query.search+'%'] 
		}).then(function (quizes) {
			res.render('quizes/index', { quizes: quizes});
		})		
	}
};

// GET /quizes/:id
exports.show = function (req, res) {
	models.Quiz.find({where : { id: req.params.quizId }}).then(function (quiz) {
		res.render('quizes/show', { quiz: quiz });
	})
};

// GET quizes/:id/answer
exports.answer = function (req, res) {
	models.Quiz.find({where : { id: req.params.quizId }}).then(function (quiz) {
		if (req.query.respuesta.toLowerCase() === quiz.respuesta) {
			res.render('quizes/answer',{ quiz: quiz, respuesta: 'Correcto' });
		} else {
			res.render('quizes/answer', { quiz: quiz, respuesta: 'Incorrecto' });
		}
	})
};