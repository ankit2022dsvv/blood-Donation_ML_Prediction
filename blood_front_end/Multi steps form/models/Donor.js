const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    donatedBefore: {
        type: String,
        enum: ['yes', 'no'],
        required: true
    },
    surgeries: {
        type: String,
        enum: ['yes', 'no'],
        required: true
    },
    pregnancies: {
        type: Number,
        default: null
    },
    bmi: {
        type: String,
        required: true
    },
    bloodPressure: {
        type: String,
        required: true
    },
    healthCondition: {
        type: String,
        enum: ['yes', 'no'],
        required: true
    },
    transfusion: {
        type: String,
        enum: ['yes', 'no'],
        required: true
    },
    notDonatedLast3Months: {
        type:Boolean,
        required: true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
});

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;