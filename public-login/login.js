let createAccBtn = document.querySelector("#createAcc-btn");
let cancelAccBtn = document.querySelector("#createAcc-close-btn");
let createAccEmailInput = document.querySelector("#email-create-input");
let createAccpassword1 = document.querySelector("#password-create-input");
let createAccpassword2 = document.querySelector("#password-create-input2");
let createAccName = document.querySelector("#createAcc-names-input");
let NewUserBtn = document.querySelector("#new-user-btn");
let createAccDivParent = document.querySelector("#createAcc-div-parent");





function createAccount(event) {
  event.preventDefault();

  console.log("-----------------------------------------");
  console.log("createAccount function started");

  if (createAccpassword1.value === createAccpassword2.value) {
    console.log("passwords match");

    if (createAccpassword1.value.length > 5 && createAccEmailInput.value.length > 5) {
      console.log("email and password lengths are good");
      if (createAccName.value !== "") {
        // axios.post('/createAccount', {email: createAccEmailInput.value, name: createAccName.value, password: createAccpassword1.value})
        // .then((res) => {

        // })
        // .catch((err) => {

        // })

        // MAKE THE PASSWORD HASHED BEFORE STORING IT


        console.log("A name was entered, all inputs accepted");
      } else {
        console.log("No account name was entered");
        alert("You need to enter your account name(s)!");
      }
    } else {
      console.log("Email or password was not long enough");
      alert("Your email or password is not long enough");
    }
  } else {
    console.log("Passwords do not match");
    alert("Passwords do not match!");
  }
}
createAccBtn.addEventListener("click", createAccount);





function createAccAppear(event) {
  event.preventDefault()

  createAccDivParent.innerHTML = `
    <div id="createAcc-div">
        <form id="createAcc-form">
            <label for="email">Email</label>
            <input name="email" id="email-create-input" type="email" placeholder="Enter a valid email">

            <label for="names">Name(s)</label>
            <input name="names" id="createAcc-names-input" type="text" placeholder="Ex: Jack and Jill">

            <label for="password">Password</label>
            <input name="password" id="password-create-input" type="password" placeholder="At least 6 characters">

            <label for="password2">Re-enter password</label>
            <input name="password2" id="password-create-input2" type="password" placeholder="Passwords must match">
        </form>

        <div id="createAcc-btns-div">
            <button id="createAcc-close-btn">Cancel</button>
            <button id="createAcc-btn">Create Account</button>
        </div>
    </div>
        `
}
NewUserBtn.addEventListener("click", createAccAppear);

console.log('hello there')
