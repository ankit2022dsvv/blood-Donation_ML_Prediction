const express = require('express');
const bodyParser = require('body-parser');
const auth=require('./auth')
const Donor = require('./model/formDataModel'); // Assuming donor.js is where you defined the schema
const cors = require('cors'); // Import the cors middleware
const router = new express.Router();
const User=require('./user')

// Middleware
router.use(bodyParser.json());
router.use(cors()); // Enable CORS for all routes


// Route to handle form submission
router.post('/submit',auth,async (req, res) => {
    console.log('absc')
    const token=req.body.token
    
    const user = await User.findOne({"sessions.token": token}) 
    const donor = new Donor({
        ...req.body.donor,
        owner:user._id
     });
    try {
       
        await donor.save();
        res.send('Form submitted successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

