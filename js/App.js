import "./styles/framework.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Aside from "./components/aside";
import HomePage from "./components/HomePage";
import { useRippleEffect, useLoadingAnimation } from "./components/framework";
import PassChangeComponent from "./components/PassChangeComponent";

function App() {
  // useConnectionStatus();
  // usePageReady();
  // const { logoutHandle } = useLogout();
  useLoadingAnimation();
  useRippleEffect();
  // useInputFocus();
  return (
    <>
      <Header />
      {/* <!-- loading structure --> */}
      <div className='circle-container loading-active'>
        <div className='circle'></div>
      </div>
      <div
        className='popup__content__container flex__row center'
        id='popup'></div>
      <Aside />
      <main className='main' id='main'>
        {/* <HomePage /> */}

        {/* <AppRoutes /> */}

        <PassChangeComponent />
      </main>
      <Footer />
    </>
  );
}

export default App;
