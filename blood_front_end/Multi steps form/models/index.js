const express=require('express')
const cors=require('cors')
const cookieParser = require('cookie-parser');
require('./mongoose')
const userRouter=require('./routeruser')
// const donorRouter=require('./routerdonor')
const app=express()

const port=process.env.PORT || 3000
app.use(cors())
app.use(cookieParser())
app.use(express.static('public', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        }
    },
}));

app.use(express.json()) //automatically convert jason to object means you can pass req.body directly without parsing it
app.use(userRouter) //We create a new Router and take it into this app so we can use it
// app.use(donorRouter)
app.listen(port,()=>{
    console.log('server is up on port', port)
})

const Donor=require('./Donor')