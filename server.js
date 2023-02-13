require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3600

//middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

//routes
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'))

//api
app.use('/api/course', require("./routes/courseRoutes"));
app.use('/api/message', require('./routes/messageRoutes'));

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))