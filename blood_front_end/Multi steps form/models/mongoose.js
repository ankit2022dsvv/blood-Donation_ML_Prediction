const mongoose=require('mongoose')
//impotant module learn more from here https://www.npmjs.com/package/validator
// const validator=require('validator')
                           //host name      // databse name
mongoose.connect('mongodb://127.0.0.1:27017/User-login',{
    useNewUrlParser:true,
    
})

