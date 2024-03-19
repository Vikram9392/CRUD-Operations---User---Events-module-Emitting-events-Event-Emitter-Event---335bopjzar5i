// Import the necessary modules and models
const User = require('../model/userModel');
const express = require('express');
const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  // Implement user creation logic here
  // 1. Extract user data from the request body (req.body)
  const {name,email}=req.body;
  // 2. Create a new user using User.create()
  try{
   const createdUser= await User.create({name,email});
   return res.status(201).json({message:'User created',user:createdUser})
  }
  catch(err){
    return res.status(400).json({message:'please send the appropriate data'})
  }
  // 3. Handle success: Respond with a 201 status code and the created user
  // 4. Handle errors: Respond with appropriate error messages and status codes
});

// Retrieve a user by ID
router.get('/users/:id', async (req, res) => {
  // Implement user retrieval logic here
  // 1. Extract the user ID from the request parameters (req.params.id)
  const userId=req.params.id;
  // 2. Find the user by ID using User.findById()
  try{
    const user=await User.findById(userId);
    if(!user){
      return res.status(404).json({message:'User not found'})
    }
    return res.status(200).json({user})
  }
  catch(err){
    return res.status(400).json({message:'please send the appropriate data'})
  }
  // 3. Handle success: Respond with a 200 status code and the user data
  // 4. Handle errors: Respond with appropriate error messages and status codes
});

// Update a user by ID
router.patch('/users/:id', async (req, res) => {
  // Implement user update logic here
  // 1. Extract the user ID from the request parameters (req.params.id)
  const userId=req.params.id;
  // 2. Extract updated user data from the request body (req.body)
  const updatedUser=req.params.body;
  // 3. Use User.findByIdAndUpdate() to update the user
  try{
   const updatedUser2=await User.findByIdAndUpdate(userId,updatedUser,{new:true})
   if(!updatedUser2){
    return res.status(404).json({message:'User not found'})
   }
   return res.status(200).json({message:'User updated',user:updatedUser})
  }
  catch(err){
    return res.status(400).json({message:'please send the appropriate data'})
  }
  // 4. Handle success: Respond with a 200 status code and the updated user data
  // 5. Handle errors: Respond with appropriate error messages and status codes
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  // Implement user deletion logic here
  // 1. Extract the user ID from the request parameters (req.params.id)
  const userId=req.params.id;
  try{
    const updatedUser=await User.findByIdAndDelete(userId)
    if(!updatedUser){
     return res.status(404).json({message:'User not found'})
    }
    return res.status(200).json({message:'User deleted'})
   }
   catch(err){
     return res.status(400).json({message:'please send the appropriate data'})
   }
  // 2. Use User.findByIdAndDelete() to delete the user
  // 3. Handle success: Respond with a 200 status code and a deletion confirmation message
  // 4. Handle errors: Respond with appropriate error messages and status codes
});

module.exports = router;
