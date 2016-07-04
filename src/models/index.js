import mongoose from 'mongoose'
import config from '../config'
mongoose.connect(`mongodb://${config.db.host}/${config.db.database}`);

