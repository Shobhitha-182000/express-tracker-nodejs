const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');
const helmet=require('helmet');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const sequelize = require('./util/database');
const user = require('./models/user');
const userRouter=require('./routes/user');
const expense = require('./models/expense');
const expenseRouter=require('./routes/expense');
const orders = require('./models/orders');
const purchaseRoutes=require('./routes/purchase');
const leaderBoardRouter=require('./routes/leaderboard');
const forgotpasswordRoutes=require('./routes/forgotpassword');
const { leaderBoard } = require('./controllers/leaderboard');
const forgotPassword = require('./models/ForgotPasswordRequests');
const reportsRouter=require('./routes/reports');
const premiumRoutes=require('./routes/premiumRoutes');
const filedownload = require('./models/filedownload');
const compression = require('compression');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'views')));

app.use(helmet());
const accesslog=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
app.use(morgan('combined',{stream:accesslog}));
 

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(orders);
orders.belongsTo(user);

user.hasMany(forgotPassword);
forgotPassword.belongsTo(user);
 
user.hasMany(filedownload);
filedownload.belongsTo(user);
  
app.use('/user',userRouter);
app.use(expenseRouter);
app.use('/purchase',purchaseRoutes);
app.use('/premium',premiumRoutes);
app.use('/password',forgotpasswordRoutes)
app.use('/reports', reportsRouter);

sequelize.sync()
.then(result=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log("3000 port started.....");
    })
})
.catch(error=>console.log(error));