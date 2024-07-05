const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(cors({credentials:true, origin:"http://localhost:5173"}))
app.use(bodyParser.json())
app.use(cookieParser());

// Connect to MongoDB using the new connection method (using async/await)
async function connectToDB() {
  try {
    await mongoose.connect('mongodb+srv://TheMahendra:Mahendra787@driveready.fstolj3.mongodb.net/Mern?retryWrites=true&w=majority')
    .then(() => app.listen(5000, () => {
        console.log('server running on port 5000')
    }))
    .then(()=> console.log('connected to DB'))
    // Continue with your application logic here
  } catch (error) {
    console.error('Error:', error.message);
  }
}
connectToDB();

app.use(express.json())
// const bookRouter = require('./routes/books')
// app.use('/books',bookRouter)

const userRouter = require('./routes/user-routes')
app.use('/api',userRouter);