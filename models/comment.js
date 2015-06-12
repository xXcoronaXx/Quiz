// Definicion del modelo de los comentarios

module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
		"Comment",
		{ texto: {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> Falta el comentario"}}
			},
		  publicado: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
		}
	);
};