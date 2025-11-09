
import Swal from "sweetalert2";
import './ValidationAlert.css';
import good from "../assets/alert/goodjob.gif";
import wrong from "../assets/alert/wrong.gif";
import Notice from "../assets/alert/Notice.gif";

const ValidationAlert = {
  success: (title = "Good Job!", text = "All answers are correct!", scoreText = "") => {
    Swal.fire({
        title: "Bravoo",
        html: `
          <p>${text}</p>
          ${scoreText ? `<h3 style="color:green; margin-top:10px;">Score: ${scoreText}</h3>` : ""}
        `,
        imageUrl: good,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Question GIF",
        background: "#dfeaf6",
        confirmButtonText: '<i class="fa-solid fa-right-long"></i>',
        allowOutsideClick: false,
        allowEscapeKey: false,
        buttonsStyling: false,
        customClass: {
          popup: "my-popup",
          image: "my-image",
          title: "my-title",
          content: "my-content",
          confirmButton: "my-button",
        },
      });
  },

  error: (title = "Try Again!", text = "Some answers are incorrect.", scoreText = "") => {
    Swal.fire({
        title: "Try Again!",
        html: `
          <p>${text}</p>
          ${scoreText ? `<h3 style="color:red; margin-top:10px;">Score: ${scoreText}</h3>` : ""}
        `,
        imageUrl: wrong,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Question GIF",
        confirmButtonText: 'Try',
        allowOutsideClick: false,
        allowEscapeKey: false,
        buttonsStyling: false,
        confirmButtonColor: '#f44336',
        background: "#dfeaf6",
        customClass: {
          popup: "my-popup",
          image: "my-image",
          title: "my-title",
          content: "my-content",
          confirmButton: "my-button1",
        },
      });
  },

  info: (title = "Notice", text = "Please complete all fields.", scoreText = "") => {
    Swal.fire({
        title: "Oops!",
        html: `
          <p>${text}</p>
          ${scoreText ? `<h3 style="color:blue; margin-top:10px;">Score: ${scoreText}</h3>` : ""}
        `,
        imageUrl: Notice,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Question GIF",
        background: "#dfeaf6",
        confirmButtonText: 'Try again',
        allowOutsideClick: false,
        allowEscapeKey: false,
        buttonsStyling: false,
        customClass: {
          popup: "my-popup",
          image: "my-image",
          title: "my-title",
          content: "my-content",
          confirmButton: "my-button",
        },
      });
  },
};

export default ValidationAlert;
