let form = document.getElementById("form");

let username = document.getElementById("username");
let password = document.getElementById("password");
let password2 = document.getElementById("password2");
let email = document.getElementById("email");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(username.value);
  validateInputs();
});

password.addEventListener("input", () => {
  let passwordValue = password.value.trim();
  const formControl = password.parentElement;
  const small = formControl.querySelector("small");

  // add error message inside small tag
  if (passwordValue.length < 5) {
    small.innerText = "Weak Password";
    small.style.color = "red";
    small.style.visibility = "visible";
  } else if (passwordValue.length < 8) {
    small.innerText = "Medium Password";
    small.style.color = "orange";
    small.style.visibility = "visible";
  } else {
    small.innerText = "Strong Password";
    small.style.color = "green";
    small.style.visibility = "visible";
  }
});

password2.addEventListener("input", () => {
  let passwordValue = password.value.trim();
  let password2Value = password2.value.trim();
  const formControl = password2.parentElement;
  const small = formControl.querySelector("small");

  // add error message inside small tag
  if (password2Value === passwordValue) {
    small.innerText = "Password Matches";
    small.style.color = "green";
    small.style.visibility = "visible";
  } else {
    small.innerText = "Password Does Not Match";
    small.style.color = "red";
    small.style.visibility = "visible";
  }
});

function validateInputs() {
  let usernameValue = username.value.trim();
  let passwordValue = password.value.trim();
  let password2Value = password2.value.trim();
  let emailValue = email.value.trim();

  if (usernameValue === "") {
    setError(username, "Username cannot be blank");
  } else {
    setSuccess(username);
  }

  if (passwordValue === "") {
    setError(password, "Password cannot be blank");
  } else {
    setSuccess(password);
  }

  if (password2Value === "") {
    setError(password2, "Password cannot be blank");
  } else if (passwordValue !== password2Value) {
    setError(password2, "Passwords do not match");
  } else {
    setSuccess(password2);
  }

  if (emailValue === "") {
    setError(email, "Email cannot be blank");
  } else {
    setSuccess(email);
  }
}

function setError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // add error message inside small tag
  small.innerText = message;
  small.style.color = "red";
  small.style.visibility = "visible";
}

function setSuccess(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // remove error message
  small.innerText = "";
  small.style.visibility = "hidden";
}
