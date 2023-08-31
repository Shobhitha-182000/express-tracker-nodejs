const fpBtn = document.getElementById("forgotPasswordBtn");

fpBtn.addEventListener("click", sendMail);

async function sendMail(e) {
  e.preventDefault();
  try {
     const email = document.getElementById('email').value;
     const res = await axios.post("http://localhost:3000/password/sendMail", {
      email: email,
    });
    alert(res.data.message);

    console.log(res.data.message);
    // window.location.href = '/user/login';
     
  } catch (error) {
    console.log(error);
  }
}
