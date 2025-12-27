import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 150,
  },
  description: {
    type: String,
    minlength: 0,
    maxlength: 300,
    createdBy,
  },
});
