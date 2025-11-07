import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
  }
})

export default mongoose.model("Users", usersSchema)
