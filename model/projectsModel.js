import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Name is Required']
},
   status : {
    type: String,
    required: [true, 'Type is Required']
},
    date: Date,
  });
export default mongoose.model('Projects', projectSchema)  