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
const btnSubmit = document.querySelector(".btn-submit");
const modalSuccess = document.querySelector(".modal-success");

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

// error message for required fields
const errorMessage = {
  name: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  email: "Veuillez entrer une adresse e-mail valide",
  birthdate: "Vous devez entrer votre date de naissance.",
  birthdateAge: "Vous devez avoir 18 ans pour pouvoir vous inscrire",
  terms: "Veuillez accepter les conditions d'utilisation.",
  cities: "Vous devez choisir une option.",
  quantity: "Veuillez entrer une valeur numerique comprise entre 0 et 99",
};

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
// RegEx for date and email
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

let successField = true;
//form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  validate();

  if (successField) {
    const data = new FormData(e.target);
    const entries = Object.fromEntries(data.entries());
    console.table(entries);
    modalbg.style.display = "none";
    modalSuccess.style.display = "block";
    form.reset();
  } else {
    return (successField = false);
  }
});

function validate() {
  const firstnameValue = firstname.value.trim();
  const lastnameValue = lastname.value.trim();
  const emailValue = eMail.value.trim();
  const birthDateValue = birthDate.value.trim();
  const quantitycompetitionValue = quantitycompetition.value.trim();

  // firstname check
  if (firstnameValue.toString().length < 2 && firstnameValue === "") {
    showErrorMessage(firstname, errorMessage.name);
    return (successField = false);
  } else {
    hideErrorMessage(firstname);
  }

  // lastname check
  if (lastnameValue.toString().length < 2) {
    showErrorMessage(lastname, errorMessage.name);
    return (successField = false);
  } else {
    hideErrorMessage(lastname);
  }

  // email check
  if (emailValue === "") {
    showErrorMessage(eMail, errorMessage.email);
    return (successField = false);
  } else if (!isEmail(emailValue)) {
    showErrorMessage(eMail, errorMessage.email);
    return (successField = false);
  } else {
    hideErrorMessage(eMail);
  }

  // Birthday check
  const birthdate = new Date(birthDateValue);
  let difference = Date.now() - birthdate.getTime();
  difference = new Date(difference);
  const userAge = difference.getFullYear() - 1970;
  const currentYear = new Date().getFullYear();
  const birthYear = birthdate.getFullYear();

  if (birthDateValue == "") {
    showErrorMessage(birthDate, errorMessage.birthdate);
    return (successField = false);
  } else if (birthYear < currentYear - 100 || userAge < 18) {
    showErrorMessage(birthDate, errorMessage.birthdateAge);
    return (successField = false);
  } else {
    hideErrorMessage(birthDate);
  }

  // quantityTournament check
  if (
    quantitycompetitionValue.toString().length < 0 ||
    quantitycompetitionValue.toString().length > 99 ||
    quantitycompetitionValue === ""
  ) {
    showErrorMessage(quantitycompetition, errorMessage.quantity);
    return (successField = false);
  } else {
    hideErrorMessage(quantitycompetition);
  }

  // city check
  const radioBtns = document.querySelectorAll('input[name="location"]');
  let cityselected = "";
  radioBtns.forEach((radioBtn) => {
    if (radioBtn.checked) {
      cityselected = radioBtn.value;
    }
  });
  if (cityselected == "") {
    showErrorMessage(document.getElementById("location6"), errorMessage.cities);
    return (successField = false);
  } else {
    hideErrorMessage(document.getElementById("location6"));
  }

  // terms check
  const terms = document.getElementById("checkbox1");
  if (!terms.checked) {
    showErrorMessage(terms, errorMessage.terms);
    return (successField = false);
  }

  if (terms.checked) {
    hideErrorMessage(terms);
  }
  console.log(successField);

  return (successField = true);
}

// close modal Success
document
  .querySelector(".btn-success")
  .addEventListener("click", () => (modalSuccess.style.display = "none"));
