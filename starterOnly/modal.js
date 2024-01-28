function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// show active link in navbar
let header = document.querySelector(".main-navbar");
let btns = header.getElementsByClassName("nav-link");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active", "");
    this.className += " active";
  });
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const close = document.querySelector(".close");
const btnSubmit = document.querySelector(".btn-submit");
const modalSuccess = document.querySelector(".modal-success");

// Form entries implementation
const form = document.querySelector("form");
const submit = document.getElementById("submit");
const firstname = document.getElementById("first");
const lastname = document.getElementById("last");
const eMail = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const quantitycompetition = document.getElementById("quantity");
const loc1 = document.getElementById("location1");
const loc2 = document.getElementById("location2");
const loc3 = document.getElementById("location3");
const loc4 = document.getElementById("location4");
const loc5 = document.getElementById("location5");
const loc6 = document.getElementById("location6");

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

// error and succes message function
function showErrorMessage(input, message) {
  const formData = input.parentElement;
  const error = formData.querySelector(".error-msg");
  formData.className = "formData error";
  error.textContent = message;
}

function hideErrorMessage(input) {
  const formData = input.parentElement;
  const error = formData.querySelector(".error-msg");
  formData.className = "formData success";
  error.textContent = "";
}

// error message displayed when error occurs
const errorMessage = {
  name: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  email: "Veuillez entrer une adresse e-mail valide",
  birthdate: "Vous devez entrer votre date de naissance.",
  birthdateAge: "Vous devez avoir 18 ans pour pouvoir vous inscrire",
  terms: "Veuillez accepter les conditions d'utilisation.",
  cities: "Vous devez choisir une option.",
  quantity: "Veuillez entrer une valeur numerique comprise entre 0 et 99",
};

//event listener on the form inputs to perform instant feedback on each fields
form.addEventListener("input", (e) => {
  switch (e.target.name) {
    case "first":
      CheckUserFirst();
      break;
    case "last":
      CheckUserLast();
      break;
    case "email":
      CheckEmail();
      break;
    case "birthdate":
      CheckBirthdate();
      break;
    case "quantity":
      CheckTournament();
      break;
    case "terms":
      CheckTerms();
      break;
    case "location":
      CheckCity();
      break;
    default:
      null;
  }
});

// function for each field to check their value
// firstname check
function CheckUserFirst() {
  let successField = false;
  const firstnameValue = firstname.value.trim();
  if (firstnameValue.length < 2 && firstnameValue === "") {
    showErrorMessage(firstname, errorMessage.name);
  } else {
    hideErrorMessage(firstname);
    successField = true;
  }
  return successField;
}

// lastname check
function CheckUserLast() {
  let successField = false;
  const lastnameValue = lastname.value.trim();
  if (lastnameValue.length < 2) {
    showErrorMessage(lastname, errorMessage.name);
  } else {
    hideErrorMessage(lastname);
    successField = true;
  }
  return successField;
}

// location check
function CheckCity() {
  let successField = false;
  const radioBtns = document.querySelectorAll('input[name="location"]');
  let cityselected = "";
  radioBtns.forEach((radioBtn) => {
    if (radioBtn.checked) {
      cityselected = radioBtn.value;
    }
  });
  if (cityselected == "") {
    showErrorMessage(document.getElementById("location6"), errorMessage.cities);
  } else {
    hideErrorMessage(document.getElementById("location6"));
    successField = true;
  }
  return successField;
}

// RegEx email
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function CheckEmail() {
  let successField = false;
  const emailValue = eMail.value.trim();
  if (emailValue === "") {
    showErrorMessage(eMail, errorMessage.email);
  } else if (!isEmail(emailValue)) {
    showErrorMessage(eMail, errorMessage.email);
  } else {
    hideErrorMessage(eMail);
    successField = true;
  }
  return successField;
}

// birthdate check
function CheckBirthdate() {
  let successField = false;
  const birthDateValue = birthDate.value.trim();
  const birthdate = new Date(birthDateValue);
  let difference = Date.now() - birthdate.getTime();
  difference = new Date(difference);
  const userAge = difference.getFullYear() - 1970;
  const currentYear = new Date().getFullYear();
  const birthYear = birthdate.getFullYear();

  if (birthDateValue == "") {
    showErrorMessage(birthDate, errorMessage.birthdate);
  } else if (birthYear < currentYear - 100 || userAge < 18) {
    showErrorMessage(birthDate, errorMessage.birthdateAge);
  } else {
    hideErrorMessage(birthDate);
    successField = true;
  }
  return successField;
}

// tournament check
function CheckTournament() {
  let successField = false;
  const quantitycompetitionValue = quantitycompetition.value.trim();
  if (
    quantitycompetitionValue < 0 ||
    quantitycompetitionValue > 99 ||
    quantitycompetitionValue === ""
  ) {
    showErrorMessage(quantitycompetition, errorMessage.quantity);
  } else {
    hideErrorMessage(quantitycompetition);
    successField = true;
  }
  return successField;
}

// terms and conditions check
function CheckTerms() {
  let successField = false;
  const terms = document.getElementById("checkbox1");
  if (!terms.checked) {
    showErrorMessage(terms, errorMessage.terms);
  }
  if (terms.checked) {
    hideErrorMessage(terms);
    successField = true;
  }
  return successField;
}

// function to close modal form and display success modal after all fields have passed validation
function validate() {
  let isUserFirstValid = CheckUserFirst(),
    isUserLastValid = CheckUserLast(),
    isEmailValid = CheckEmail(),
    isBirthdateValid = CheckBirthdate(),
    isTournamentValid = CheckTournament();
  isCityValid = CheckCity();
  isTermsValid = CheckTerms();

  let isFormValid =
    isUserFirstValid &&
    isUserLastValid &&
    isEmailValid &&
    isBirthdateValid &&
    isTournamentValid &&
    isCityValid &&
    isTermsValid;

  if (isFormValid) {
    console.log(isFormValid);
    modalbg.style.display = "none";
    modalSuccess.style.display = "block";
    form.reset();
  }
}

//form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// close modal Success
document
  .querySelector(".btn-success")
  .addEventListener("click", () => (modalSuccess.style.display = "none"));
