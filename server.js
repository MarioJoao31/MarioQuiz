const express = require('express');
const connectDB= require('./config/db');

const app = express();

//LIGAÇão A BASE DE DADOS
connectDB();

//Init Middleware
app.use(express.json({extended:false}));
app.get('/',(req,res)=>res.send('API ON'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/quizes', require('./routes/api/quizes'));

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server Aberto na: PORT ${PORT}`));