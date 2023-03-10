require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT =  3600//||process.env.PORT 
//middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

//Router
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'))

//api
// app.use("/api/auth", require("./routes/authRouter"))
app.use('/api/course', require("./routes/courseRouter"));
app.use('/api/version', require("./routes/versionRouter"));
app.use('/api/score', require("./routes/scoreRouter"));
app.use('/api/message', require('./routes/messageRouter'));
// app.use('/api/possible_answer',require('./routes/possibleAnsRouter'))
app.use('/api/questionnaire',require('./routes/questionnaireRouter'))
app.use('/api/question',require('./routes/questionRouter'))
app.use('/api/part_in_questionnaire', require('./routes/partRouter'));
app.use('/api/check-test',require('./routes/testRouter'));

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