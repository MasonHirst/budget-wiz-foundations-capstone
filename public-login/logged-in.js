


function welcome() {
    axios.get('/welcomeMessage')
    .then((res) => {
        welcomeMessage.innerHTML = `Welcome, ${res.data.acc_name}`
        greetingMessage.innerHTML = `Hey ${res.data.acc_name}!`
    })
    .catch(err => console.log('welcome function didn\'t work', err))
}





function displayBudgets() {
    budgetSelect.innerHTML = ''
    logBudgetSelect.innerHTML = ''

    axios.get('/allbudgets')
    .then((res) => {
        
        let baseOption = document.createElement('option')
        baseOption.textContent = 'Select Budget'
        budgetSelect.appendChild(baseOption)
        let baseOption2 = document.createElement('option')
        baseOption2.textContent = 'Select Budget'
        logBudgetSelect.appendChild(baseOption2)
        
        for (i = 0; i < res.data.length; i++) {
            let newOption = document.createElement('option')
            newOption.textContent = res.data[i].name
            budgetSelect.appendChild(newOption)
            let newOption2 = document.createElement('option')
            newOption2.textContent = res.data[i].name
            logBudgetSelect.appendChild(newOption2)
        }

    })
    .catch((err) => {
        console.log(err)
    })
}





function getBudgetCategories() {

    axios.post('/getBudgetCategories', {budget: logBudgetSelect.value})
    .then((res) => {
        spendingSelectCategory.innerHTML = ''
        let baseOption = document.createElement('option')
        baseOption.textContent = 'Select Category'
        spendingSelectCategory.appendChild(baseOption)
        
        for (i = 0; i < res.data.length; i++) {
            let newOption = document.createElement('option')
            newOption.textContent = res.data[i].category_name
            spendingSelectCategory.appendChild(newOption)
        }
    })
    .catch((err) => {
        console.log('problem with the getBudgetCategories()', err)
    })
}
// Has an onchange listener in the html file ^




// This function actually puts a new expense/income into the database under the right category_id
function submitSpending(obj) {
    
    axios.post('/submitSpendingForm', obj)
    .then((res) => {
        alert(res.data)
    })
}



// This function takes the object passed in by the submitHandler function, and now needs to find the category id of the desired category
function getCategoryId(obj) {

    axios.post('/getCategoryId', {budgetName: obj.budget, categoryName: obj.budgetCategory})
    .then((res) => {
        let newObj = {
            budget: obj.budget,
            budgetCategory: obj.budgetCategory,
            spendingType: obj.spendingType,
            spendingName: obj.spendingName,
            amount: obj.amount,
            spendingNote: obj.spendingNote,
            categoryId: res.data[0].category_id
        }
        submitSpending(newObj)
        // This function takes the new obj, which includes the category id from the database, and passes it to the submitSpending function

    })
    .catch((err) => {
        console.log(err)
    })
}



// This function handles the input fields when you hit submit on an expense/income log, and turns the info into an object
function submitSpendingHandler(event) {
    event.preventDefault()

    let spendingType = document.querySelector('#select-expense-income')
    let spendingName = document.querySelector('#expense-income-name-input')
    let amount = document.querySelector('#expense-income-amount-input')
    let spendingNote = document.querySelector('#expense-income-note-input')

    if (hasApostrophe(spendingName.value) === false && hasApostrophe(amount.value) === false && hasApostrophe(spendingNote.value) === false && spendingName.value != '' && amount.value != '' && spendingSelectCategory.value != 'Select Category') {
        let newObj = {
            budget: logBudgetSelect.value,
            budgetCategory: spendingSelectCategory.value,
            spendingType: spendingType.value,
            spendingName: spendingName.value,
            amount: amount.value,
            spendingNote: spendingNote.value
        }

        getCategoryId(newObj)
        // This calls the getCategoryId function, passing in the object created from the inputs

        spendingName.value = ''
        amount.value = ''
        spendingNote.value = ''
    } else {
        alert('Log name or amount or Select Category cannot be empty')
    }
}
spendingSubmitForm.addEventListener('submit', submitSpendingHandler)





let budgetCategoryList = document.querySelector('#budget_categories_list')

function getBudget() {
    axios.post('/getBudget', {budgetName: budgetSelect.value})
    .then((res) => {

        budgetCategoryList.innerHTML = ''

        if (res.data.length > 0) {
            for (i = 0; i < res.data.length; i++) {
                let newListItem = document.createElement('li')
                newListItem.textContent = res.data[i].category_budget + ' - ' + res.data[i].category_name
                budgetCategoryList.appendChild(newListItem)
            }
        } else {
            let newListItem = document.createElement('li')
                newListItem.textContent = 'There are no categories in this budget yet!'
                budgetCategoryList.appendChild(newListItem)
        }

    })
    .catch((err) => console.log('there was an error in getBudget function' + err))
    console.log('getBudget function ran')
    console.log(budgetSelect.value)
}




function checkBudgetName(event) {
    event.preventDefault()

    if (hasApostrophe(createBudgetInput.value) === false) {
        axios.post('/checkBudgetName', {name: createBudgetInput.value})
        .then((res) => {
            console.log(res.data)
            if (res.data.length === 0) {
                createBudget()
            } else {
                alert('You already have a budget with that name!')
            }
        })
        .catch(err => console.log('checkBudgetName function didnt work' + err))
    } else {
        alert('Budget name cannot an apostrophe, comma, or quotes')
    }
}
document.querySelector('#create-budget-form').addEventListener('submit', checkBudgetName)





function createBudget() {
    axios.post('/createBudget', {name: createBudgetInput.value})
    .then((res) => {
        console.log('createBudget.then ran', res)
        alert('New budget created!')
    })
    .catch((err) => {
        console.log('There was an error with the createBudget function' + err)
    })
    createBudgetInput.value = ''
    displayBudgets()
}





document.querySelector('#new-budget-view').addEventListener('click', () => {
    newBudgetDisplay.classList.remove('no-display')
    budgetDisplay.classList.add('no-display')
    spendingDisplay.classList.add('no-display')
    greetingMessageArticle.classList.add('no-display')
})


document.querySelector('#budgets-view').addEventListener('click', () => {
    newBudgetDisplay.classList.add('no-display')
    budgetDisplay.classList.remove('no-display')
    spendingDisplay.classList.add('no-display')
    greetingMessageArticle.classList.add('no-display')
})


document.querySelector('#spending-view').addEventListener('click', () => {
    newBudgetDisplay.classList.add('no-display')
    budgetDisplay.classList.add('no-display')
    spendingDisplay.classList.remove('no-display')
    greetingMessageArticle.classList.add('no-display')
})



