var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  upvotes: {type: Number, default: 0},
	reports: {type: Number, default: 0},
	comments: Array,
	imageURI: String,
	caption: String,
  location: Object,
	hashtag: String,
  created_at: { type: Date, default: Date.now }
});

//instantiate the model using a Schema
mongoose.model('Post', PostSchema);

