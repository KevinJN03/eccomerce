import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  products: [{ type: Schema.Types.String }],
  gender: { type: Schema.Types.String, ref: 'mainCategory' },
  mainCategory: { type: Schema.Types.ObjectId, ref: 'mainCategory' },
});

export default mongoose.model('category', CategorySchema);
