import { Schema, Types } from "mongoose";

export const ProductQuantityAtLocationSchema = new Schema( {
  storeLocationId: {
    type    : Types.ObjectId,
    required: true,
  },
  productId: {
    type    : Types.ObjectId,
    required: true,
  },
  amount: {
    type   : Number,
    min    : 0,
    default: 0,
  },
} );
