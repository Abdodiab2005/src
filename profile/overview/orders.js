import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPIRDvG_iI4b5KBM9zDUWhw9fPogLdHa8",
  authDomain: "mz-e-commerce-e3969.firebaseapp.com",
  projectId: "mz-e-commerce-e3969",
  storageBucket: "mz-e-commerce-e3969.appspot.com",
  messagingSenderId: "417338132297",
  appId: "1:417338132297:web:07778c4d2d5b3946fc3c98",
};

// overview.js
export default function initOverview() {
  const ordersHTML = `<div id="cropModal" class="cropModal" style="display: none"></div>
        <section id="Orders" class="nav__data flex__column flex-start">
            <h2 class="section__title">
              <i class="fa-solid fa-cart-shopping"></i> Orders
            </h2>
            <div class="order__card__container flex__column flex-start"></div>
          </section>`;
  const purifiedMain = DOMPurify.sanitize(ordersHTML);
  const mainElement = document.querySelector("main");
  mainElement.innerHTML = purifiedMain;

  // Fetch orders data after setting up DOM
  fetchOrdersData();

  // Event delegation for dynamically added content
  document.body.addEventListener("click", handleBodyClick);

  // Initialize button event for overview
  const overviewButton = document.getElementById("overviewButton");
  if (overviewButton) {
    overviewButton.addEventListener("click", handleOverviewClick);
  }
}

// Handle clicks on the body
function handleBodyClick(event) {
  if (event.target.classList.contains("order__action__btn")) {
    showPopup(event.target.closest(".order__card"));
  }
  popupsBtns();
}

// Cleanup function to remove event listeners and other resources
export function cleanupOverview() {
  document.body.removeEventListener("click", handleBodyClick);

  const overviewButton = document.getElementById("overviewButton");
  if (overviewButton) {
    overviewButton.removeEventListener("click", handleOverviewClick);
  }

  // More cleanup tasks can be added here if necessary
}

function handleOverviewClick() {
  // Handle click events for the overview button
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function fetchOrdersData() {
  const colRef = collection(db, "users");
  getDocs(colRef).then((snapshot) => {
    snapshot.forEach((docc) => {
      if (localStorage.getItem("uid") === docc.id) {
        const container = document.querySelector(".order__card__container");
        let content = "";
        const orders = docc.get("orders");
        for (let i = 0; i < orders.length; i++) {
          // Sanitize data to prevent XSS
          const sanitizedOrderNumber = DOMPurify.sanitize(orders[i].number);
          const sanitizedOrderDate = DOMPurify.sanitize(orders[i].date);
          const sanitizedOrderUid = DOMPurify.sanitize(orders[i].uid);
          const sanitizedOrderName = DOMPurify.sanitize(orders[i].name);
          const sanitizedOrderQuantity = DOMPurify.sanitize(orders[i].quantity);
          const sanitizedOrderPrice = DOMPurify.sanitize(orders[i].price);
          const sanitizedOrderAddress = DOMPurify.sanitize(orders[i].address);
          const sanitizedOrderStatus = DOMPurify.sanitize(orders[i].status);
          const sanitizedOrderImg = DOMPurify.sanitize(orders[i].img);

          content += `
              <div class="order__card grid"
              data-ordername = "${sanitizedOrderName}"
              data-ordernumber = "${sanitizedOrderNumber}"
              data-orderdate = "${sanitizedOrderDate}"
              data-orderuid = "${sanitizedOrderUid}"
              data-orderquantity = "${sanitizedOrderQuantity}"
              data-orderprice = "${sanitizedOrderPrice}"
              data-orderaddress = "${sanitizedOrderAddress}"
              data-orderstatus = "${sanitizedOrderStatus}"
              data-orderimg = "${sanitizedOrderImg}"
              >
                <div class="order__card__img__container flex__row center">
                  <img
                    src="${sanitizedOrderImg}"
                    alt="order image"
                    class="popup__order__img"
                    loading="lazy"
                    width="100%"
                    height="auto" />
                </div>
                <div class="order__data__container flex__column">
                  <div class="order__number">
                    <span class="order__detail__title">Order number: </span>
                    <span class="order__detail__text">${sanitizedOrderNumber}</span>
                  </div>
                  <div class="order__date">
                    <span class="order__detail__text">${sanitizedOrderDate}</span>
                  </div>
                  <div class="order__uid">
                    <span class="order__detail__title">Order code: </span>
                    <span class="order__detail__text">${sanitizedOrderUid}</span>
                  </div>
                  <div class="order__product__title">
                    <span class="order__detail__title">Product name: </span>
                    <span class="order__detail__text">${sanitizedOrderName}</span>
                  </div>
                  <div class="order__product__quantity">
                    <span class="order__detail__title">Quantity: </span>
                    <span class="order__detail__text">${sanitizedOrderQuantity}</span>
                  </div>
                  <div class="order__price">
                    <span class="order__detail__text">${sanitizedOrderPrice}$</span>
                  </div>
                  <div class="order__delivery__address">
                    <span class="order__detail__title">Address: </span>
                    <span class="order__detail__text">${sanitizedOrderAddress}</span>
                  </div>
                  <div class="order__review">
                    <span class="order__detail__title">Add your review: </span>
                    <i class="fa-regular fa-star review__icon"></i>
                    <i class="fa-regular fa-star review__icon"></i>
                    <i class="fa-regular fa-star review__icon"></i>
                    <i class="fa-regular fa-star review__icon"></i>
                    <i class="fa-regular fa-star review__icon"></i>
                  </div>
                  <div class="order__state completed__state" style="color: ${
                    sanitizedOrderStatus === "completed"
                      ? "green"
                      : sanitizedOrderStatus === "pending"
                      ? "#12b3f3"
                      : sanitizedOrderStatus === "canceled"
                      ? "red"
                      : ""
                  };">
                    <i class="fa-solid fa-circle" style="color: ${
                      sanitizedOrderStatus === "completed"
                        ? "green"
                        : sanitizedOrderStatus === "pending"
                        ? "#12b3f3"
                        : sanitizedOrderStatus === "canceled"
                        ? "red"
                        : ""
                    };"></i> ${sanitizedOrderStatus}
                  </div>
                  <div class="order__action__button__container">
                    <button class="order__action__btn btn" id="orderActionBtn">
                      ${
                        sanitizedOrderStatus === "completed"
                          ? "Reorder"
                          : sanitizedOrderStatus === "pending"
                          ? "Cancel"
                          : sanitizedOrderStatus === "canceled"
                          ? "Details"
                          : ""
                      }
                    </button>
                  </div>
                </div>
              </div>`;
        }
        container.innerHTML += content;
      }
    });
  });
}

function closePreviousPopup() {
  document.querySelector(".popup__order__details ").classList.add("active");
  document.querySelector(".timeline").classList.add("active");
  document
    .querySelector(".cancel__order__container")
    .classList.remove("active");
  document.querySelector(".buy__again__container").classList.remove("active");
  document.querySelector(".review__container").classList.remove("active");
}

function popupsBtns() {
  document.getElementById("writeReviewBtn")?.addEventListener("click", () => {
    closePreviousPopup();
    document.querySelector(".review__container").classList.add("active");
  });

  document.getElementById("reBuyBtn")?.addEventListener("click", () => {
    closePreviousPopup();
    document.querySelector(".buy__again__container").classList.add("active");
  });

  document.getElementById("canelOrderBtn")?.addEventListener("click", () => {
    closePreviousPopup();
    document.querySelector(".cancel__order__container").classList.add("active");
  });

  document.querySelectorAll(".fa-xmark").forEach((closeIcon) => {
    closeIcon.addEventListener("click", () => {
      document
        .querySelector(".popup__order__details")
        .classList.remove("active");
      document.querySelector(".timeline").classList.remove("active");
      document
        .querySelector(".buy__again__container")
        .classList.remove("active");
      document.querySelector(".review__container").classList.remove("active");
      document
        .querySelector(".cancel__order__container")
        .classList.remove("active");
    });
  });
}

function showPopup(element) {
  const name = element.dataset.ordername;
  const number = element.dataset.ordernumber;
  const date = element.dataset.orderdate;
  const quantity = element.dataset.orderquantity;
  const uid = element.dataset.orderuid;
  const price = element.dataset.orderprice;
  const address = element.dataset.orderaddress;
  const status = element.dataset.orderstatus;
  const img = element.dataset.orderimg;

  document.querySelector(".popup__order__image img").src = img;
  document.querySelector(".popup__order__image img").width = "100%";
  document.querySelector(".popup__order__image img").height = "auto";
  document.querySelector(".popup__order__image img").loading = "lazy";
  document.querySelector(
    ".popup__order__details__header .product__name"
  ).textContent = name;
  document.querySelector(
    ".popup__order__details__header .order__id"
  ).textContent = `Order id: ${uid}`;
  document.querySelector(
    ".popup__order__details__header .order__Price"
  ).textContent = price;
  document.querySelector(
    ".popup__order__details__header .order__address"
  ).textContent = address;

  document.querySelector(".popup__content__container").classList.add("active");
}

function closePopup() {
  document
    .querySelector(".popup__content__container")
    .classList.remove("active");
}
