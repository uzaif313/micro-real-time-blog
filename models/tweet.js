const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  owner:{ type: Schema.Types.ObjectId, ref:'user'},
  content: String,
  created: {type: Date, default: Date.new}
});

module.exports = mongoose.model("Tweet", TweetSchema)
