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

export const sendFriendRequest = async(req, res) => {
    try{
        const { senderId, receiverId } = req.body;

        if(!senderId || !receiverId){
            return res.status(400).json({error: "Please provide senderId and receiverId"});
        }

        const receiver = await User.findById(receiverId);

        if(!receiver){
            return res.status(404).json({error: "Receiver not found"});
        }

        const existingRequest = receiver.friendRequests.find((req) => req.userId.toString() === senderId); 

        if(existingRequest){
            return res.status(400).json({error: "Friend request already sent"});
        }

        receiver.friendRequests.push({userId: senderId, status: "pending"});
        await receiver.save();

        res.status(200).json({message: "Friend request sent successfully"});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}