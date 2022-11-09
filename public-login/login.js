let createAccBtn = document.querySelector("#createAcc-btn");
let cancelAccBtn = document.querySelector("#createAcc-close-btn");
let createAccEmailInput = document.querySelector("#email-create-input");
let createAccpassword1 = document.querySelector("#password-create-input");
let createAccpassword2 = document.querySelector("#password-create-input2");
let createAccName = document.querySelector("#createAcc-names-input");
let NewUserBtn = document.querySelector("#new-user-btn");
let createAccDiv = document.querySelector('#createAcc-div-parent')




function createAccount(event) {
  event.preventDefault()

  console.log("-----------------------------------------")
  console.log("createAccount function started");

    if (createAccpassword1.value === createAccpassword2.value) {
        // console.log("passwords match")

        if (createAccEmailInput.value.length > 5) {
            // console.log('email is long enough')
            if (createAccpassword1.value.length > 5) {
                // console.log("password length good")

                if (createAccName.value.length > 3) {
                axios.post('/createaccount', {email: createAccEmailInput.value, name: createAccName.value, password: createAccpassword1.value})
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log('There was a big doo doo with the post request')
                    console.log(err)
                })

                // MAKE THE PASSWORD HASHED BEFORE STORING IT

                // console.log("A name was entered, all inputs accepted");
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
