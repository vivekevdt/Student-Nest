import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';
// import Listing from '../models/listing.model.js';
import Host from '../models/host.model.js';

export const test =(req,res)=>{
    res.json({
        message:"test api is woking"
    })
}

export const updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, contact, avatar } = req.body;
    console.log(req.params.id)

    // 🔍 Basic Validation
    if (!firstName || firstName.trim().length < 2) {
      return res.status(400).json({ message: "First name must be at least 2 characters long." });
    }

    if (contact && !/^\d{10}$/.test(contact)) {
      return res.status(400).json({ message: "Contact number must be 10 digits." });
    }

    // ✅ Update user
    const updatedUser = await Host.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, contact,avatar },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    next(error); // 🔥 Pass to global error handler
  }
};


  export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'You can only delete your own account!'));
    try {
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted!');
    } catch (error) {
      next(error);
    }
  };

  export const getUserListings = async (req, res, next) => {
      try {
        const hostId = req.params.id;

        if (!hostId) {
          return res.status(400).json({ success: false, message: "Host ID is required" });
        }
    
        const listings = await Listing.find({ host: hostId });
    
        if (!listings || listings.length === 0) {
          return res.status(404).json({ success: false, message: "No listings found for this host" });
        }
    
        res.status(200).json({ success: true, listings });
      } catch (error) {
        console.error("Error fetching listings by host:", error);

        next(error);
    
  };
}
  
  export const getUser = async (req, res, next) => {
    try {
      
      const user = await User.findById(req.params.id);
    
      if (!user) return next(errorHandler(404, 'User not found!'));
    
      const { password: pass, ...rest } = user._doc;
    
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  
  