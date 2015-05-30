// GET quizes/question
exports.question = function (req, res) {
	console.log('Question');
	res.render('quizes/question', { pregunta: 'Capital de Italia'});
};

// GET quizes/answer
exports.answer = function (req, res) {
	if (req.query.respuesta.toLowerCase() === 'roma') {
		res.render('quizes/answer',{ respuesta: 'Correcto' });
	} else {
		res.render('quizes/answer', { respuesta: 'Incorrecto' });
	}
};