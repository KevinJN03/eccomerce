import mongoose from 'mongoose';

const { Schema } = mongoose;

const MainCategory = new Schema({
  name: { type: Schema.Types.String, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: 'category' }],
});

export default mongoose.model('mainCategory', MainCategory);
