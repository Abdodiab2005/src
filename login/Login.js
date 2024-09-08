const Login = () => {
  const signUpButton = document.querySelector("#showSignIn");
  const signInButton = document.querySelector("#showSignUp");
  const main = document.querySelector(".sign__section");

  signUpButton.addEventListener("click", () => {
    main.classList.add("right-panel-active");
  });
  signInButton.addEventListener("click", () => {
    main.classList.remove("right-panel-active");
  });
  return (
    <section className='sign__section section'>
      {/* <!-- Sign In --> */}
      <form
        action='#'
        className='sign__form sign__in__form flex_column flex-start'
        id='signInForm'>
        <div className='section__header flex__row space-between'>
          <span className='form__title'> Sign In </span>
          <span className='form__header__icons'>
            <i className='fa-brands fa-instagram header_icon'></i>
            <i className='fa-brands fa-facebook header_icon'></i>
          </span>
        </div>
        <div className='form__body flex_column flex-start'>
          <div className='email__inputs__container flex_column flex-start'>
            <div className='label__container flex__row flex-start'>
              <label for='email__input__signIn' className='label email__label'>
                E-mail
              </label>
            </div>
            <input
              type='text'
              id='email__input__signIn'
              name='email'
              className='input email__input'
              placeholder='E-mail'
              autocomplete='email'
            />
          </div>

          <div className='password__inputs__container flex_column flex-start'>
            <div className='label__container flex__row flex-start'>
              <label
                for='password__input__signIn'
                className='label password__label'>
                Password
              </label>
            </div>
            <input
              type='text'
              id='password__input__signIn'
              name='password'
              className='input password__input'
              placeholder='Password'
              autocomplete='current-password'
            />
          </div>
          <div className='log__btn__container flex_column flex-start'>
            <button id='loginBtn' className='btn disabled log__btn'>
              Sign In
            </button>
            <button className='google__btn btn'>
              <i className='fa-brands fa-google'></i> Continue with google
            </button>
          </div>
          <div className='form__footer flex__row space-between'>
            <div className='check__box__container'>
              <label
                for='remember__me__label'
                className='label remember__me__label flex__row center'>
                <input
                  type='checkbox'
                  name='remember__me__label'
                  id='remember__me__label'
                  className='checkMark'
                />
                <span className='checkmark'></span>
                Remember Me
              </label>
            </div>
            <span className='forgot__pass'>
              <a href='#ForgotPass'>Forgot Password</a>
            </span>
          </div>
        </div>
      </form>
      <form
        action='#'
        className='sign__form sign__up__form flex_column flex-start'
        id='signupForm'>
        <div className='section__header flex__row space-between'>
          <span className='form__title'> Sign UP </span>
          <span className='form__header__icons'>
            <i className='fa-brands fa-instagram header_icon'></i>
            <i className='fa-brands fa-facebook header_icon'></i>
          </span>
        </div>
        <div className='form__body flex_column flex-start'>
          <div className='name__inputs__container flex_column flex-start'>
            <div className='label__container flex__row flex-start'>
              <label for='name__input' className='label name__label'>
                Name
              </label>
            </div>
            <input
              type='text'
              id='name__input'
              name='name'
              className='input name__input'
              placeholder='name'
              autocomplete='name'
            />
          </div>
          <div className='email__inputs__container flex_column flex-start'>
            <div className='label__container flex__row flex-start'>
              <label for='email__input__signup' className='label email__label'>
                E-mail
              </label>
            </div>
            <input
              type='text'
              id='email__input__signup'
              name='email'
              className='input email__input'
              placeholder='E-mail'
              autocomplete='email'
            />
          </div>

          <div className='password__inputs__container flex_column flex-start'>
            <div className='label__container flex__row flex-start'>
              <label
                for='password__input__signup'
                className='label password__label'>
                Password
              </label>
            </div>
            <input
              type='text'
              id='password__input__signup'
              name='password'
              className='input password__input'
              placeholder='Password'
              autocomplete='current-password'
            />
          </div>
          <div className='log__btn__container flex_column flex-start'>
            <button id='signupBtn' className='btn disabled log__btn'>
              Sign UP
            </button>
            <button className='google__btn btn'>
              <i className='fa-brands fa-google'></i> Continue with google
            </button>
          </div>
        </div>
      </form>
      <div className='overlay-container flex_column center'>
        <div className='overlay'>
          <div className='overlay-left'>
            <h2 className='overlay__header'>Welcome</h2>
            <p className='overlay__body'>Already have an account?</p>
            <button className='handle__sign__btn btn' id='showSignUp'>
              Sign IN
            </button>
          </div>
          <div className='overlay-right'>
            <h2 className='overlay__header'>Welcome</h2>
            <p className='overlay__body'>Don't have an account?</p>
            <button className='handle__sign__btn btn' id='showSignIn'>
              Sign UP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
