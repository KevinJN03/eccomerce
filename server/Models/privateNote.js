import { Schema, model } from 'mongoose';

const PrivateNoteSchema = new Schema({
  note: { required: true, type: Schema.Types.String },
  date: { required: true, type: Schema.Types.Date, default: Date.now },
});

export default model('privateNote', PrivateNoteSchema);
