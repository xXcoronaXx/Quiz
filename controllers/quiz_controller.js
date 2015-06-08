var models = require('../models/models.js');


// GET quizes
exports.index = function (req, res) {
	if (req.query.search === undefined) {
		models.Quiz.findAll().then(function (quizes) {
			res.render('quizes/index', { quizes: quizes, errors: []});
		})
	}else{
		models.Quiz.findAll({
			order: [['pregunta', 'ASC']],
			where: ["pregunta like ?", '%'+req.query.search+'%'] 
		}).then(function (quizes) {
			res.render('quizes/index', { quizes: quizes, errors: []});
		})		
	}
};

// GET /quizes/:id
exports.show = function (req, res) {
	models.Quiz.find({where : { id: req.params.quizId }}).then(function (quiz) {
		res.render('quizes/show', { quiz: quiz, errors: [] });
	})
};

// GET quizes/:id/answer
exports.answer = function (req, res) {
	models.Quiz.find({where : { id: req.params.quizId }}).then(function (quiz) {
		if (req.query.respuesta.toLowerCase() === quiz.respuesta) {
			res.render('quizes/answer',{ quiz: quiz, respuesta: 'Correcto', errors: [] });
		} else {
			res.render('quizes/answer', { quiz: quiz, respuesta: 'Incorrecto', errors: [] });
		}
	})
};

// GET /quizes/new
exports.new = function (req, res) {
	var quiz = models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta"}
		);
	res.render("quizes/new", {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function (req, res) {
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.validate().then(
		function (err) {
			if (err) {
				res.render('quizes/new',{quiz:quiz, errors:err.errors});
			}else{
				quiz.save({fields:["pregunta","respuesta"]}).then(function () {
				res.redirect('/quizes');
				});
			}
		}
	);

};
