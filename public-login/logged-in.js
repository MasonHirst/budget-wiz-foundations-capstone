


function welcome() {
    axios.get('/welcomeMessage')
    .then((res) => {
        welcomeMessage.innerHTML = `Welcome, ${res.data.acc_name}`
    })
    .catch(err => console.log('welcome function didn\'t work', err))
}





function displayBudgets() {
    budgetSelect.innerHTML = ''
    axios.get('/allbudgets')
    .then((res) => {
        
        let baseOption = document.createElement('option')
        baseOption.textContent = 'Select Budget'
        budgetSelect.appendChild(baseOption)
        
        for (i = 0; i < res.data.length; i++) {
            let newOption = document.createElement('option')
            newOption.textContent = res.data[i].name
            budgetSelect.appendChild(newOption)
        }

    })
    .catch((err) => {
        console.log(err)
    })
}





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

    if (hasApostrophe(createBudgetInput.value) === false)
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
}
document.querySelector('#create-budget-form').addEventListener('submit', checkBudgetName)





function createBudget() {
    axios.post('/createBudget', {name: createBudgetInput.value})
    .then((res) => {
        console.log('createBudget.then ran')
    })
    .catch((err) => {
        console.log('There was an error with the createBudget function' + err)
    })
    createBudgetInput.value = ''
    displayBudgets()
}







