const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
      
const UserSchema = new Schema({
  name: {type: String},
  password: {type: String},
  create_at: {type: Date, default: Date.now},
  update_at: {type: Date, default: Date.now}
})

const User = mongoose.model('User', UserSchema)
module.exports = User