import Swal from "sweetalert2"

const _t = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  // backdrop: true,
  // width: "400px",
  // heightAuto: true,
  // loaderHtml: "loading...",
  // showLoaderOnConfirm: true, // preConfirm: async(para)=>{}
  customClass: {
    container: "swal2-container",
    // popup: "...",
    // header: "...",
    // title: "...",
    // closeButton: "...",
    // icon: "...",
    // image: "...",
    // htmlContainer: "...",
    // input: "...",
    // inputLabel: "...",
    // validationMessage: "...",
    // actions: "...",
    // confirmButton: "...",
    // denyButton: "...",
    // cancelButton: "...",
    // loader: "...",
    // footer: "....",
    // timerProgressBar: "....",
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  },
})

export const Toast = {
  error: (text, title) => {
    _t.fire({
      icon: "error",
      text: text, // AxiosError: timeout of 1000ms exceeded
      title: title,
      timer: 3000,
    })
  },
  success: (text, title) => {
    _t.fire({
      icon: "success",
      text: text,
      title: title,
      timer: 2000,
    })
  },
}

/*
Toast.fire({
  icon: "success",
  title: "Signed in successfully",
})
.then((result) => {
  if (result.isConfirmed) {
    Swal.fire("Saved!", "", "success");
  } else if (result.isDenied) {
    Swal.fire("Changes are not saved", "", "info");
  }
  if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  })
  .catch((e) => console.log(e.getMessage()))
  .finally(() => {
    e.target.disabled = false;
  });
  */

// // ============================================= Example =========================================================
// // let timerInterval = null;
// Swal.fire({
//   icon: "success",
//   title: "<strong>Error</strong>!",
//   html: "I will close in <b></b> milliseconds.",
//   text: "Do you want to continue",
//   // iconHtml: "؟",
//   confirmButtonText: `<b class="text-red-400">OK!</> `,
//   // footer: `<a href="#">Why do I have this issue?</a>`,
//   // imageUrl: "https://images.unsplash.com/photo-1494314671902-399b18174975",
//   // imageHeight: 1500,
//   // imageAlt: "Coffee image",
//   // confirmButtonAriaLabel: "Thumbs up, great!",
//   // focusConfirm: false,
//   // showCancelButton: true,
//   // cancelButtonText: `<image>Cancel</i>`,
//   // // cancelButtonAriaLabel: "Thumbs down",
//   // focusCancel: false,
//   // showDenyButton: true, // When denied, the result.value will be false. When confirmed, true. dismissed, undefined.
//   // denyButtonText: "Deny",
//   // focusDeny: true,
//   // showCloseButton: true,
//   timer: 2000,
//   timerProgressBar: true,
//   // didOpen: () => {
//   //   Swal.showLoading();
//   //   const timer = Swal.getPopup().querySelector("b");
//   //   timerInterval = setInterval(() => {
//   //     timer.textContent = `${Swal.getTimerLeft()}`;
//   //   }, 200);
//   // },
//   // willClose: () => {
//   //   clearInterval(timerInterval);
//   // },
//   // backdrop: false, // Whether or not SweetAlert2 should show a full screen click-to-dismiss backdrop.
//   input: "password", // Example: Swal.fire(`Entered password: ${password}`);
//   inputLabel: "Password",
//   inputPlaceholder: "Enter your password",
//   inputAttributes: {
//     maxlength: "10",
//     autocapitalize: "off",
//     autocorrect: "off",
//   },
//   // showLoaderOnConfirm: true, // Replace Confirm Button with a loader anim icon. Combine with preConfirm.
//   // Function to execute before confirming
//   preConfirm: (value) => {
//     console.log(value); // By default, multiple inputs aren't supported.
//     // return [document.getElementById("swal-input1").value, document.getElementById("swal-input2").value];
//   },

//   toast: true,
//   position: "top",
//   didOpen: (toast) => {
//     toast.onmouseenter = Swal.stopTimer;
//     toast.onmouseleave = Swal.resumeTimer;
//   },
//   // template: "#my-template",
//   // THEMES. npm install --save @sweetalert2/themes
// })
//   .then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire("Saved!", "", "success");
//     } else if (result.isDenied) {
//       Swal.fire("Changes are not saved", "", "info");
//     }
//     if (result.dismiss === Swal.DismissReason.timer) {
//       console.log("I was closed by the timer");
//     }
//   })
//   .catch((e) => console.log(e.getMessage()))
//   .finally(() => {
//     e.target.disabled = false;
//   });
// // ================================================================================================================
