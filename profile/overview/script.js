import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

const firebaseConfig = {
  apiKey: "AIzaSyAPIRDvG_iI4b5KBM9zDUWhw9fPogLdHa8",
  authDomain: "mz-e-commerce-e3969.firebaseapp.com",
  projectId: "mz-e-commerce-e3969",
  storageBucket: "mz-e-commerce-e3969.appspot.com",
  messagingSenderId: "417338132297",
  appId: "1:417338132297:web:07778c4d2d5b3946fc3c98",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);
const profileImage = $("#profileImage");
document.addEventListener("DOMContentLoaded", () => {
  setSessionStore("oldImage", getLocStore("profileImageURL"));
  async function getOverviewData() {
    // * handle phone number
    handlePhoneNumber();
    // * handle gender
    handleGender();
    // * handle subscription
    handleSubscribtion();
    // * handle birthDate
    handleBirthDate();
    // * handle Name
    handlefirstName();
    handleLastName();
    handleFullName();
    handleProfileImage();
  }
  getOverviewData();
});
$("#logoutBtn").on("click", () => {
  console.log("ok");
  confirmPopupDialog(
    "Are you sure?",
    "",
    "info",
    "#ff8c00",
    "red",
    "confirm",
    "cancel"
  ).then((res) => {
    if (navigator.onLine) {
      if (res.isConfirmed) {
        signOut(auth)
          .then(() => {
            localStorage.clear();
            topRightSwal("Signed out successfully", "success", 1000, "green");
            setTimeout(() => {
              location.replace("../login");
            }, 1000);
          })
          .catch((error) => {
            topRightSwal(`error: ${error.message}`);
          });
      }
    } else {
      topRightSwal(
        "Check your internet connection and try again",
        "error",
        3000,
        "red"
      );
    }
  });
});
profileImage.on("click", () => {
  document.getElementById("imageInput").click();
  console.log("photo clicked");
});

function resizeAndConvertToWebP(file) {
  return new Promise((resolve, reject) => {
    if (!(file instanceof File || file instanceof Blob)) {
      return reject(new Error("Invalid file type. Expected File or Blob."));
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxSize = 1024;
        let { width, height } = img;

        if (width > height && width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        } else if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) =>
            blob
              ? resolve(blob)
              : reject(new Error("Failed to convert image to WebP")),
          "image/webp",
          0.8
        );
      };
    };
    reader.readAsDataURL(file);
  });
}

function uploadImageToFirebase(blob) {
  const storageRef = ref(storage, `userPofileImgs/${Date.now()}.webp`);
  const path = storageRef.fullPath;
  setSessionStore("path", path);
  return uploadBytesResumable(storageRef, blob)
    .then((snapshot) => getDownloadURL(snapshot.ref))
    .catch((err) => topRightSwal(`Failed to update image: ${err}`));
}

function deleteOldImageFromFirebase(imagePath) {
  if (!imagePath) {
    console.log("can't find path", imagePath);
    return;
  } else {
    const imageRef = ref(storage, imagePath);
    console.log("img found: ", imageRef);
    return deleteObject(imageRef);
  }
}

function getDefaultProfileImageUrl() {
  return "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/user.jpg?alt=media&token=1a6064c6-da7e-419d-ad0f-4c2f16bc2df9";
}

function handleProfileImage() {
  if (
    getLocStore("profileImageURL") ==
    "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/user.jpg?alt=media&token=1a6064c6-da7e-419d-ad0f-4c2f16bc2df9"
  ) {
    console.log("default profile img");
    document.getElementById("profileImage").src = getDefaultProfileImageUrl();
  } else {
    document.getElementById("profileImage").src =
      getLocStore("profileImageURL");
  }
}

$("#imageInput").on("change", (event) => {
  const file = event.target.files[0];
  console.log("file:", file);
  if (file) {
    console.log("file is ok");
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("reader loaded");
      const imagePreview = document.getElementById("imagePreview");
      imagePreview.src = e.target.result;

      console.log("crop modal preview opening");
      document.getElementById("cropModal").style.display = "flex";
      document.body.classList.add("loading-active");
      document.body.style.pointerEvents = "all";
      console.log("crop modal preview finished");
      initializeCropper(imagePreview);
    };
    reader.readAsDataURL(file);
  }
});

function initializeCropper(imageElement) {
  console.log("initializing cropper", imageElement);
  let cropper = new Cropper(imageElement, {
    aspectRatio: 1,
    viewMode: 1,
    responsive: true,
    background: false,
  });

  const destroyCropper = () => {
    cropper?.destroy();
    cropper = null;
  };

  document.getElementById("cropButton").onclick = () => {
    cropper.getCroppedCanvas().toBlob((blob) => {
      if (blob) {
        console.log("blob: ", blob);
        handleImageUpload(blob);
        closeCropModal();
        destroyCropper();
      }
    });
  };

  document.getElementById("closeButton").onclick = () => {
    closeCropModal();
    destroyCropper();
    console.log("cancel clicked");
  };
}

function closeCropModal() {
  document.getElementById("cropModal").style.display = "none";
  document.body.classList.remove("loading-active");
}

async function handleImageUpload(file) {
  console.log("Starting image upload: ", file);

  if (!navigator.onLine) {
    return topRightSwal(
      "You're offline, please check your internet connection",
      "error",
      3000,
      "red"
    );
  }
  try {
    const imageContainer = document.querySelector(".user__img__container");
    const profileImg = document.getElementById("profileImage");
    const animationContainer = document.createElement("div");
    const circle = document.createElement("div");
    const userDocRef = doc(db, "users", getLocStore("uid"));

    animationContainer.classList.add("circleInnerContent-container");
    circle.classList.add("circleInnerContent");
    animationContainer.appendChild(circle);
    imageContainer.style.position = "relative";
    imageContainer.appendChild(animationContainer);

    // Resize and upload image
    const resizedImageBlob = await resizeAndConvertToWebP(file);
    const newImageUrl = await uploadImageToFirebase(
      resizedImageBlob,
      "cropped-images"
    );

    // Update the profile image on the page
    profileImg.src = newImageUrl;

    // Delete old image if it exists
    if (
      getSessionStore("oldImage") !==
      "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/user.jpg?alt=media&token=1a6064c6-da7e-419d-ad0f-4c2f16bc2df9"
    ) {
      console.log("deleting...", getSessionStore("oldImage"));
      await deleteOldImageFromFirebase(getSessionStore("oldImage"));
      console.log("deleted");
    }

    // Update Firestore user document with new image URL
    await setDoc(userDocRef, { profileImageUrl: newImageUrl }, { merge: true });

    // Update local and session storage
    setLocStore("profileImageURL", newImageUrl);
    setSessionStore("oldImage", newImageUrl);

    // Remove animation and show success message
    animationContainer.remove();
    topRightSwal("Photo updated successfully", "success", 6000);

    return newImageUrl;
  } catch (error) {
    console.error("Image upload error: ", error);
    topRightSwal(`Error: ${error.message}`, "error", 5000, "#000");
    document.querySelector(".circleInnerContent-container")?.remove();
  }
}

//* Handle firstName
function handlefirstName() {
  let firstName;
  if (getLocStore("firstName")) {
    firstName = getLocStore("firstName");
    $("#firstName").parent().addClass("focus");
    $("#firstName").val(firstName);
  }
  $("#firstName").on("keyup", () => {
    firstName = $("#firstName").val().value;
  });
  return firstName;
}

//* Handle lastName
function handleLastName() {
  let lastName;
  if (getLocStore("lastName")) {
    lastName = getLocStore("lastName");
    $("#lastName").parent().addClass("focus");
    $("#lastName").val(lastName);
  }
  $("#lastName").on("keyup", () => {
    lastName = $("#lastName").val().value;
  });
  return lastName;
}

//* Handle fullName
function handleFullName() {
  let firstName;
  let lastName;
  let fullName;
  if (getLocStore("firstName")) {
    firstName = getLocStore("firstName");
    console.log(firstName);
  }
  if (getLocStore("lastName")) {
    lastName = getLocStore("lastName");
    console.log(lastName);
  }
  $("#firstName").on("keyup", () => {
    firstName = $("#firstName").val().value;
    console.log("typing first name", firstName);
  });
  $("#lastName").on("keyup", () => {
    lastName = $("#lastName").val().value;
    console.log("typing last name: ", lastName);
  });
  fullName = firstName + " " + lastName;
  console.log("fullName = ", firstName + " " + lastName);
  return fullName;
}

//* calculate age
function calculateAge(birthDate) {
  let age;
  const today = new Date();
  age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

//* handle phoneNumber
function handlePhoneNumber() {
  let phoneNumber;
  if (getLocStore("phoneNumber") && getLocStore("phoneNumber") !== "null") {
    $("#phoneNumber").val(getLocStore("phoneNumber"));
    $("#phoneNumber").parent().addClass("focus");
    phoneNumber = getLocStore("phoneNumber");
  }
  $("#phoneNumber").on("keyup", () => {
    phoneNumber = $("#phoneNumber").val().value;
  });
  return phoneNumber;
}

// * handleBirthDate
function handleBirthDate() {
  //? handle birthdate
  let birthdate;
  let birthDateLocalStorage = getLocStore("birthDate");
  if (birthDateLocalStorage) {
    $("#birthDate").val(birthDateLocalStorage);
    birthdate = birthDateLocalStorage;
  }
  if ($("#birthDate").val().value != "") {
    const birthDateObj = new Date($("#birthDate").val().value);
    const age = calculateAge(birthDateObj);
    $("#age").val(age);
  }
  //? handle birthdate changes
  $("#birthDate").on("change", () => {
    const birthDateObj = new Date($("#birthDate").val().value);
    const age = calculateAge(birthDateObj);
    $("#age").val(age);
    birthdate = $("#birthDate").val().value;
  });
  // userData.birthDate = birthdate;
  return birthdate;
}

//* handle subscribe changes
function handleSubscribtion() {
  let subscribtionVal;
  let subscribtionBtn = document.querySelector("#subscribe");
  let subscribtionInLocalStorage = getLocStore("subscribeToNews");
  if (subscribtionInLocalStorage === "true") {
    subscribtionBtn.checked = true;
    subscribtionVal = true;
  } else {
    subscribtionBtn.checked = false;
    subscribtionVal = false;
  }
  $("#subscribe").on("change", function () {
    if (this.checked) {
      subscribtionVal = true;
    } else {
      subscribtionVal = false;
    }
  });
  return subscribtionVal;
}

// * handle gender function
function handleGender() {
  let genderValue;
  document.querySelectorAll('input[name="gender"]').forEach((ele) => {
    if (getLocStore("gender") === ele.value) {
      genderValue = getLocStore("gender");
      ele.checked = true;
    }
    ele.addEventListener("change", () => {
      genderValue = ele.value;
      ele.checked = true;
      setSessionStore("gender", genderValue);
    });
  });
  console.log("gender value:", genderValue);
  return genderValue;
}

$(".user__data__form").on("submit", (form) => {
  form.preventDefault();
  updateUserData(getLocStore("uid"));
});

// ? Edit and send data

// function updateUserData(uid) {
//   if (navigator.onLine) {
//     showLoadingAnimation();
//     if (getLocStore("profileImageUrl") !== profileImage.src) {
//       deleteOldImageFromFirebase(getSessionStore("oldImage"));
//     }
//     function checkGender() {
//       let value;
//       if (getSessionStore("gender")) {
//         setLocStore("gender", getSessionStore("gender"));
//         value = getSessionStore("gender");
//       } else {
//         setLocStore("gender", handleGender());
//         value = handleGender();
//       }
//       return value;
//     }
//     setLocStore("firstName", $("#firstName").val().value);
//     setLocStore("lastName", $("#lastName").val().value);
//     setLocStore("phoneNumber", $("#phoneNumber").val().value);
//     setLocStore("birthDate", $("#birthDate").val().value);

//     setLocStore("age", $("#age").val().value);
//     setLocStore(
//       "subscribeToNews",
//       document.querySelector('input[name="subscribe"]').checked ? true : false
//     );
//     setLocStore(
//       "displayName",
//       $("#firstName").val().value + " " + $("#lastName").val().value
//     );
//     if (
//       getLocStore("profileImageUrl") !== "null" ||
//       document.getElementById("profileImage").src !== "user.jpg"
//     ) {
//       console.log("setting local store: ");
//       setLocStore(
//         "profileImageUrl",
//         document.getElementById("profileImage").src
//       );
//     } else {
//       document.getElementById("profileImage").src !==
//         "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/user.jpg?alt=media&token=1a6064c6-da7e-419d-ad0f-4c2f16bc2df9";
//       setLocStore(
//         "profileImageUrl",
//         "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/user.jpg?alt=media&token=1a6064c6-da7e-419d-ad0f-4c2f16bc2df9"
//       );
//     }
//     document.querySelector(".name").textContent = getLocStore("displayName");
//     setSessionStore("oldImage", getLocStore("profileImageUrl"));
//     const userDocRef = doc(db, "users", uid);
//     let userData = {
//       firstName: handlefirstName() || "",
//       lastName: handleLastName() || "",
//       displayName: handleFullName() || "",
//       phoneNumber: handlePhoneNumber() || "",
//       age: $("#age").val().value || "",
//       birthDate: handleBirthDate() || "",
//       gender: checkGender() || "",
//       subscribeToNews: handleSubscribtion() || "",
//       orders: [
//         {
//           number: "#001",
//           uid: "653hhjb437673fd",
//           date: "18/9/2023",
//           name: "TV",
//           price: 1200,
//           quantity: 1,
//           address: "New damietta",
//           status: "compeleted",
//           img: "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/productsIMGS%2Fproduct8.avif?alt=media&token=c6cb3c2c-5783-4319-9051-3e7cbb450681",
//         },
//         {
//           number: "#002",
//           uid: "efwefewrf4457h465",
//           date: "18/7/2023",
//           name: "chair",
//           price: 350,
//           quantity: 1,
//           address: "New damietta",
//           status: "pending",
//           img: "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/productsIMGS%2Fproduct%204.avif?alt=media&token=c7d41c00-c8a1-4310-849b-a5e441b9a5e1",
//         },
//         {
//           number: "#003",
//           uid: "3982jhif38few",
//           date: "18/12/2023",
//           name: "watch",
//           price: 500,
//           quantity: 1,
//           address: "New damietta",
//           status: "cancelled",
//           img: "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/productsIMGS%2Fproduct6.webp?alt=media&token=003988cd-0547-41df-9843-eff423c2dd1a",
//         },
//       ],
//       profileImageUrl: handleProfileImage(),
//     };

//     return getDoc(userDocRef)
//       .then(() => {
//         console.log(userData);
//         return setDoc(
//           userDocRef,
//           {
//             firstName: userData.firstName,
//             lastName: userData.lastName,
//             displayName: userData.displayName,
//             phoneNumber: userData.phoneNumber,
//             birthDate: userData.birthDate,
//             age: userData.age,
//             gender: userData.gender,
//             orders: userData.orders,
//             subscribeToNews: document.querySelector('input[name="subscribe"]')
//               .checked,
//             profileImageUrl: userData.profileImageUrl,
//           },
//           { merge: true }
//         ).then(() => {
//           setTimeout(() => {
//             hideLoadingAnimation();
//           }, 300);
//           topRightSwal("saved successfully", "success", 3000);
//         });
//       })

//       .catch((error) => {
//         console.log("error: ", error);
//         topRightSwal(`error: ${error.message}`, "error", 5000, "#ff1f2f");
//       });
//   } else {
//     topRightSwal(
//       "You're offline, please check your internet connection",
//       "error",
//       3000,
//       "red"
//     );
//   }
// }
function updateUserData(uid) {
  if (!navigator.onLine) {
    return topRightSwal(
      "You're offline, please check your internet connection",
      "error",
      3000,
      "red"
    );
  } else {
    showLoadingAnimation();

    const checkGender = () => {
      const gender = getSessionStore("gender") || handleGender();
      setLocStore("gender", gender);
      return gender;
    };

    // Update local storage
    ["firstName", "lastName", "phoneNumber", "birthDate", "age"].forEach(
      (id) => {
        setLocStore(id, $(`#${id}`).val().value);
      }
    );

    setLocStore(
      "subscribeToNews",
      document.querySelector('input[name="subscribe"]').checked
    );
    setLocStore(
      "displayName",
      `${$("#firstName").val().value} ${$("#lastName").val().value}`
    );

    document.querySelector(".name").textContent = getLocStore("displayName");

    const userDocRef = doc(db, "users", uid);
    const userData = {
      firstName: handlefirstName(),
      lastName: handleLastName(),
      displayName: handleFullName(),
      phoneNumber: handlePhoneNumber(),
      age: $("#age").val().value,
      birthDate: handleBirthDate(),
      gender: checkGender(),
      subscribeToNews: document.querySelector('input[name="subscribe"]')
        .checked,
      orders: getSampleOrders(),
    };

    return getDoc(userDocRef)
      .then(() => setDoc(userDocRef, userData, { merge: true }))
      .then(() => {
        hideLoadingAnimation();
        topRightSwal("Saved successfully", "success", 3000);
      })
      .catch((error) => {
        topRightSwal(`Error: ${error.message}`, "error", 5000, "#ff1f2f");
      });
  }

  function getSampleOrders() {
    return [
      {
        number: "#001",
        uid: "653hhjb437673fd",
        date: "18/9/2023",
        name: "TV",
        price: 1200,
        quantity: 1,
        address: "New damietta",
        status: "completed",
        img: "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/productsIMGS%2Fproduct8.avif?alt=media&token=c6cb3c2c-5783-4319-9051-3e7cbb450681",
      },
      {
        number: "#002",
        uid: "efwefewrf4457h465",
        date: "18/7/2023",
        name: "Chair",
        price: 350,
        quantity: 1,
        address: "New damietta",
        status: "pending",
        img: "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/productsIMGS%2Fproduct%204.avif?alt=media&token=c7d41c00-c8a1-4310-849b-a5e441b9a5e1",
      },
      {
        number: "#003",
        uid: "3982jhif38few",
        date: "18/12/2023",
        name: "Watch",
        price: 500,
        quantity: 1,
        address: "New damietta",
        status: "cancelled",
        img: "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/productsIMGS%2Fproduct6.webp?alt=media&token=003988cd-0547-41df-9843-eff423c2dd1a",
      },
    ];
  }
}
