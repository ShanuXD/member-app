const express=require('express')
const app=express()
const path=require('path')
const logger=require('./middleware/logger')
const exphbs=require('express-handlebars')

const members=require('./members')
const PORT=process.env.PORT||5000
const route=require('./routes/api/members')

//handel middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//body parser middileware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//app.use(logger)

//home route
app.get('/',(req,res)=>res.render('index',{
    title:"Member app",
    members
}))

//set static folder
app.use(express.static(path.join(__dirname,'public')))

//member api route
app.use('/api/members',route)

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})