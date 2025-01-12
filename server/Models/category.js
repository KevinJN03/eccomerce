import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    // products: [{ type: Schema.Types.String }],
    //   men: [{ type: Schema.Types.ObjectId, ref: 'product' }],
    //  women: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  },
  { strictPopulate: false },
);

export default mongoose.model('category', CategorySchema);
