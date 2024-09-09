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
  createNewUser(email, password, displayName);
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
  await signInWithPopup(auth, provider).then((res) => {
    if (res.operationType === "signIn") {
      getUserDoc(res.user.uid, res.user);
    } else {
      saveUserData(res.user);
    }
  });
}

async function signInWithEmail(email, password) {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password).then((res) => {
    getUserDoc(res.user.uid);
  });
}

async function createNewUser(email, password, userName) {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password).then(
    async (res) => {
      const user = res.user;
      await saveUserData(user, userName);
    }
  );
}
const getUserDoc = async (userId, user) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      console.log("User Document Data:", userDocSnap.data());
      setLocStore("displayName", userDocSnap.data().displayName);
      setLocStore("email", userDocSnap.data().email);
      setLocStore("phoneNumber", userDocSnap.data().phoneNumber);
      setLocStore("uid", userDocSnap.data().uid);
      setLocStore("accessToken", user.accessToken);
      setLocStore("refreshToken", user.refreshToken);
      setLocStore("creationTime", user.metadata.creationTime);
      setLocStore("signInMethod", "email");
      setLocStore("profileImageUrl", userDocSnap.data().profileImageUrl);
      setLocStore("gender", userDocSnap.data().gender);
      setLocStore("subscribeToNews", userDocSnap.data().subscribeToNews);
      setLocStore("country", userDocSnap.data().country);
      setLocStore("city", userDocSnap.data().city);
      setLocStore("birthDate", userDocSnap.data().birthDate);
      setLocStore("age", userDocSnap.data().age);
      setLocStore("addresses", userDocSnap.data().addresses);
      setSessionStore("orders", userDocSnap.data().orders);
    }
  } finally {
    topRightSwal("logged in successfully", "success");
    setTimeout(() => {
      location.replace("../profile/overview");
    }, 1000);
  }
};

function saveUserData(user, userName) {
  const userDocRef = doc(db, "users", user.uid);
  return getDoc(userDocRef)
    .then((userDoc) => {
      if (!userDoc.exists()) {
        return setDoc(userDocRef, {
          displayName: user.displayName || userName,
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          uid: user.uid,
          subscribeToNews: false,
          createdAt: user.metadata.creationTime,
          profileImageUrl: user.photoURL || "null",
          country: "",
          city: "",
          birthDate: "",
          age: "",
          orders: [],
          addresses: [],
          gender: "",
        });
      } else {
        return setDoc(userDocRef, {}, { merge: true });
      }
    })
    .then(() => {
      setLocStore("displayName", userName);
      setLocStore("email", user.email);
      setLocStore("phoneNumber", user.phoneNumber);
      setLocStore("uid", user.uid);
      setLocStore("accessToken", user.getIdToken());
      setLocStore("refreshToken", user.refreshToken);
      setLocStore("creationTime", user.metadata.creationTime);
      setLocStore("signInMethod", "email");
      setLocStore(
        "profileImageUrl",
        user.photoURL ||
          "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/user.jpg?alt=media&token=1a6064c6-da7e-419d-ad0f-4c2f16bc2df9"
      );
      setLocStore("gender", "");
      setLocStore("subscribeToNews", "");
      setLocStore("country", "");
      setLocStore("city", "");
      setLocStore("birthDate", "");
      setLocStore("age", "");
      setLocStore("addresses", JSON.stringify([]));
      setSessionStore("orders", JSON.stringify([]));
      topRightSwal(`Logged in successfully`, "success");
      setTimeout(() => {
        location.replace("../profile/overview");
      }, 1000);
    })
    .catch((error) => {
      topRightSwal(`Error while saving data: ${error}`, "error");
    });
}
