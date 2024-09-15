console.log("js");
addActiveElement("wishList");
let wishlistArray = [
  {
    wishlistNumber: 0,
    name: "TV",
    price: 970,
    oldPrice: 1050,
    category: "electronics",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/productsIMGS%2Fproduct8.webp?alt=media&token=0e8557fd-b06e-4e9b-9831-4d9620575c96",
    rating: 4,
  },
  {
    wishlistNumber: 1,
    name: "Iphone 13 pro max",
    price: 750,
    oldPrice: 900,
    category: "smart phones",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/productsIMGS%2Fproduct1.webp?alt=media&token=5a6e46b6-1a55-4a2d-b7e7-80699f2050db",
    rating: 4.5,
  },
  {
    wishlistNumber: 2,
    name: "Ball",
    price: 20,
    oldPrice: "",
    category: "sports",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/productsIMGS%2Fproduct5.webp?alt=media&token=01468ff2-19bb-462d-abe2-d0eeeee19db0",
    rating: 3,
  },
  {
    wishlistNumber: 3,
    name: "Macbook air M2 chip 16gb ram m.2 512gb",
    price: 1500,
    oldPrice: 1650,
    category: "Laptop",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/productsIMGS%2Fproduct2.webp?alt=media&token=fcc63603-512a-413e-ab0d-f67e42f2707c",
    rating: 5,
  },
  {
    wishlistNumber: 4,
    name: "Canon camera",
    price: 2000,
    oldPrice: 2500,
    category: "Camera",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/mz-e-commerce-e3969.appspot.com/o/productsIMGS%2Fproduct3.webp?alt=media&token=04ce10c5-b94e-49ed-b9a4-77ca6e7e2919",
    rating: 4,
  },
];
setLocStore("wishlist", JSON.stringify(wishlistArray));

function renderWishlist() {
  const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (!wishlistData || wishlistData.length === 0) {
    const wishlistContainer = document.querySelector(".cards__container");
    wishlistContainer.innerHTML = "";
    let content = `<span style="font-size: 30px;font-weight: 600; color: var(--Primary-color);">Wishlist is empty go and add items by pressing on   <i class="fa-solid fa-bookmark"></i></span>`;
    const sanitizedContent = DOMPurify.sanitize(content);
    wishlistContainer.innerHTML += sanitizedContent;
  } else {
    console.log("rendering...");
    const wishlistContainer = document.querySelector(".cards__container");
    wishlistContainer.innerHTML = "";
    wishlistData.forEach((item) => {
      let content = `
      <div class="card__container rad20 p10 flex__column flex-start">
        <div class="product__img__container">
          <img src="${item.imageURL}" alt="${
        item.name
      }" class="product__img h100 w100" />
        </div>
        <div class="product__info__container flex__column g10 w100 space-around">
          <div class="product__category__container w100 flex__row flex-start space-between">
            <span class="product__category flex-start">${item.category}</span>
            <span class="fav__icon" data-index="${
              item.wishlistNumber
            }"><i class="fa-solid fa-bookmark"></i></span>
          </div>
          <div class="product__name__container flex__row g10 w100 flex-start">
            <span class="product__name">${item.name}</span>
          </div>
          <div class="price__favourite__container w100">
            <span class="price__container flex__row g10 flex-start w100">
              <span class="original__price">$${item.price}</span>
              <span class="old__price">${item.oldPrice}${
        item.oldPrice != "" ? "$" : ""
      }</span>
            </span>
          </div>
          <div class="stars__container w100 g10 flex__row">
            <span class="stars flex__row g5">
             ${renderStars(item.rating)}
            </span>
            <span class="stars__rate">${item.rating}</span>
          </div>
        </div>
        <div class="add__to__cart__container m15 w90">
          <button class="btn add__to__cart__btn w100">
            <i class="bx bx-cart-add"></i>
            <span class="btn__add__cart__text">Add to cart</span>
          </button>
        </div>
      </div>
    `;
      const sanitizedContent = DOMPurify.sanitize(content);
      wishlistContainer.innerHTML += sanitizedContent;
      console.log("rendered");
    });
    removeElementFromWishlist();
  }
}
renderWishlist();

function renderStars(rating) {
  let starsHTML = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5;
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fa-solid fa-star"></i>';
  }
  if (hasHalfStar) {
    starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  const remainingStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < remainingStars; i++) {
    starsHTML += '<i class="fa-regular fa-star"></i>';
  }
  return starsHTML;
}
// $(".fav__icon").on("click", () => {
//   confirmPopupDialog(
//     "Remove product from wishlist",
//     `Are you sure you want to remove ${
//       JSON.parse(getLocStore("wishlist"))[
//         document
//           .querySelectorAll(".fav__icon")
//           .forEach((item) => item.getAttribute("data-index"))
//       ].name
//     } from the wishlist? `,
//     "info"
//   );
// });

// document.querySelectorAll(".fav__icon").forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     console.log(e);
//     let index = btn.getAttribute("data-index");
//     console.log(JSON.stringify(getLocStore("wishlist")));
//   });
// });

function removeElementFromWishlist() {
  document.querySelectorAll(".fav__icon").forEach((btn) => {
    btn.addEventListener("click", () => {
      let index = btn.getAttribute("data-index");
      let wishlist = JSON.parse(getLocStore("wishlist"));
      let item = wishlist.find((item) => item.wishlistNumber == index);
      confirmPopupDialog(
        "Remove from wishlist",
        `Are you sure you want to remove ${item.name} from wishlist? `,
        "info",
        "#e63946",
        "#ff8c00",
        "Remove",
        "Cancel"
      ).then((res) => {
        if (res.isConfirmed) {
          wishlist = wishlist.filter((item) => item.wishlistNumber != index);
          wishlist.forEach((item, i) => {
            item.wishlistNumber = i;
          });
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          renderWishlist();
        }
      });
    });
  });
}
