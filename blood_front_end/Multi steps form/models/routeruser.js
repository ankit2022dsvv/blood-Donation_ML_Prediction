const express = require('express');
const router = new express.Router();
const User = require('./user');
const auth = require('./auth');
const multer = require('multer');
const Donor = require('./Donor');


// Create a new user
router.post('/donors', async (req, res) => {
    // const donorData = req.body.donor;

    const token=req.body.token
    console.log(token)
    const user = await User.findOne({"tokens.token": token}) 
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
router.get('/users/me', auth, async (req, res) => {
    try {
        await req.user.populate('donor').execPopulate();
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    console.log(user);
    try {
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Login user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        // res.cookie('my_cookie', token);
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

// Logout user
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// Logout all sessions for user
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// Get user profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

// Update user profile
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password', 'mobileNumber', 'address', 'name', 'dob', 'weight', 'gender', 'isHuman'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Delete user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.delete();
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
});

// Upload user avatar
const upload = multer({
    limits: {
        fileSize: 1000000 // 1MB limit
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
            return cb(new Error('Please upload a JPEG, JPG, or PNG image'));
        }
        cb(undefined, true);
    }
});



// Delete user avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// Get user avatar
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send();
    }
});

module.exports = router;
