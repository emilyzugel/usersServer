import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './users.js'
import cors from 'cors'

const app = express()
const PORT = 3000

dotenv.config()
app.use(express.json())
app.use(cors())

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB!")
  } catch (error) {
    console.log("Error connecting to MongoDB:", error)
    process.exit(1)
  }
}
connectDB()

// CREATE - Add new user
app.post("/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    res.status(201).json({
      success: true,
      data: newUser,
      message: "User created successfully!"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      message: "Failed to create user!"
    })
  }
})

// READ - Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to fetch users!"
    })
  }
})

// READ BY ID (SEARCH)
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      })
    }
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      message: "Invalid user ID."
    })
  }
})

// UPDATE
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true // Run schema validations
      }
    )
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      })
    }
    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User updated successfully!"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      message: "Failed to update user."
    })
  }
})

// DELETE
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      })
    }
    res.status(200).json({
      success: true,
      data: deletedUser,
      message: "User deleted successfully!"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      message: "Failed to delete user."
    })
  }
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))

