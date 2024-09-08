import "../styles/footer.css";
export default function Footer() {
  return (
    <footer className='footer'>
      <div className='waves'>
        <div className='wave wave1'></div>
        <div className='wave wave2'></div>
        <div className='wave wave3'></div>
        <div className='wave wave4'></div>
      </div>
      <div className='footer__content__container flex__row flex-start'>
        <div className='location__container flex__column flex-start'>
          <span className='location__title'> Visit US </span>
          <span className='location__text'> Egypt - New Damietta city </span>
          <iframe
            title='footer-map'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54465.93820921435!2d31.701168799999994!3d31.43833185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f9e375eb0246b7%3A0x8e6df51878254838!2sDamietta%20El-Gadeeda%20City%2C%20Kafr%20Saad%2C%20Damietta%20Governorate!5e0!3m2!1sen!2seg!4v1722689093227!5m2!1sen!2seg'
            width='300px'
            height='290px'
            style={{ border: 0 }}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='footer__map'></iframe>
        </div>

        <div className='footer__categories'>
          <span className='footer__categories flex__row'>
            <div className='footer__category__container flex__column flex-start'>
              <p className='category__title'>Electronics</p>
              <ul className='flex__column space-between footer__category__ul__container'>
                <li className='footer__category'>
                  <a href='#Mobile' className='footer__link__category'>
                    Mobile
                  </a>
                </li>
                <li className='footer__category'>
                  <a href='#Laptops' className='footer__link__category'>
                    Laptops
                  </a>
                </li>
                <li className='footer__category'>
                  <a href='#Headphones' className='footer__link__category'>
                    Headphones
                  </a>
                </li>
                <li className='footer__category'>
                  <a href='#Camera' className='footer__link__category'>
                    Camera
                  </a>
                </li>
                <li className='footer__category'>
                  <a href='#Watches' className='footer__link__category'>
                    Watches
                  </a>
                </li>
              </ul>
            </div>
            <div className='footer__category__container flex__column flex-start'>
              <p className='category__title'>Fashion</p>
              <ul className='flex__column space-between footer__category__ul__container'>
                <li className='footer__category'>
                  <a href='#Wallets' className='footer__link__category'>
                    Wallets
                  </a>
                </li>
                <li className='footer__category'>
                  <a href='#Sports' className='footer__link__category'>
                    Sport
                  </a>
                </li>
                <li className='footer__category'>
                  <a href='#Clothes' className='footer__link__category'>
                    Clothes
                  </a>
                </li>
                <li className='footer__category'>
                  <a href='#TVs' className='footer__link__category'>
                    TVs
                  </a>
                </li>
                <li className='footer__category'>
                  <a href='#Accessories' className='footer__link__category'>
                    accessories
                  </a>
                </li>
              </ul>
            </div>
            <div className='footer__category__container flex__column flex-start'>
              <p className='category__title'>User</p>
              <ul className='flex__column space-between footer__category__ul__container'>
                <li className='footer__category'>
                  <a href='#Orders' className='footer__link__category'>
                    Orders
                  </a>
                </li>
                <li className='footer__category'>
                  <a href='#Favs' className='footer__link__category'>
                    favorites
                  </a>
                </li>
                <li className='footer__category'>
                  <a href='#Cart' className='footer__link__category'>
                    Cart
                  </a>
                </li>
                <li className='footer__category'>
                  <a href='#Privacy' className='footer__link__category'>
                    Privacy policy
                  </a>
                </li>
                <li className='footer__category'>
                  <a href='#Policy' className='footer__link__category'>
                    Policy
                  </a>
                </li>
              </ul>
            </div>
          </span>
        </div>
      </div>
      <div className='footer__contact__container flex__row'>
        <p>Follow us</p>
        <a href='#Facebook' className='footer__scoial'>
          <i className='fa-brands fa-facebook'></i>
        </a>
        <a href='#Telegram' className='footer__scoial'>
          <i className='fa-brands fa-telegram'></i>
        </a>
        <a href='#Whatsapp' className='footer__scoial'>
          <i className='fa-brands fa-whatsapp'></i>
        </a>
        <a href='#Instagram' className='footer__scoial'>
          <i className='fa-brands fa-instagram'></i>
        </a>
        <a href='#Twitter' className='footer__scoial'>
          <i className='fa-brands fa-x-twitter'></i>
        </a>
      </div>
      <div className='copyrights__container flex__row center'>
        <span className='copyright__market__name'> E-commerce </span>
        <span className='copyrights__year'> 2024 </span>
        <i className='fa-solid fa-copyright'></i>
        <span className='copyrights__text'> all copyrights are reserved </span>
      </div>
      <div className='mazaya__copyrights flex__row center'>
        Made by <a href='https://abdodiab.online'>Mazaya Services</a>
      </div>
    </footer>
  );
}
