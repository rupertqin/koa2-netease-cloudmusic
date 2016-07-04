const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
      
const InfoSchema = new Schema({
  key: {type: String},
  data: {type: Object},
  create_at: {type: Date, default: Date.now},
  update_at: {type: Date, default: Date.now}
})

InfoSchema.index({key: 1}, {unique: true})

const Info = mongoose.model('Info', InfoSchema)
module.exports = Info