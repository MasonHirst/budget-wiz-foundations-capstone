let createAccBtn = document.querySelector("#createAcc-btn");
let cancelAccBtn = document.querySelector("#createAcc-close-btn");
let createAccEmailInput = document.querySelector("#email-create-input");
let createAccpassword1 = document.querySelector("#password-create-input");
let createAccpassword2 = document.querySelector("#password-create-input2");
let createAccName = document.querySelector("#createAcc-names-input");
let NewUserBtn = document.querySelector("#new-user-btn");
let createAccDiv = document.querySelector('#createAcc-div-parent')
let loginEmailInput = document.querySelector('#email-login-input')
let loginPasswordInput = document.querySelector('#password-login-input')
let loginSubmit = document.querySelector('#login-form')
let loggedInDiv = document.querySelector('#logged-in-page')
let loginHTML = document.querySelector('#login-html-page')
let budgetSelect = document.querySelector('#budget-select')
let createBudgetInput = document.querySelector('#create-budget-input')
let welcomeMessage = document.querySelector('#welcome-message')
let logBudgetSelect = document.querySelector('#budget-select-expense-income')
let budgetDisplay = document.querySelector('#budget-display')
let newBudgetDisplay = document.querySelector('#new-budget-display')
let spendingDisplay = document.querySelector('#spending-display')
let greetingMessage = document.querySelector('.greeting-message')
let greetingMessageArticle = document.querySelector('#greeting-message-article')
let spendingSelectCategory = document.querySelector('#category-select-expense-income')
let spendingSubmitForm = document.querySelector('#expense-income-form')






function hasApostrophe(str) {
    for (i = 0; i < str.length; i++) {
        if (str[i] === "'" || str[i] === '"' || str[i] === ',') {
            return true
        }
    }
    return false
}




let emailAvailable = false
// This event listener fires a function when focus is taken off the email input box, and checks the database
// to see if that email is available
createAccEmailInput.addEventListener('blur', (event) => {
    event.target.style.background = ''
    
    if (hasApostrophe(createAccEmailInput.value) === false) {
        axios.post('/checkemail', {email: createAccEmailInput.value.toLowerCase()})
        .then((res) => {
            console.log(res.data)

            if (res.data.length === 0) {
                emailAvailable = true
                event.target.style.background = 'lightgreen'
            } else {
                // alert('That email is already taken!')
                event.target.style.background = 'red'
            }
        })
        .catch((err) => {
            console.log('auto email checker did not work :(')
            console.log(err)
        })
    } else {
        alert('Email cannot have an apostrophe, comma , or quotes')
    }
})


// This function takes the inputs of the login form, and checks the database to see if they match.
// If they match, it hides the login and create account forms, and brings up the account page
function login(event) {
    event.preventDefault()

    console.log('login function started')
    axios.post('/loginattempt', {email: loginEmailInput.value.toLowerCase(), password: loginPasswordInput.value})
    .then((res) => {
        console.log('login .then reached')
        console.log(res.data)
        if (res.data === 'login credentials match database') {
            loginHTML.classList.add('no-display')
            loggedInDiv.classList.remove('no-display')
            greetingMessageArticle.classList.remove('no-display')

            welcome()
            displayBudgets()
            
        } else {
            console.log('login credentials do not match database')
            alert('Email or password does not match')
        }
    })
    .catch((err) => {
        console.log(err)
    })
}
loginSubmit.addEventListener('submit', login)





// This function uses if statements to check each input of the createAcc form. If the passwords 
// don't match, if won't get to the password length checker, and so on. It only send the axios.post
// request if all the if statements are passed.
function checkApostrophe(event) {
    event.preventDefault()
    if (hasApostrophe(createAccpassword1.value) === true) {
        alert('password cannot have apostrophes, quotes, or commas')
        return true
    }
    if (hasApostrophe(createAccName.value) === true) {
        alert('Name(s) cannot have apostrophes, quotes, or commas')
        return true
    }
    if (hasApostrophe(createAccEmailInput.value) === true) {
        alert('Email cannot have apostrophes, quotes, or commas')
        return true
    }

    createAccount()
}
createAccBtn.addEventListener("click", checkApostrophe);


function createAccount() {

  console.log("-----------------------------------------")
  console.log("createAccount function started");

    

    if (createAccpassword1.value === createAccpassword2.value) {
        console.log("passwords match")

        if (createAccEmailInput.value.length > 5) {
            console.log('email is long enough')
            if (createAccpassword1.value.length > 5) {
                console.log("password length good")

                if (createAccName.value.length > 2) {

                    if (emailAvailable === true) {
                        axios.post('/createaccount', {email: createAccEmailInput.value.toLowerCase(), name: createAccName.value, password: createAccpassword1.value})
                        .then((res) => {
                            console.log(res.data)
                            createAccDiv.classList.add('no-display')
                            NewUserBtn.classList.remove('no-display')
                            loginSubmit.classList.remove('no-display')
                        })
                        .catch((err) => {
                            console.log('There was a big doo doo with the post request')
                            console.log(err)
                        })

                        // MAKE THE PASSWORD HASHED BEFORE STORING IT

                        console.log("A name was entered, all inputs accepted");
                    } else {
                        console.log('that email is taken')
                        alert('That email is not available')
                    }
                } else {
                    console.log("No account name was entered");
                    alert("Your account name is not long enough");
                    }
            } else {
                console.log("password is not long enough");
                alert("Password is not long enough");
                }
        } else {
            console.log('email is not long enough')
            console.log(hasApostrophe(createAccEmailInput.value))
            alert('Email is not long enough')
            } 
    } else {
        console.log("Passwords do not match");
        alert("Passwords do not match!");
        }
}




// this function displays the createAccDiv when the 'New User' button is clicked
NewUserBtn.addEventListener("click", (event) => {
    event.preventDefault()
    createAccDiv.classList.remove('no-display')
    NewUserBtn.classList.add('no-display')
    loginSubmit.classList.add('no-display')
})

// this function hides the createAccDiv when the 'cancel' button is clicked
cancelAccBtn.addEventListener('click', (event) => {
    event.preventDefault()
    createAccDiv.classList.add('no-display')
})



