const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(express.json())
app.use(cors())


// End of setup lines


const { loginHTML, loginCSS, loginJS, resetCSS, getAllBudgets, createAcc, checkEmail, checkLogin } = require('./controllers')

app.get('/', loginHTML)
app.get('/resetcss', resetCSS)
app.get('/css', loginCSS)
app.get('/js', loginJS)


app.get('/allbudgets', getAllBudgets)
app.post('/createaccount', createAcc)
app.post('/checkemail', checkEmail)
app.post('/loginattempt', checkLogin)




const PORT = process.env.PORT || 3999

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))