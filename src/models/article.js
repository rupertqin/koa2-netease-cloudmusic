const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
      
const ArticleSchema = new Schema({
  title: {type: String},
  content: {type: String},
  category: {type: String},
  create_at: {type: Date, default: Date.now},
  update_at: {type: Date, default: Date.now}
})

const Article = mongoose.model('Article', ArticleSchema)
export default Article