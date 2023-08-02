const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const sequelize = require('./util/database');
const user = require('./models/user');
const userRouter=require('./routes/user');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
  
app.use('/user',userRouter);
sequelize.sync()
.then(result=>{
    app.listen(3000,()=>{
        console.log("3000 port started.....");
    })
})
.catch(error=>console.log(error));