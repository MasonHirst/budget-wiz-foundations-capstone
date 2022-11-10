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



// createAccEmailInput.addEventListener('focus', (event) => {
//     event.target.style.background = 'aqua'
// })

let emailAvailable = false
// This event listener fires a function when focus is taken off the email input box, and checks the database
// to see if that email is available
createAccEmailInput.addEventListener('blur', (event) => {
    event.target.style.background = ''
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
})



function login(event) {
    event.preventDefault()

    axios.post('/loginattempt', {email: loginEmailInput.value.toLowerCase(), password: loginPasswordInput.value})
    .then((res) => {
        console.log(res.data)

        if (res.data === 'login credentials match database') {
            loginSubmit.classList.add('no-display')
            createAccDiv.classList.remove('display')
            createAccDiv.classList.add('no-display')
            NewUserBtn.classList.add('no-display')
            
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
function createAccount(event) {
  event.preventDefault()

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
                            createAccDiv.classList.remove('display')
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
                    alert("You need to enter your account name(s)!");
                    }
            } else {
                console.log("password is not long enough");
                alert("Password is not long enough");
                }
        } else {
            console.log('email is not long enough')
            alert('Email is not long enough')
            } 
    } else {
        console.log("Passwords do not match");
        alert("Passwords do not match!");
        }
}
createAccBtn.addEventListener("click", createAccount);



// this function displays the createAccDiv when the 'New User' button is clicked
NewUserBtn.addEventListener("click", (event) => {
    event.preventDefault()
    createAccDiv.classList.add('display')
})

// this function hides the createAccDiv when the 'cancel' button is clicked
cancelAccBtn.addEventListener('click', (event) => {
    event.preventDefault()
    createAccDiv.classList.remove('display')
})




console.log("hello there");
