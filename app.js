const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const sequelize = require('./util/database');
const user = require('./models/user');
const userRouter=require('./routes/user');
const expense = require('./models/expense');
const expenseRouter=require('./routes/expense');
const orders = require('./models/orders');
const purchaseRoutes=require('./routes/purchase');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static('public'));

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(orders);
orders.belongsTo(user);
  
app.use('/user',userRouter);
app.use(expenseRouter);
app.use('/purchase',purchaseRoutes);

sequelize.sync()
.then(result=>{
    app.listen(3000,()=>{
        console.log("3000 port started.....");
    })
})
.catch(error=>console.log(error));