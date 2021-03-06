const express = require('express');
const path = require('path'); // allows to dynamically build when we call it from current directory to where we actually go
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const expressValidator = require('express-validator')

const dotenv = require('dotenv')
dotenv.config();

const mongoose = require('mongoose');

// Import Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const paymentRoutes = require('./routes/braintree')
const orderRoutes = require('./routes/order')
const formRoutes = require('./routes/form')

// APP
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

// Database Configuration
mongoose.connect(`${process.env.DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Database Connected.'))
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

// Routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', paymentRoutes);
app.use('/api', orderRoutes)
app.use('/api', formRoutes)

app.get('/', (req, res) => {
    res.json({message: 'You just hit the End Point'});
});

// Execute
const port = process.env.PORT || 8000;
app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Server listening at http://localhost:${port}`);
});
