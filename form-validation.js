const form = document.querySelector("form");
const p_name = document.getElementById("name");
const email = document.getElementById("mail");
const comment = document.getElementById('comm');
const n_error = document.querySelector('.n_error');
const e_error = document.querySelector('.e_error');

var formErrors = [];

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const nameRegExp =
  /^[a-zA-Z]+(?:-[a-zA-Z]+)?(?: [a-zA-Z]+)?$/;

  
const minNameLength = parseInt(p_name.getAttribute("minlength"));
const maxNameLength = parseInt(p_name.getAttribute("maxlength"));

window.addEventListener("load", () => {

  const nameLength = p_name.value.length;
  const nameIsValid = nameLength >= minNameLength && nameLength <= maxNameLength && nameRegExp.test(p_name.value);
  p_name.className = nameIsValid ? "valid" : "invalid";

  const emailIsValid = email.value.length === 0 || emailRegExp.test(email.value);
  email.className = emailIsValid ? "valid" : "invalid";
});


p_name.addEventListener("input", () => {
  const nameLength = p_name.value.length;
  const isValid = nameLength >= minNameLength && nameLength <= maxNameLength && nameRegExp.test(p_name.value);
  const regexValid = nameRegExp.test(p_name.value);
  if (isValid) {
    p_name.className = "valid";
    n_error.textContent = "";
    n_error.className = "n_error";
  } 
  else {
    p_name.className = "invalid";
    if (!regexValid) {
      p_name.className = "invalid";
      n_error.textContent = "Invalid character.";
      n_error.className = "n_error active";
      formErrors.push({ message: `Invalid Property in Name Field`, timestamp: new Date().toISOString() });
      submit();
      formErrors = [];
    }
  }
});

email.addEventListener("input", () => {
  const isValid = email.value.length === 0 || emailRegExp.test(email.value);
  const regexValid = emailRegExp.test(email.value);
  if (isValid) {
    email.className = "valid";
    e_error.textContent = "";
    e_error.className = "e_error";
  } else {
    email.className = "invalid";
  }
});


const maxCommentLength = parseInt(comment.getAttribute("maxlength"));

function countChar(val) {

  var len = val.value.length;
  var remainingChars = maxCommentLength - len;

  if (len >= maxCommentLength) {
    val.value = val.value.substring(0, maxCommentLength);
    $('#charNum').text(0);
  } else {
    $('#charNum').text(remainingChars);

    if (remainingChars < 50 && remainingChars > 15) {
      color = 'orange';
    }
    else if (remainingChars <= 15) {
      color = 'red';
    }
    else {
      color = 'white';
    }
      charNum.style.color = color;
    }

};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameLength = p_name.value.length;
  const p_nameIsValid =  nameLength >= minNameLength && nameLength <= maxNameLength && nameRegExp.test(p_name.value);
  if (!p_nameIsValid) {
    p_name.className = "invalid";
    n_error.textContent = "Please enter a valid name.";
    n_error.className = "n_error active";
    formErrors.push({ message: `Invalid Property in Name Field`, timestamp: new Date().toISOString() });
    submit();
    formErrors = [];
  }
  else {
    p_name.className = "valid";
    n_error.textContent = "";
    n_error.className = "n_error";
  }

  const emailIsValid = email.value.length === 0 || emailRegExp.test(email.value);
  if (!emailIsValid) {
    email.className = "invalid";
    e_error.textContent = "Please enter a valid email address.";
    e_error.className = "e_error active";
    formErrors.push({ message: `Invalid Property in EMail Field`, timestamp: new Date().toISOString() });
    submit();
    formErrors = [];
  } else {
    email.className = "valid";
    e_error.textContent = "";
    e_error.className = "e_error";
  }
});

function submit() {
  var formErrorsJSON = JSON.stringify(formErrors);
  console.log("Submitting form errors to server:", formErrorsJSON);
}