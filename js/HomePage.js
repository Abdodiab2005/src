import "../styles/framework.css";
import "../styles/homePage.css";
import slide from "./media/slider1.jpg";
import slide2 from "./media/slider2.png";
import slide3 from "./media/slider4.png";

import { useEffect } from "react";

import Swiper from "swiper";
import "swiper/css";
export default function HomePage() {
  useEffect(() => {
    // Initialize Swiper when the component mounts
    new Swiper(".swiper", {
      speed: 400,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 3000,
      },
    });

    // Set lazy loading on images
    const imgs = document.querySelectorAll("img");
    imgs.forEach((img) => {
      img.setAttribute("loading", "lazy");
    });
  });

  return (
    <>
      <section className='main section flex__column'>
        {/* <!-- Slider main container --> */}
        <div className='swiper'>
          {/* <!-- Additional required wrapper --> */}
          <div className='swiper-wrapper'>
            {/* <!-- Slides --> */}
            <div className='swiper-slide'>
              <img src={slide} alt='img__slider' className='img__slider' />
            </div>
            <div className='swiper-slide'>
              <img src={slide2} alt='img__slider' className='img__slider' />
            </div>
            <div className='swiper-slide'>
              <img src={slide3} alt='img__slider' className='img__slider' />
            </div>
          </div>
          {/* <!-- If we need pagination --> */}
          <div className={"swiper-pagination"}></div>

          {/* <!-- If we need navigation buttons --> */}
          <div className={"swiper-button-prev"}></div>
          <div className={"swiper-button-next"}></div>

          {/* <!-- If we need scrollbar --> */}
          {/* <!-- <div className="swiper-scrollbar"></div> --> */}
        </div>

        <div className='categories flex__column flex-start'>
          <div className='section__title__container'>
            <h2 className='section__title'>Choice Category</h2>
          </div>
          <div className='categories__container grid'>
            <div className='category flex__column'>
              <div className='icon__container'>
                <i className='fa-solid fa-shirt category__icon'></i>
              </div>
              <span className='text__container'>
                <span className='category__text'> clothes </span>
              </span>
            </div>
            <div className='Computer__clothes category flex__column'>
              <div className='icon__container'>
                <i className='fa-solid fa-tv category__icon'></i>
              </div>
              <span className='text__container'>
                <span className='category__text'> Computer </span>
              </span>
            </div>
            <div className='category flex__column'>
              <div className='icon__container'>
                <i className='fa-solid fa-gamepad category__icon'></i>
              </div>
              <span className='text__container'>
                <span className='category__text'> Gaming </span>
              </span>
            </div>
            <div className='category flex__column'>
              <div className='icon__container'>
                <i className='fa-solid fa-headphones category__icon'></i>
              </div>
              <span className='text__container'>
                <span className='category__text'> Headphones </span>
              </span>
            </div>
            <div className='category flex__column'>
              <div className='icon__container'>
                <i className='fa-solid fa-basketball category__icon'></i>
              </div>
              <span className='text__container'>
                <span className='category__text'> Football </span>
              </span>
            </div>
            <div className='category flex__column'>
              <div className='icon__container'>
                <i className='bx bxs-watch category__icon'></i>
              </div>
              <span className='text__container'>
                <span className='category__text'> Watches </span>
              </span>
            </div>
            <div className='category flex__column'>
              <div className='icon__container'>
                <i className='fa-solid fa-mobile-button category__icon'></i>
              </div>
              <span className='text__container'>
                <span className='category__text'> Phones </span>
              </span>
            </div>
            <div className='category flex__column'>
              <div className='icon__container'>
                <i className='fa-solid fa-couch category__icon'></i>
              </div>
              <span className='text__container'>
                <span className='category__text'> Furniture </span>
              </span>
            </div>
            <div className='category flex__column'>
              <div className='icon__container'>
                <i className='fa-solid fa-camera category__icon'></i>
              </div>
              <span className='text__container'>
                <span className='category__text'> Camera </span>
              </span>
            </div>
            <div className='category flex__column'>
              <div className='icon__container'>
                <i className='fa-solid fa-person-biking category__icon'></i>
              </div>
              <span className='text__container'>
                <span className='category__text'> bike </span>
              </span>
            </div>
            <div className='category flex__column'>
              <div className='icon__container'>
                <i className='fa-solid fa-lightbulb category__icon'></i>
              </div>
              <span className='text__container'>
                <span className='category__text'> Electrics </span>
              </span>
            </div>
            <div className='category flex__column'>
              <div className='icon__container'>
                <i className='bx bx-grid-small category__icon'></i>
              </div>
              <span className='text__container'>
                <span className='category__text'> View All </span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className='section latest__products flex__column start'>
        <div className='section__title__container'>
          <h2 className='section__title'>Latest Products</h2>
        </div>
        <div className='latest__products__container flex__row space-between flex-start'>
          <div className='product__container flex__column flex-start'>
            <div className='product__img__container'>
              <img
                src='./media/product1.png'
                alt='chair'
                className='product__img'
              />
            </div>
            <div className='product__info__container'>
              <div className='product__category__container flex__row flex-start'>
                <span className='product__category flex-start'>Phones</span>
              </div>
              <div className='product__name__container'>
                <span className='product__name'>Iphone 13 pro max</span>
                <span className='fav__icon'>
                  <i className='fa-regular fa-heart'></i>
                </span>
                {/* <!-- <div className="product__category">chairs</div> --> */}
              </div>
              <div className='price__favourite__container'>
                <span className='price__container flex__row flex-start'>
                  <span className='original__price'> $979 </span>
                  <span className='old__price'> $1199 </span>
                </span>
              </div>
              <div className='stars__container'>
                <span className='stars'>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-regular fa-star'></i>
                </span>
                <span className='stars__rate'>4</span>
              </div>
            </div>
            <div className='add__to__cart__container'>
              <button className='btn add__to__cart__btn'>
                <i className='bx bx-cart-add'></i> Add to cart
              </button>
            </div>
          </div>
          <div className='product__container flex__column flex-start'>
            <div className='product__img__container'>
              <img
                src='./media/product2.webp'
                alt='chair'
                className='product__img'
              />
            </div>
            <div className='product__info__container'>
              <div className='product__category__container flex__row flex-start'>
                <span className='product__category flex-start'>Laptops</span>
              </div>
              <div className='product__name__container'>
                <span className='product__name'>Macbook pro</span>
                <span className='fav__icon'>
                  <i className='fa-regular fa-heart'></i>
                </span>
                {/* <!-- <div className="product__category">chairs</div> --> */}
              </div>
              <div className='price__favourite__container'>
                <span className='price__container flex__row flex-start'>
                  <span className='original__price'> $1318 </span>
                  <span className='old__price'> $1410 </span>
                </span>
              </div>
              <div className='stars__container'>
                <span className='stars'>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                </span>
                <span className='stars__rate'>5</span>
              </div>
            </div>
            <div className='add__to__cart__container'>
              <button className='btn add__to__cart__btn'>
                <i className='bx bx-cart-add'></i> Add to cart
              </button>
            </div>
          </div>
          <div className='product__container flex__column flex-start'>
            <div className='product__img__container'>
              <img
                src='./media/product3.png'
                alt='chair'
                className='product__img'
              />
            </div>
            <div className='product__info__container'>
              <div className='product__category__container flex__row flex-start'>
                <span className='product__category flex-start'>Camera</span>
              </div>
              <div className='product__name__container'>
                <span className='product__name'>Sony HD camera</span>
                <span className='fav__icon'>
                  <i className='fa-regular fa-heart'></i>
                </span>
                {/* <!-- <div className="product__category">chairs</div> --> */}
              </div>
              <div className='price__favourite__container'>
                <span className='price__container flex__row flex-start'>
                  <span className='original__price'> $450 </span>
                  <span className='old__price'> $540 </span>
                </span>
              </div>
              <div className='stars__container'>
                <span className='stars'>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-regular fa-star'></i>
                </span>
                <span className='stars__rate'>4</span>
              </div>
            </div>
            <div className='add__to__cart__container'>
              <button className='btn add__to__cart__btn'>
                <i className='bx bx-cart-add'></i> Add to cart
              </button>
            </div>
          </div>
          <div className='product__container flex__column flex-start'>
            <div className='product__img__container'>
              <img
                src='./media/product 4.avif'
                alt='chair'
                className='product__img'
              />
            </div>
            <div className='product__info__container'>
              <div className='product__category__container flex__row flex-start'>
                <span className='product__category flex-start'>chairs</span>
              </div>
              <div className='product__name__container'>
                <span className='product__name'>Gaming Chair</span>
                <span className='fav__icon'>
                  <i className='fa-regular fa-heart'></i>
                </span>
                {/* <!-- <div className="product__category">chairs</div> --> */}
              </div>
              <div className='price__favourite__container'>
                <span className='price__container flex__row flex-start'>
                  <span className='original__price'> $200 </span>
                  <span className='old__price'> $220 </span>
                </span>
              </div>
              <div className='stars__container'>
                <span className='stars'>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-regular fa-star'></i>
                </span>
                <span className='stars__rate'>4</span>
              </div>
            </div>
            <div className='add__to__cart__container'>
              <button className='btn add__to__cart__btn'>
                <i className='bx bx-cart-add'></i> Add to cart
              </button>
            </div>
          </div>
          <div className='product__container flex__column flex-start'>
            <div className='product__img__container'>
              <img
                src='./media/product5.png'
                alt='chair'
                className='product__img'
              />
            </div>
            <div className='product__info__container'>
              <div className='product__category__container flex__row flex-start'>
                <span className='product__category flex-start'>Sports</span>
              </div>
              <div className='product__name__container'>
                <span className='product__name'>Football</span>
                <span className='fav__icon'>
                  <i className='fa-regular fa-heart'></i>
                </span>
                {/* <!-- <div className="product__category">chairs</div> --> */}
              </div>
              <div className='price__favourite__container'>
                <span className='price__container flex__row flex-start'>
                  <span className='original__price'> $12 </span>
                  <span className='old__price'> $20 </span>
                </span>
              </div>
              <div className='stars__container'>
                <span className='stars'>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-regular fa-star'></i>
                </span>
                <span className='stars__rate'>4</span>
              </div>
            </div>
            <div className='add__to__cart__container'>
              <button className='btn add__to__cart__btn'>
                <i className='bx bx-cart-add'></i> Add to cart
              </button>
            </div>
          </div>
          <div className='product__container flex__column flex-start'>
            <div className='product__img__container'>
              <img
                src='./media/product6.webp'
                alt='chair'
                className='product__img'
              />
            </div>
            <div className='product__info__container'>
              <div className='product__category__container flex__row flex-start'>
                <span className='product__category flex-start'>Watch</span>
              </div>
              <div className='product__name__container'>
                <span className='product__name'>HD Watch</span>
                <span className='fav__icon'>
                  <i className='fa-regular fa-heart'></i>
                </span>
                {/* <!-- <div className="product__category">chairs</div> --> */}
              </div>
              <div className='price__favourite__container'>
                <span className='price__container flex__row flex-start'>
                  <span className='original__price'> $200 </span>
                  <span className='old__price'> $220 </span>
                </span>
              </div>
              <div className='stars__container'>
                <span className='stars'>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star-half-stroke'></i>
                </span>
                <span className='stars__rate'>4.5</span>
              </div>
            </div>
            <div className='add__to__cart__container'>
              <button className='btn add__to__cart__btn'>
                <i className='bx bx-cart-add'></i> Add to cart
              </button>
            </div>
          </div>
          <div className='product__container flex__column flex-start'>
            <div className='product__img__container'>
              <img
                src='./media/product 7.webp'
                alt='chair'
                className='product__img'
              />
            </div>
            <div className='product__info__container'>
              <div className='product__category__container flex__row flex-start'>
                <span className='product__category flex-start'>Headphone</span>
              </div>
              <div className='product__name__container'>
                <span className='product__name'>Redragon gaming headphone</span>
                <span className='fav__icon'>
                  <i className='fa-regular fa-heart'></i>
                </span>
                {/* <!-- <div className="product__category">chairs</div> --> */}
              </div>
              <div className='price__favourite__container'>
                <span className='price__container flex__row flex-start'>
                  <span className='original__price'> $50 </span>
                  <span className='old__price'> $67 </span>
                </span>
              </div>
              <div className='stars__container'>
                <span className='stars'>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  {/* <!-- <i className="fa-regular fa-star"></i> --> */}
                </span>
                <span className='stars__rate'>5</span>
              </div>
            </div>
            <div className='add__to__cart__container'>
              <button className='btn add__to__cart__btn'>
                <i className='bx bx-cart-add'></i> Add to cart
              </button>
            </div>
          </div>
          <div className='product__container flex__column flex-start'>
            <div className='product__img__container'>
              <img
                src='./media/product8.avif'
                alt='chair'
                className='product__img'
              />
            </div>
            <div className='product__info__container'>
              <div className='product__category__container flex__row flex-start'>
                <span className='product__category flex-start'>TV</span>
              </div>
              <div className='product__name__container'>
                <span className='product__name'>Samsung OLED smart TV</span>
                <span className='fav__icon'>
                  <i className='fa-regular fa-heart'></i>
                </span>
                {/* <!-- <div className="product__category">chairs</div> --> */}
              </div>
              <div className='price__favourite__container'>
                <span className='price__container flex__row flex-start'>
                  <span className='original__price'> $1499 </span>
                  <span className='old__price'> $1800 </span>
                </span>
              </div>
              <div className='stars__container'>
                <span className='stars'>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-regular fa-star'></i>
                </span>
                <span className='stars__rate'>4</span>
              </div>
            </div>
            <div className='add__to__cart__container'>
              <button className='btn add__to__cart__btn'>
                <i className='bx bx-cart-add'></i> Add to cart
              </button>
            </div>
          </div>
          <div className='product__container flex__column flex-start'>
            <div className='product__img__container'>
              <img
                src='./media/product 9.png'
                alt='keyboard'
                className='product__img'
              />
            </div>
            <div className='product__info__container'>
              <div className='product__category__container flex__row flex-start'>
                <span className='product__category flex-start'>
                  computer accessories
                </span>
              </div>
              <div className='product__name__container'>
                <span className='product__name'>Gaming keyboard</span>
                <span className='fav__icon'>
                  <i className='fa-regular fa-heart'></i>
                </span>
                {/* <!-- <div className="product__category">chairs</div> --> */}
              </div>
              <div className='price__favourite__container'>
                <span className='price__container flex__row flex-start'>
                  <span className='original__price'> $43 </span>
                  <span className='old__price'> $49 </span>
                </span>
              </div>
              <div className='stars__container'>
                <span className='stars'>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-regular fa-star'></i>
                </span>
                <span className='stars__rate'>4</span>
              </div>
            </div>
            <div className='add__to__cart__container'>
              <button className='btn add__to__cart__btn'>
                <i className='bx bx-cart-add'></i> Add to cart
              </button>
            </div>
          </div>
          <div className='product__container flex__column flex-start'>
            <div className='product__img__container'>
              <img
                src='./media/product 10.webp'
                alt='mouse'
                className='product__img'
              />
            </div>
            <div className='product__info__container'>
              <div className='product__category__container flex__row flex-start'>
                <span className='product__category flex-start'>
                  Computer accessories
                </span>
              </div>
              <div className='product__name__container'>
                <span className='product__name'>Mouse gaming</span>
                <span className='fav__icon'>
                  <i className='fa-regular fa-heart'></i>
                </span>
                {/* <!-- <div className="product__category">chairs</div> --> */}
              </div>
              <div className='price__favourite__container'>
                <span className='price__container flex__row flex-start'>
                  <span className='original__price'> $36 </span>
                  <span className='old__price'> $42 </span>
                </span>
              </div>
              <div className='stars__container'>
                <span className='stars'>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-regular fa-star'></i>
                </span>
                <span className='stars__rate'>4</span>
              </div>
            </div>
            <div className='add__to__cart__container'>
              <button className='btn add__to__cart__btn'>
                <i className='bx bx-cart-add'></i> Add to cart
              </button>
            </div>
          </div>
          <div className='product__container flex__column flex-start'>
            <div className='product__img__container'>
              <img
                src='./media/product 11.png'
                alt='chair'
                className='product__img'
              />
            </div>
            <div className='product__info__container'>
              <div className='product__category__container flex__row flex-start'>
                <span className='product__category flex-start'>earphone</span>
              </div>
              <div className='product__name__container'>
                <span className='product__name'>Apple airpods pro</span>
                <span className='fav__icon'>
                  <i className='fa-regular fa-heart'></i>
                </span>
                {/* <!-- <div className="product__category">chairs</div> --> */}
              </div>
              <div className='price__favourite__container'>
                <span className='price__container flex__row flex-start'>
                  <span className='original__price'> $278 </span>
                  <span className='old__price'> $350 </span>
                </span>
              </div>
              <div className='stars__container'>
                <span className='stars'>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-regular fa-star'></i>
                </span>
                <span className='stars__rate'>4</span>
              </div>
            </div>
            <div className='add__to__cart__container'>
              <button className='btn add__to__cart__btn'>
                <i className='bx bx-cart-add'></i> Add to cart
              </button>
            </div>
          </div>
          <div className='product__container flex__column flex-start'>
            <div className='product__img__container'>
              <img
                src='./media/product12.webp'
                alt='chair'
                className='product__img'
              />
            </div>
            <div className='product__info__container'>
              <div className='product__category__container flex__row flex-start'>
                <span className='product__category flex-start'>
                  men accessories
                </span>
              </div>
              <div className='product__name__container'>
                <span className='product__name'>Leather wallet</span>
                <span className='fav__icon'>
                  <i className='fa-regular fa-heart'></i>
                </span>
                {/* <!-- <div className="product__category">chairs</div> --> */}
              </div>
              <div className='price__favourite__container'>
                <span className='price__container flex__row flex-start'>
                  <span className='original__price'> $25 </span>
                  <span className='old__price'> $29 </span>
                </span>
              </div>
              <div className='stars__container'>
                <span className='stars'>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-solid fa-star'></i>
                  <i className='fa-regular fa-star'></i>
                </span>
                <span className='stars__rate'>4</span>
              </div>
            </div>
            <div className='add__to__cart__container'>
              <button className='btn add__to__cart__btn'>
                <i className='bx bx-cart-add'></i> Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className='section why__chooseUS__section'>
        <div className='section__title__container'>
          <h2 className='section__title'>Why choosing us?</h2>
        </div>
        <div className='why__choose__us__description__container'>
          <p className='why__choose__us__description'>
            We have an old date in E-commerce, our products are original and
            made with high quality, also we have a secure payments methods, fast
            delivery and pay with cash services
          </p>
        </div>
        <div className='why__us__cards__container flex__row'>
          <div className='why__choose__us__card flex__column flex-start'>
            <div className='card__img__container'>
              <img
                src='./media/online payment icon.webp'
                alt='online payment icon'
                className='card__img'
              />
            </div>
            <div className='card__title__container'>
              <p className='card__title'>Secure payments</p>
            </div>
            <div className='card__description_container'>
              <p className='card__description'>
                We provide a high quality of secure to pay using your credit
                card securley
              </p>
            </div>
          </div>
          <div className='why__choose__us__card flex__column flex-start'>
            <div className='card__img__container'>
              <img
                src='./media/fast delievery icon.png'
                alt='online payment icon'
                className='card__img'
              />
            </div>
            <div className='card__title__container'>
              <p className='card__title'>Fast delivery</p>
            </div>
            <div className='card__description_container'>
              <p className='card__description'>
                We provide fast delivery for you
              </p>
            </div>
          </div>
          <div className='why__choose__us__card flex__column flex-start'>
            <div className='card__img__container'>
              <img
                src='./media/original products.png'
                alt='online payment icon'
                className='card__img'
              />
            </div>
            <div className='card__title__container'>
              <p className='card__title'>Original products</p>
            </div>
            <div className='card__description_container'>
              <p className='card__description'>
                We sells only the original products to ensure that the quality
                is high
              </p>
            </div>
          </div>
          <div className='why__choose__us__card flex__column flex-start'>
            <div className='card__img__container'>
              <img
                src='./media/customer service.png'
                alt='online payment icon'
                className='card__img'
              />
            </div>
            <div className='card__title__container'>
              <p className='card__title'>24/7 customer service</p>
            </div>
            <div className='card__description_container'>
              <p className='card__description'>
                We provide a 24/7 customer service
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
