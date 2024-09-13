import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
//
const firebaseConfig = {
  apiKey: "AIzaSyAPIRDvG_iI4b5KBM9zDUWhw9fPogLdHa8",
  authDomain: "mz-e-commerce-e3969.firebaseapp.com",
  projectId: "mz-e-commerce-e3969",
  storageBucket: "mz-e-commerce-e3969.appspot.com",
  messagingSenderId: "417338132297",
  appId: "1:417338132297:web:07778c4d2d5b3946fc3c98",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ? signInMethod == "email"? return true: false
//?  true: validate, authenticate, changes
//?  false: return error, signout, go to login page

document.addEventListener("DOMContentLoaded", () => {
  if (getLocStore("signInMethod") != "email") {
    $("#oldPass1").attr("disabled", "disabled");
    $("#newPass1").attr("disabled", "disabled");
    $("#newPass2").attr("disabled", "disabled");
    $("#changePassBtn").attr("disabled", "disabled");
    $(".switch").attr("disabled", "disabled");
  }
});

const switchButton = document.getElementById("switch");
switchButton.addEventListener("click", function () {
  switchButton.classList.toggle("checked");
});
const form = $("#changePassForm");
form.on("submit", (event) => {
  event.preventDefault();
});
const submitBtn = $("#changePassBtn");

submitBtn.on("click", () => {
  if (getLocStore("signInMethod") == "email") {
    const passwords = {
      oldPass: $("#oldPass1").val().value,
      newPass: $("#newPass1").val().value,
      confirmNewPass: $("#newPass2").val().value,
    };
    if (passwords.newPass === passwords.confirmNewPass) {
      submitChangePass(passwords);
    } else {
      topRightSwal("Passwords aren't matched", "error");
    }
  }
});
function submitChangePass(passwords) {
  const user = auth.currentUser;
  if (user) {
    const credential = EmailAuthProvider.credential(
      user.email,
      passwords.oldPass
    );
    if (getLocStore("signInMethod") == "email") {
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, passwords.newPass)
            .then(() => {
              topRightSwal("Password updated successfully");
            })
            .catch((error) => {
              topRightSwal(`Error updating password: ${error}`, "error");
            });
        })
        .catch((error) => {
          topRightSwal(
            `Error, please reLogin and try again: ${error}`,
            "error"
          );
        });
    }
  } else {
    topRightSwal(
      `Error, No user are signed in, please resign in and try again`,
      "error"
    );
  }
}
addActiveElement("security");
