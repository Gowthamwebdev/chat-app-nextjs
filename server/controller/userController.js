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

        receiver.friendRequests.push({userId: senderId, status: "Pending"});
        await receiver.save();

        res.status(200).json({message: "Friend request sent successfully"});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

export const getPendingFriendRequests = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId).populate('friendRequests.userId', 'name email');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.status(200).json({ friendRequests: user.friendRequests });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching friend requests', error: error.message });
    }
  };

  export const acceptFriendRequest = async (req, res) => {
    try {
      const { userId, requestId } = req.params;
  
      const user = await User.findByIdAndUpdate(userId, {
        $pull: { friendRequests: { _id: requestId } },
        $push: { friends: requestId },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.status(200).json({ message: 'Friend request accepted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error accepting friend request', error: error.message });
    }
  };

  export const getFriendsList = async (req, res) => {
    try{
        const { userId } = req.params;

        const user = await User.findById(userId).populate('friends', 'name email');

        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json({ friends: user.friends });
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
  }
  