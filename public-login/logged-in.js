



function displayBudgets() {
    axios.get('/allbudgets')
    .then((res) => {
        console.log(res.data)
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




function getBudget() {
    axios.post('/getBudget', {budgetName: budgetSelect.value})
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => console.log('there was an error in getBudget function' + err))
    console.log('getBudget function ran')
    console.log(budgetSelect.value)
}











console.log('hola papi')