import User from '../models/userModel.js'

export const createUser = async (req, res) => {
  try {
    const { name, age, gender, email, password } = req.body;

    // Validate request body
    if (!name || !age || !gender || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create and save the user
    const newUser = new User({ name, age, gender, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};