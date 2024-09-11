document.addEventListener("DOMContentLoaded", () => {
  hideLoadingAnimation();

  setTimeout(() => {
    const profileImg = document.querySelector(".profileImg");
    if (profileImg) {
      const profileImageURL = getLocStore("profileImageURL");
      if (profileImageURL) {
        profileImg.setAttribute("src", profileImageURL);
      } else {
        console.error("Profile image URL is undefined.");
      }
    } else {
      console.error(".profileImg element not found.");
    }
  }, 500);
});
console.log("framework");
function $(selector) {
  const elements = document.querySelectorAll(selector);

  return {
    length: function () {
      return elements.length;
    },
    on: function (event, func) {
      elements.forEach((element) => {
        element.addEventListener(event, func);
      });
    },
    off: function (event) {
      elements.forEach((element) => {
        const func = element[`_${event}Listener`];
        if (func) {
          element.removeEventListener(event, func);
          delete element[`_${event}Listener`];
        }
      });
    },
    val: function (value) {
      if (value === undefined) {
        const firstValue = elements[0] ? elements[0].value : undefined;
        return {
          value: firstValue,
          length: firstValue ? firstValue.length : 0,
        };
      } else {
        elements.forEach((element) => {
          element.value = value;
        });
        return {
          length: elements.length,
        };
      }
    },

    addClass: function (className) {
      elements.forEach((element) => {
        element.classList.add(className);
      });
    },
    removeClass: function (className) {
      elements.forEach((element) => {
        element.classList.remove(className);
      });
    },
    toggleClass: function (className) {
      elements.forEach((element) => {
        element.classList.toggle(className);
      });
    },
    attr: function (attr, value) {
      elements.forEach((element) => {
        element.setAttribute(attr, value);
      });
    },
    getAttr: function (attr) {
      return elements[0].getAttribute(attr);
    },
    parent: function () {
      const parentElements = Array.from(elements).map(
        (element) => element.parentElement
      );
      return {
        addClass: function (className) {
          parentElements.forEach((parentElement) => {
            if (parentElement) {
              parentElement.classList.add(className);
            }
          });
          return this;
        },
        removeClass: function (className) {
          parentElements.forEach((parentElement) => {
            if (parentElement) {
              parentElement.classList.remove(className);
            }
          });
          return this;
        },
        toggleClass: function (className) {
          parentElements.forEach((parentElement) => {
            if (parentElement) {
              parentElement.classList.toggle(className);
            }
          });
          return this;
        },
        parent: function () {
          return $(parentElements);
        },
      };
    },
    forEach: function (callback) {
      elements.forEach((element, index) => {
        callback.call(element, element, index);
      });
    },
    text: function (text) {
      elements.forEach((ele) => {
        ele.textContent = text;
      });
      return this;
    },
  };
}

function hideLoadingAnimation() {
  $(".circle").parent().removeClass("circle-container");
  $(".circle").parent().addClass("hidden");
  document.body.classList.remove("loading-active");
}

function showLoadingAnimation() {
  $(".circle").parent().addClass("circle-container");
  $(".circle").parent().removeClass("hidden");
  document.body.classList.add("loading-active");
}
const scriptTag = document.createElement("script");
scriptTag.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
document.head.append(scriptTag);

function confirmPopupDialog(
  title = "Are you sure?",
  text = "",
  icon = "info",
  confirmButtonColor = "#ff8c00",
  cancelButtonColor = "red",
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel"
) {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: confirmButtonColor,
    cancelButtonColor: cancelButtonColor,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  });
}
function topRightSwal(text, icon = "success", timer = 3000, color = "#000") {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: timer,
    color: color,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: icon,
    title: text,
  });
}

function loadingSwal(text = "loading...", color = "#000") {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,

    color: color,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    title: text,
    didOpen: () => {
      Swal.showLoading();
    },
  });
}

function stopLoadingSwal() {
  Swal.close();
}

function updateSwal(text = "done", icon = "success", timer = 3000, color) {
  Swal.close();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: timer,
    color: color,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: icon,
    title: text,
  });
}

function handleConnectionStatus() {
  if (navigator.onLine) {
    swalTopRightAlert("back online", "success", 3000);
  } else {
    swalTopRightAlert(
      "You're offline, please check your internet connection",
      "error",
      3000,
      "red"
    );
  }
  logoutBtn();
}
window.addEventListener("offline", handleConnectionStatus);
window.addEventListener("online", handleConnectionStatus);

$(".user__profile").on("click", () => {
  location.href = "../overview";
});
function getLocStore(item) {
  return localStorage.getItem(item);
}
function setLocStore(key, value) {
  return localStorage.setItem(key, value);
}
function getSessionStore(key, value) {
  return sessionStorage.getItem(key, value);
}
function setSessionStore(key, value) {
  return sessionStorage.setItem(key, value);
}
document.querySelectorAll(".ripple-effect").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${e.clientY - button.offsetTop - radius}px`;
    ripple.classList.add("ripple");

    const rippleEffect = button.querySelector(".ripple");
    if (rippleEffect) {
      rippleEffect.remove();
    }

    button.appendChild(ripple);
  });
});
