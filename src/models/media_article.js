const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
      
const MediaArticleSchema = new Schema({
  title: {type: String},
  position: {type: String},
  content: {type: String},
  category: {type: String},
  create_at: {type: Date, default: Date.now},
  update_at: {type: Date, default: Date.now}
})

const MediaArticle = mongoose.model('MediaArticle', MediaArticleSchema)
export default MediaArticle