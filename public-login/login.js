let createAccBtn = document.querySelector("#createAcc-btn");
let cancelAccBtn = document.querySelector("#createAcc-close-btn");
let createAccEmailInput = document.querySelector("#email-create-input");
let createAccpassword1 = document.querySelector("#password-create-input");
let createAccpassword2 = document.querySelector("#password-create-input2");
let createAccName = document.querySelector("#createAcc-names-input");
let NewUserBtn = document.querySelector("#new-user-btn");
let createAccDiv = document.querySelector('#createAcc-div-parent')



createAccEmailInput.addEventListener('focus', (event) => {
    event.target.style.background = 'aqua'
})

let emailAvailable = false

createAccEmailInput.addEventListener('blur', (event) => {
    event.target.style.background = ''
    axios.get('/checkemail/:' + createAccEmailInput.value.toLowerCase())
    .then((res) => {
        console.log(res.data)

        if (res.data.length === 0) {
            emailAvailable = true
            event.target.style.background = ''
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
                            console.log(res)
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




function createAccAppear(event) {
    event.preventDefault()

    createAccDiv.classList.add('display')

}
NewUserBtn.addEventListener("click", createAccAppear);







console.log("hello there");
