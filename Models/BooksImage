const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	title: String,
	bookId : mongoose.Schema.Types.ObjectId,
	img:
	{
		data: Buffer,
		contentType: String
	}
});


module.exports = new mongoose.model('bookimage', imageSchema);
