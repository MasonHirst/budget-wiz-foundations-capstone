const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(express.json())
app.use(cors())


// End of setup lines


const { loginHTML, loginCSS, loginJS, loggedJS, resetCSS, getAllBudgets, createAcc, checkEmail, checkLogin, getBudget, createBudget, checkBudgetName } = require('./controllers')

app.get('/', loginHTML)
app.get('/resetcss', resetCSS)
app.get('/css', loginCSS)
app.get('/js', loginJS)
app.get('/js2', loggedJS)


app.get('/allbudgets', getAllBudgets)
app.post('/createaccount', createAcc)
app.post('/checkemail', checkEmail)
app.post('/loginattempt', checkLogin)
app.post('/getBudget', getBudget)
app.post('/createBudget', createBudget)
app.post('/checkBudgetName', checkBudgetName)





const PORT = process.env.PORT || 3999

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))