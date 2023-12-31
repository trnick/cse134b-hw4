const form = document.querySelector("form");
const p_name = document.getElementById("name");
const email = document.getElementById("mail");
const comment = document.getElementById('comm');
const n_error = document.querySelector('.errorOutput');

var form_errors = [];

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
    n_error.className = "errorOutput";
  } 
  else {
    p_name.className = "invalid";
    if (!regexValid) {
      p_name.className = "invalid";
      n_error.textContent = "Invalid character.";
      n_error.className = "errorOutput active";
      form_errors.push({ message: `Invalid Property in Name Field`, timestamp: new Date().toISOString() });
    }
  }
});

email.addEventListener("input", () => {
  const isValid = email.value.length === 0 || emailRegExp.test(email.value);
  if (isValid) {
    email.className = "valid";
    n_error.textContent = "";
    n_error.className = "errorOutput";
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
    $('#infoOutput').text(0);
  } else {
    $('#infoOutput').text(remainingChars);

    if (remainingChars < 50 && remainingChars > 15) {
      color = 'orange';
    }
    else if (remainingChars <= 15) {
      color = 'red';
    }
    else {
      color = 'white';
    }
    infoOutput.style.color = color;
    }
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const nameLength = p_name.value.length;
  const p_nameIsValid =  nameLength >= minNameLength && nameLength <= maxNameLength && nameRegExp.test(p_name.value);
  if (!p_nameIsValid) {
    p_name.className = "invalid";
    n_error.textContent = "Please enter a valid name.";
    n_error.className = "errorOutput active";
    form_errors.push({ message: `Invalid Property in Name Field`, timestamp: new Date().toISOString() });
  }
  else {
    p_name.className = "valid";
    n_error.textContent = "";
    n_error.className = "errorOutput";
  }

  const emailIsValid = email.value.length === 0 || emailRegExp.test(email.value);
  if (!emailIsValid) {
    email.className = "invalid";
    n_error.textContent = "Please enter a valid email address.";
    n_error.className = "errorOutput active";
    form_errors.push({ message: `Invalid Property in EMail Field`, timestamp: new Date().toISOString() });
  } else {
    email.className = "valid";
    n_error.textContent = "";
    n_error.className = "errorOutput";
  }

  let arr = JSON.stringify(form_errors);

  fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: arr,
  })
    .catch(error => console.error('Error:', error));

  console.log(arr);
  form_errors = [];
});

/* pt.4 theme change */

function themeChange() {
  var element = document.body;
  element.classList.toggle("dark-mode");

  var isDarkMode = element.classList.contains("dark-mode");

  localStorage.setItem("theme", isDarkMode ? "dark-mode" : "light-mode");

  const button_text = document.getElementById("themeBut");
  var currTheme = localStorage.getItem("theme");
  if (currTheme == "dark-mode") {
    button_text.textContent = "Toggle Sun";
  }
  else if (currTheme == "light-mode"){
    button_text.textContent = "Toggle Moon";
  }
}

document.addEventListener("DOMContentLoaded", function () {

  document.getElementById('themeBut').style.display = 'block';

  var currTheme = localStorage.getItem("theme");

  const button_text = document.getElementById("themeBut");
  if (currTheme == "dark-mode") {
    button_text.textContent = "Toggle Sun";
  }
  else if (currTheme == "light-mode"){
    button_text.textContent = "Toggle Moon";
  }

  if (currTheme) {
    document.body.classList.add(currTheme);
  }
  
});