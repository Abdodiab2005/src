import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPIRDvG_iI4b5KBM9zDUWhw9fPogLdHa8",
  authDomain: "mz-e-commerce-e3969.firebaseapp.com",
  projectId: "mz-e-commerce-e3969",
  storageBucket: "mz-e-commerce-e3969.appspot.com",
  messagingSenderId: "417338132297",
  appId: "1:417338132297:web:07778c4d2d5b3946fc3c98",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// SweetAlert utility functions

export function useConnectionStatus() {
  useEffect(() => {
    function handleConnectionStatus() {
      if (navigator.onLine) {
        swalTopRightAlert("Back online", "success", 3000);
      } else {
        swalTopRightAlert(
          "You're offline, please check your internet connection",
          "error",
          3000,
          "red"
        );
      }
    }

    window.addEventListener("offline", handleConnectionStatus);
    window.addEventListener("online", handleConnectionStatus);

    return () => {
      window.removeEventListener("offline", handleConnectionStatus);
      window.removeEventListener("online", handleConnectionStatus);
    };
  }, []);
}

export function useLoadingAnimation() {
  useEffect(() => {
    const hideLoadingAnimation = () => {
      setTimeout(() => {
        const circleContainer = document.querySelector(".circle-container");
        if (circleContainer) {
          circleContainer.classList.remove("loading-active");
          circleContainer.style.display = "none";
        }
      }, 300);
    };

    hideLoadingAnimation();
  }, []); // Empty dependency array means this runs once on mount
}

export function useRippleEffect() {
  useEffect(() => {
    const initializeRippleEffect = () => {};

    initializeRippleEffect();

    // Cleanup function to remove event listeners
    return () => {
      document.querySelectorAll(".ripple-effect").forEach((btn) => {
        btn.removeEventListener("click", initializeRippleEffect);
      });
    };
  }, []); // Empty dependency array means this runs once on mount
}

export function useInputFocus() {
  useEffect(() => {
    function focusFunc() {
      let parent = this.parentNode;
      parent.classList.add("focus");
    }

    function blurFunc() {
      let parent = this.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
      if (
        !document
          .querySelector(".birthDate__container")
          .classList.contains("focus")
      ) {
        document.querySelector(".birthDate__container").classList.add("focus");
      }
    }

    const initializeInputFocus = () => {
      const inputs = document.querySelectorAll(".input");
      inputs.forEach((input) => {
        input.addEventListener("focus", focusFunc);
        input.addEventListener("blur", blurFunc);
      });
    };

    initializeInputFocus();

    // Cleanup function to remove event listeners
    return () => {
      const inputs = document.querySelectorAll(".input");
      inputs.forEach((input) => {
        input.removeEventListener("focus", focusFunc);
        input.removeEventListener("blur", blurFunc);
      });
    };
  }, []); // Empty dependency array means this runs once on mount
}

export function usePageReady() {
  const navigate = useNavigate();

  useEffect(() => {
    async function pageReady() {
      if (!localStorage.getItem("signInMethod")) {
        navigate("/login"); // Use navigate instead of location.replace
        return;
      }

      if (
        !localStorage.getItem("firstName") ||
        !localStorage.getItem("lastName")
      ) {
        await fetchUserData(localStorage.getItem("uid"));
      }
    }

    pageReady();
  }, [navigate]); // Add navigate to dependency array
}

async function fetchUserData(uid) {
  const userDocRef = doc(db, "users", uid);

  try {
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      Object.entries(userData).forEach(([key, value]) => {
        localStorage.setItem(key, value || "");
      });
      return userData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export function useLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutHandle = () => {
      document.querySelector(".logoutBtn")?.addEventListener("click", () => {
        confirmPopupDialog().then((res) => {
          if (navigator.onLine && res.isConfirmed) {
            signOut(auth)
              .then(() => {
                localStorage.clear();
                swalTopRightAlert(
                  "Signed out successfully",
                  "success",
                  1000,
                  "green"
                );
                setTimeout(() => navigate("/login"), 1000); // Use navigate instead of location.replace
              })
              .catch((error) =>
                swalTopRightAlert(`Error: ${error.message}`, "error")
              );
          } else {
            swalTopRightAlert(
              "Check your internet connection and try again",
              "error",
              3000,
              "red"
            );
          }
        });
      });
    };

    logoutHandle();

    // Cleanup function to remove event listeners
    return () => {
      document
        .querySelector(".logoutBtn")
        ?.removeEventListener("click", logoutHandle);
    };
  }, [navigate]);
}
