import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const RequestTrapSchema = new Schema(
    {
      //field and rules  
    },
    { collection: 'traps' }
);


RequestTrapSchema.plugin(timestamps);

//index fields
RequestTrapSchema.index({ });

module.exports = exports = mongoose.model('RequestTrap', RequestTrapSchema);