import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";
addActiveElement("addresses");
const firebaseConfig = {
  apiKey: "AIzaSyAPIRDvG_iI4b5KBM9zDUWhw9fPogLdHa8",
  authDomain: "mz-e-commerce-e3969.firebaseapp.com",
  projectId: "mz-e-commerce-e3969",
  storageBucket: "mz-e-commerce-e3969.appspot.com",
  messagingSenderId: "417338132297",
  appId: "1:417338132297:web:07778c4d2d5b3946fc3c98",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const uid = localStorage.getItem("uid");

function showAddressPopup(obj) {
  $(".add__new__address__popup ").removeClass("hidden");
  $("body").addClass("address__popup__active");
  if (obj) {
    $("#addNewAddressName").val(obj.name || "");
    $("#addNewAddressStreet").val(obj.street || "");
    $("#AddNewAddressCity").val(obj.city || "");
    $("#addNewAddressPhoneNumber").val(obj.phoneNumber || "");
    $("#addNewAddressZIPcode").val(obj.zipCode || "");
  }
}

function closePopup() {
  $(".add__new__address__popup ").addClass("hidden");
  $("body").removeClass("address__popup__active");
  document.querySelector(".popup__inputs__container").reset();
  document
    .querySelector(".popup__inputs__container")
    .addEventListener("reset", function (event) {
      event.preventDefault();
    });
}
let emptyObj = {
  name: "",
  street: "",
  phoneNumber: "",
  zipCode: "",
};
let cancelBtns = [$("#cancelAddNewAddressBtn"), $(".close-icon")];
function validateOnCancel(obj) {
  cancelBtns.forEach((btn) => {
    btn.off("click");
    function handleCancelClick() {
      if (
        $("#addNewAddressName").val().value != obj.name ||
        $("#addNewAddressStreet").val().value != obj.street ||
        $("#addNewAddressPhoneNumber").val().value != obj.phoneNumber ||
        $("#addNewAddressZIPcode").val().value != obj.zipCode
      ) {
        confirmPopupDialog(
          "Are you sure you want to cancel?",
          "All changes will be ignored!",
          "info",
          "#e63946",
          "#ff8c00",
          "yes",
          "cancel"
        ).then((res) => {
          if (res.isConfirmed) {
            closePopup();
          }
        });
      } else {
        closePopup();
      }
    }
    btn.on("click", handleCancelClick);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAddresses();
});
async function fetchAddresses() {
  if (!uid) {
    topRightSwal(
      `Failed to get the user information, please resign in or contact support`,
      "error"
    );
    return;
  }
  showLoadingAnimation();
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const addresses = userDocSnap.data().addresses || [];
      setLocStore("addresses", JSON.stringify(addresses));
      displayAddresses(addresses);
    }
  } catch (error) {
    topRightSwal(`Error: ${error}`), "error";
  } finally {
    hideLoadingAnimation();
  }
}
function displayAddresses(addresses) {
  const addressContainer = document.getElementById("sectionDataContainer");
  addressContainer.innerHTML = "";
  const sanitizedHTML2 = DOMPurify.sanitize(
    `<h2 class="no-data-found">No addresses found</h2>`
  );
  if (addresses.length == 0) {
    addressContainer.innerHTML = sanitizedHTML2;
    document.querySelector(".addresses__number").textContent = `0 / 5`;
  }
  addresses.forEach((address, index) => {
    const sanitizedHTML = DOMPurify.sanitize(`
        <div class="address__card flex__column flex-start w100 p15 g10 rad10">
            <div class="address__card__header flex__row flex-end w100">
              <div
                class="address__card__header__container flex__row w100 center g25">
                <span class="flex__row w100 p10 flex-start">
                  <span class="address__property__data" id="addressName">
                    <b>${address.name}</b>
                  </span>
                </span>
                <span class="addresses__header__btns__container flex__row g15">
                  <button type="button" class="btn edit__btn"
                  data-index = "${index}" >
                    <i class="fa-solid fa-pen" ></i> Edit
                  </button>
                  <span
                    class="default__address__btn__container flex__row center g10">
                    Default
                    <span class="switch ${
                      address.default ? "checked" : ""
                    }" data-index="${index}"
                    data-index="${index}" 
                    data-isDefault="${address.default ? true : false}">
                      <span class="slider"></span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
            <div
              class="address__card__body__container flex__column flex-start w100 g10">
              <span class="address__propert__text">
                <span class="address__property__name">Street:</span>
                <span class="address__property__data" id="addressStreet">
                  ${address.street}
                </span>
              </span>
              <span class="address__propert__text">
                <span class="address__property__name">City:</span>
                <span class="address__property__data" id="addressCity">
                  ${address.city}
                </span>
              </span>
              <span class="address__propert__text">
                <span class="address__property__name">phone number:</span>
                <span class="address__property__data" id="addressPhoneNumber">
                  ${address.phoneNumber}
                </span>
              </span>
              <span class="address__propert__text">
                <span class="address__property__name">ZIP code:</span>
                <span class="address__property__data" id="addressZIPCode">
                  ${address.zipCode}
                </span>
              </span>
            </div>
            <div class="address__card__footer w100 flex__row flex-end">
              <button
                type="button"
                class="btn address__remove__btn"
                id="addressRemoveBtn"
                data-index = "${index}"
                >
                <i class="fa-solid fa-xmark"></i> Remove
              </button>
            </div>
          </div>`);

    document.querySelector(
      ".addresses__number"
    ).textContent = `${addresses.length} / 5`;
    if (document.querySelector(".no-data-found")) {
      document.querySelector(".no-data-found").remove();
    }
    addressContainer.innerHTML += sanitizedHTML;

    addressContainer.querySelectorAll(".edit__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        editAddress(btn.getAttribute("data-index"));
      });
    });

    addressContainer
      .querySelectorAll(".address__remove__btn")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          deleteAddress(btn.getAttribute("data-index"));
        });
      });
  });

  handleDefaultAddress();
}
function generateAddressID() {
  const generateRandomWord = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let word = "";
    for (let i = 0; i < 5; i++) {
      word += chars[Math.floor(Math.random() * chars.length)];
    }
    return word;
  };
  const words = new Set();
  while (words.size < 5) {
    words.add(generateRandomWord());
  }
  return Array.from(words).join("-");
}
async function saveNewAddresses() {
  $(".edit__popup__btn").addClass("hidden");
  if (document.querySelector(".add__btn").classList.contains("hidden")) {
    $(".add__btn").removeClass("hidden");
  }
  if (!uid) {
    topRightSwal(
      `Failed to get the user information, please resign in or contact support`,
      "error"
    );
    return;
  }
  loadingSwal("Adding new address...");
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    const addresses = userDocSnap.data().addresses || [];
    let isDefault;
    if (addresses.length < 1) {
      isDefault = true;
    } else {
      isDefault = false;
    }
    const newAddress = {
      id: generateAddressID(),
      name: $("#addNewAddressName").val().value,
      street: $("#addNewAddressStreet").val().value,
      city: $("#AddNewAddressCity").val().value,
      phoneNumber: $("#addNewAddressPhoneNumber").val().value,
      zipCode: $("#addNewAddressZIPcode").val().value,
      default: isDefault,
    };

    if (addresses.length >= 5) {
      topRightSwal("Only 5 addresses are allowed", "error", 5000);
      return;
    }

    addresses.push(newAddress);
    await updateDoc(userDocRef, { addresses });
    setLocStore("addresses", JSON.stringify(addresses));
    displayAddresses(JSON.parse(getLocStore("addresses")));
    topRightSwal("Address Saved successfully");
    closePopup();
  } catch (error) {
    console.error(error);
    topRightSwal(`Error while saving address: ${error}`, "error");
  }
}
$("#addNewAddress").on("click", async () => {
  if (!uid) {
    topRightSwal(
      `Failed to get the user information, please resign in or contact support`,
      "error"
    );

    return;
  }

  console.log("clicked");
  const form = document.querySelector(".popup__inputs__container");
  form.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      console.log(event);
      event.preventDefault();
      validateInputs().then(async (res) => {
        if (res) {
          await saveNewAddresses();
        }
      });
    }
  });
  const addresses = JSON.parse(getLocStore("addresses"));
  if (addresses.length == 5) {
    topRightSwal(`5 addresses only are available`, "error");
  } else {
    document.querySelector(".popup__inputs__container").reset();
    $("#editCurrentAddressBtn").addClass("hidden");
    $("#addNewAddressBtnPopup").removeClass("hidden");
    showAddressPopup(emptyObj);
    validateOnCancel(emptyObj);
    $("#addNewAddressBtnPopup").on("click", async () => {
      validateInputs().then(async (res) => {
        if (res) {
          await saveNewAddresses();
        }
      });
    });
  }
});
async function editAddress(index) {
  if (!uid) {
    topRightSwal(
      `Failed to get the user information, please resign in or contact support`,
      "error"
    );
    return;
  }
  $(".add__btn").addClass("hidden");
  if (
    document.querySelector(".edit__popup__btn").classList.contains("hidden")
  ) {
    $(".edit__popup__btn").removeClass("hidden");
  }

  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    const addresses = userDocSnap.data().addresses;
    const addressToEdit = addresses[index];

    let isDefault;
    if (addressToEdit.default) {
      isDefault = true;
    } else {
      isDefault = false;
    }

    validateOnCancel(addressToEdit);
    showAddressPopup(addressToEdit);
    stopLoadingSwal();

    const form = document.querySelector(".popup__inputs__container");
    form.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        validateInputs().then(async (res) => {
          if (res) {
            submitEdits();
          }
        });
      }
    });
    $(".edit__popup__btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        submitEdits();
      });
    });
    function submitEdits() {
      validateInputs().then(async (res) => {
        if (res) {
          loadingSwal("Saving...");
          addresses[index] = {
            name: $("#addNewAddressName").val().value || "",
            street: $("#addNewAddressStreet").val().value || "",
            city: $("#AddNewAddressCity").val().value || "",
            phoneNumber: $("#addNewAddressPhoneNumber").val().value || "",
            zipCode: $("#addNewAddressZIPcode").val().value || "",
            default: isDefault,
          };
          await updateDoc(userDocRef, { addresses });
          setLocStore("addresses", JSON.stringify(addresses));
          displayAddresses(JSON.parse(getLocStore("addresses")));

          closePopup();
          updateSwal("Data saved successfully", "success");
        }
      });
    }
  } catch (error) {
    topRightSwal(`Error editing address: ${error}`, "error");
  }
}

async function deleteAddress(index) {
  if (!uid) {
    topRightSwal(
      `Failed to get the user information, please resign in or contact support`,
      "error"
    );
    return;
  }

  confirmPopupDialog(
    "Are you sure?",
    "your address will be deleted",
    "info",
    "red",
    "#ff8c00",
    "Delete",
    "Cancel"
  ).then(async (result) => {
    if (result.isConfirmed) {
      index = parseInt(index, 10);
      loadingSwal("Deleting address...");
      try {
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);
        const addresses = userDocSnap.data().addresses;

        if (addresses[index].default === true) {
          reHandleDefaultAddress();
        }
        addresses.splice(index, 1);

        await updateDoc(userDocRef, { addresses });
        setLocStore("addresses", JSON.stringify(addresses));
        displayAddresses(JSON.parse(getLocStore("addresses")));
        topRightSwal("Address deleted successfully");
      } catch (error) {
        console.error(error);
        topRightSwal(`Error while deleting the address: ${error}`, "error");
      }
    }
  });
}

function handleDefaultAddress() {
  const switchButton = document.querySelectorAll(".switch");
  switchButton.forEach((btn) => {
    btn.addEventListener("click", function () {
      switchButton.forEach((btn) => {
        btn.classList.remove("checked");
      });
      btn.classList.add("checked");
      markAsDefault(btn.getAttribute("data-index"));
      btn.setAttribute("data-isDefault", "true");
    });
  });
}

async function markAsDefault(index) {
  if (!uid) {
    topRightSwal(
      `Failed to get the user information, please resign in or contact support`,
      "error"
    );
    return;
  }

  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    const addresses = userDocSnap.data().addresses;
    addresses.forEach((address) => (address.default = false));
    addresses[index].default = true;
    updateSwal("Default address saved successfully", "success");
    await updateDoc(userDocRef, { addresses });
    setLocStore("addresses", JSON.stringify(addresses));
    // console.log(JSON.parse(getLocStore("addresses")[0].default));
    displayAddresses(JSON.parse(getLocStore("addresses")));
  } catch (error) {
    console.error(error);
    topRightSwal(`Failed to set this address to default: ${error}`, "error");
  }
}
async function reHandleDefaultAddress() {
  if (!uid) {
    topRightSwal(
      `Failed to get the user information, please resign in or contact support`,
      "error"
    );
    return;
  }
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);
  const addresses = userDocSnap.data().addresses;

  $(".switch").forEach(async (switcher) => {
    if (switcher.getAttribute("data-index") == "0") {
      switcher.classList.add("checked");
      addresses.forEach((address) => (address.default = false));
      addresses[0].default = true;
      await updateDoc(userDocRef, { addresses });
      setLocStore("addresses", JSON.stringify(addresses));
      console.log(JSON.parse(getLocStore("addresses")));
      displayAddresses(addresses);
    }
  });
}
async function validateInputs() {
  if ($("#addNewAddressName").val().length == "0") {
    topRightSwal("Name can't be more empty", "error");
    return false;
  } else if ($("#addNewAddressStreet").val().length == 0) {
    topRightSwal("Street can't be more empty", "error");
    return false;
  } else if ($("#addNewAddressPhoneNumber").val().length == 0) {
    topRightSwal("Phone number can't be more empty", "error");
    return false;
  } else if ($("#addNewAddressZIPcode").val().length == 0) {
    topRightSwal("ZIP code can't be more empty", "error");
    return false;
  } else if ($("#addNewAddressName").val().length < 4) {
    topRightSwal("Name can't be less than 4 characters", "error");
    return false;
  } else if ($("#addNewAddressStreet").val().length < 7) {
    topRightSwal("Street address is too short", "error");
    return false;
  } else if ($("#addNewAddressZIPcode").val().length < 3) {
    topRightSwal("Please enter a valid zip code", "error");
    return false;
  } else {
    return true;
  }
}
