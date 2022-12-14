const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())

// app.use(express.static(path.resolve(__dirname, "../build")))
// End of setup lines

const {
   loginHTML,
   loginCSS,
   loginJS,
   loggedJS,
   resetCSS,
   getAllBudgets,
   createAcc,
   checkEmail,
   checkLogin,
   getBudget,
   createBudget,
   checkBudgetName,
   welcomeMessage,
   getBudgetCategories,
   submitSpendingForm,
   getCategoryId,
} = require('./controllers')

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
app.get('/welcomeMessage', welcomeMessage)
app.post('/getBudgetCategories', getBudgetCategories)
app.post('/submitSpendingForm', submitSpendingForm)
app.post('/getCategoryId', getCategoryId)

// app.get('/*', function (req, res) {
//    res.sendFile(path.join(__dirname, '../build', 'index.html'));
//  });

const { PORT } = process.env
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
