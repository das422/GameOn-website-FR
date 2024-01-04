

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const close = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


// close modal form
close.addEventListener("click", closeModal);
function closeModal() {
  modalbg.style.display = "none";


}


// Form entries implementation
const form = document.querySelector("form");
const submit = document.getElementById("submit");
const firstname = document.getElementById("first");
// const errorfirst = document.querySelector(".error-msg");
const lastname = document.getElementById("last");
// const errorlast = document.getElementById(".error-msg");
const eMail = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const quantitycompetition = document.getElementById("quantity");
const loc1 = document.getElementById("location1");
const loc2 = document.getElementById("location2");
const loc3 = document.getElementById("location3");
const loc4 = document.getElementById("location4");
const loc5 = document.getElementById("location5");
const loc6 = document.getElementById("location6");


// form.addEventListener("submit", (e) =>validate (e));

// function validate(e) {

// e.preventDefault();

// if (firstname.value.trim().toString().length < 2) {
//   errorfirst.classList.add("visible");
//   errorfirst.textContent = "not a valid answer";
//   return true;
// }

// else
//   errorfirst.classList.remove("visible");
// errorfirst.textContent = "";
// return false;


// }

  // error message for required fields
const errorMessage = {
  name: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  email: "Veuillez entrer une adresse e-mail valide",
  birthdate: "Vous devez entrer votre date de naissance.",
  terms: "Vous devez vérifier que vous acceptez les termes et conditions.",
  location: "Vous devez choisir une option.",
}

// RegEx for date and email
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}



form.addEventListener("submit", e => {
  e.preventDefault();

  checkFields();
});


function checkFields() {
  const firstnameValue = firstname.value.trim();
  const lastnameValue = lastname.value.trim();
  const emailValue = eMail.value.trim();
  const birthDateValue = birthDate.value.trim();
  const quantitycompetitionValue = quantitycompetition.value.trim();
  const loc1Value = loc1.value.trim();
  const loc2Value = loc2.value.trim();
  const loc3Value = loc3.value.trim();
  const loc4Value = loc4.value.trim();
  const loc5Value = loc5.value.trim();
  const loc6Value = loc6.value.trim();


  // firstname check
  if (firstnameValue.toString().length < 2 && firstnameValue === "") {
    setErrorMessagefor(firstname, errorMessage.name);
  }
  else {
    isValid(firstname);
  }

// lastname check
  if (lastnameValue.toString().length < 2) {
    setErrorMessagefor(lastname, errorMessage.name);
  }
  else {
   isValid(lastname);
  }

  // email check
  if (emailValue ==='') {
    setErrorMessagefor(eMail, errorMessage.email);
  }
  else if (!isEmail(emailValue)) {
    setErrorMessagefor(eMail, errorMessage.email);
  }
  else {
    isValid(eMail);
  }

}








// error and succes message function
function setErrorMessagefor(input, message) {
  const formData = input.parentElement;
  const error = formData.querySelector('.error-msg');
  
  formData.className = 'formData error';
  error.textContent = message;
}

function isValid(input) {
  const formData = input.parentElement;
  const error = formData.querySelector('.error-msg');
  formData.className = 'formData success';
  error.textContent = "";

}
// check if field valid



// send validation form








// validation











