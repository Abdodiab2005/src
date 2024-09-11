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
document.addEventListener("DOMContentLoaded", () => {
  addActiveElement("Orders");
  autoRefreshOrders(getLocStore("uid"));
  document.querySelectorAll(".order__action__btn").forEach((ele) => {
    ele.addEventListener("click", () => {
      showPopup(ele.parentElement.parentElement.parentElement);
    });
  });
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function shouldRefreshOrders(hours) {
  const lastUpdate = localStorage.getItem("lastUpdate");
  if (!lastUpdate) return true;

  const currentTime = Date.now();
  const hoursPassed = (currentTime - lastUpdate) / (1000 * 60 * 60);
  return hoursPassed >= hours;
}

async function autoRefreshOrders() {
  if (shouldRefreshOrders(6)) {
    await fetchOrdersData();
  } else {
    fetchFromLocalStorage(getOrdersFromLocalStorage());
  }
}

function getOrdersFromLocalStorage() {
  const orders = localStorage.getItem("orders");
  return orders ? JSON.parse(orders) : [];
}

function fetchFromLocalStorage(orders) {
  const container = document.querySelector(".order__card__container");
  let content = "";
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
                    <button class="order__action__btn btn" id="${sanitizedOrderNumber}">
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

async function fetchOrdersData() {
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
                    <button class="order__action__btn btn" id="${sanitizedOrderNumber}">
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
        setLocStore("orders", JSON.stringify(docc.get("orders")));
        setLocStore("lastUpdate", Date.now());
      }
    });
  });
}

function closePreviousPopup() {
  $(".popup__order__details ").addClass("active");
  $(".timeline").addClass("active");
  $(".cancel__order__container").removeClass("active");
  $(".buy__again__container").removeClass("active");
  $(".review__container").removeClass("active");
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
  $(".popup__order__image img").addClass("imgPopupContainer");
  document.querySelector(".popup__order__image img").loading = "lazy";
  $(".popup__order__details__header .product__name").text(name);
  $(".popup__order__details__header .order__id").text(`Order id: ${uid}`);
  $(".popup__order__details__header .order__Price").text(price);
  $(".popup__order__details__header .order__address").text(address);

  $(".popup__container").addClass("active");
  $(".popup").addClass("active");
  $(".closeBtn").on("click", closePopup);

  $("#writeReviewBtn").on("click", () => {
    closePreviousPopup();
    $(".review__container").addClass("active");
  });

  $("#reBuyBtn").on("click", () => {
    closePreviousPopup();
    $(".buy__again__container").addClass("active");
  });

  $("#canelOrderBtn").on("click", () => {
    closePreviousPopup();
    $(".cancel__order__container").addClass("active");
  });

  $(".fa-xmark").on("click", () => {
    $(".popup__order__details").removeClass("active");
    $(".timeline").removeClass("active");
    $(".buy__again__container").removeClass("active");
    $(".review__container").removeClass("active");
    $(".cancel__order__container").removeClass("active");
  });
}

function closePopup() {
  $(".popup").removeClass("active");
  $(".popup__container").removeClass("active");
}
