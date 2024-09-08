import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

console.log("auth file loading...");
const firebaseConfig = {
  apiKey: "AIzaSyAPIRDvG_iI4b5KBM9zDUWhw9fPogLdHa8",
  authDomain: "mz-e-commerce-e3969.firebaseapp.com",
  projectId: "mz-e-commerce-e3969",
  storageBucket: "mz-e-commerce-e3969.appspot.com",
  messagingSenderId: "417338132297",
  appId: "1:417338132297:web:07778c4d2d5b3946fc3c98",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);
auth.useDeviceLanguage();
if (
  localStorage.getItem("displayName") ||
  localStorage.getItem("email") ||
  localStorage.getItem("phoneNumber") ||
  localStorage.getItem("uid")
) {
  location.replace("../profile/overview");
}
$("form").on("submit", (e) => {
  e.preventDefault();
});

$("#signupBtn").on("click", () => {
  const email = $("#email__input__signup").val().value;
  const password = $("#password__input__signup").val().value;
  const displayName = $("#name__input").val().value;
  setLocStore("displayName", displayName);
  createNewUser(email, password);
});

$("#loginBtn").on("click", () => {
  const email = document.getElementById("email__input__signIn").value;
  const password = document.getElementById("password__input__signIn").value;
  signInWithEmail(email, password).catch(() => {
    topRightSwal(`invalid email or password`, "error");
  });
});

$(".google__btn").on("click", () => {
  signInWithGoogle();
});

async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  await saveUserData(user);
  setLocStore("displayName", user.displayName);
  setLocStore("email", user.email);
  setLocStore("phoneNumber", user.phoneNumber);
  setLocStore("photoURL", user.photoURL);
  setLocStore("uid", user.uid);
  setLocStore("accessToken", user.accessToken);
  setLocStore("refreshToken", user.refreshToken);
  setLocStore("creationTime", user.metadata.creationTime);
  setLocStore("signInMethod", "google");
  setLocStore("loginType", "Google");
  location.replace("../profile/overview");
}

async function signInWithEmail(email, password) {
  const auth = getAuth();
  const result = await signInWithEmailAndPassword(auth, email, password);
  const user = result.user;

  setLocStore("displayName", user.displayName);
  setLocStore("email", user.email);
  setLocStore("phoneNumber", user.phoneNumber);
  setLocStore("photoURL", user.photoURL);
  setLocStore("uid", user.uid);
  setLocStore("accessToken", user.accessToken);
  setLocStore("refreshToken", user.refreshToken);
  setLocStore("creationTime", user.metadata.creationTime);
  setLocStore("signInMethod", "email");
  await saveUserData(user);
  location.replace("../profile/overview");
}
async function createNewUser(email, password) {
  const auth = getAuth();
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;
  setLocStore("email", user.email);
  setLocStore("phoneNumber", user.phoneNumber);
  setLocStore("photoURL", user.photoURL);
  setLocStore("uid", user.uid);
  setLocStore("accessToken", user.accessToken);
  setLocStore("refreshToken", user.refreshToken);
  setLocStore("creationTime", user.metadata.creationTime);
  setLocStore("signInMethod", "email");
  await saveUserData(user);
  location.replace("../profile/overview");
}

function saveUserData(user) {
  const userDocRef = doc(db, "users", user.uid);

  return getDoc(userDocRef)
    .then((userDoc) => {
      if (!userDoc.exists()) {
        return setDoc(userDocRef, {
          uid: user.uid,
          gender: "",
          subscribeToNews: false,
          orders: [],
          address1: "",
          address2: "",
          phoneNumber: user.phoneNumber || "",
          photoURL: user.photoURL || "",
          gender: "",
          country: "",
          city: "",
          email: user.email || "",
          displayName: getLocStore("displayName"),
          createdAt: new Date(),
        });
      } else {
        return setDoc(userDocRef, { merge: true });
      }
    })
    .then(() => {
      topRightSwal(`Logged in successfully`, "success");
    })
    .catch((error) => {
      topRightSwal(`Error while saving data: ${error}`, "error");
    });
}
