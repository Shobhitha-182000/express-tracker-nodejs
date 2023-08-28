let container = document.getElementById("container1");
container.innerHTML = "";

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  const data = {
    amount: amount,
    description: description,
    category: category,
  };
  let token = localStorage.getItem("token");
  axios
    .post("/expense", data, { headers: { Authorization: token } }) // Modify the URL endpoint according to your API route
    .then((response) => {
      console.log("Expense added successfully:");
      // You can update the UI or take other actions as needed
    })
    .catch((error) => {
      console.error("Error adding expense:", error);
      // Handle errors and show error messages if needed
    });
});
let token = localStorage.getItem("token");
axios
  .get("/get-all-expense", { headers: { Authorization: token } })
  .then((response) => {
    let expenses = response.data;

    let ul = document.createElement("ul");
    ul.className = "list-group";

    expenses.forEach((expense) => {
      let li = document.createElement("li");
      li.className = "list-group-item";

      let deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-danger";
      deleteBtn.textContent = "delete";

      let n = ` ${expense.amount} - ${expense.description} - ${expense.category}`;
      li.textContent = n;

      li.appendChild(deleteBtn);
      ul.appendChild(li);
      container.appendChild(ul);

      var deleteUrl = "/expense/" + expense.id;

      deleteBtn.addEventListener("click", function (event) {
        event.preventDefault();
        axios
          .delete(deleteUrl)
          .then((response) => {
            console.log("deleted");
            ul.removeChild(li);
            console.log("Expense deleted successfully:", response.data);
          })
          .catch((err) => console.log(err));
      });
    });
  })
  .catch((err) => console.log(err));

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("/user/get-user", {
      headers: { Authorization: token },
    });

    const isPremiumUser = response.data.isPremiumUser;
    const buyPremier = document.getElementById("buyPremier");
    const buyButton = document.getElementById("buyButton");
    const primeMessage = document.getElementById("primeMessage");

    if (isPremiumUser) {
      buyButton.style.display = "none";
      primeMessage.style.display = "block";
    } else {
      buyButton.style.display = "block"; // Display the "Buy Premium" button
      primeMessage.style.display = "none";
    }

    buyButton.addEventListener("click", async (e) => {
      const token = localStorage.getItem("token");
      const response = await axios.get("/purchase/premiummembership", {
        headers: { Authorization: token },
      });
      const options = {
        key: response.data.key_id,
        order_id: response.data.order.id,
        handler: async function (response) {
          try {
            const updateResponse = await axios.post(
              "/purchase/updatetransaction",
              {
                orderid: options.order_id,
                paymentid: response.razorpay_payment_id,
              },
              { headers: { Authorization: token } }
            );

            localStorage.setItem("isPremiumeUser", "true");
            buyButton.style.display = "none";
            primeMessage.style.display = "block";

            alert("Payment Successful! You are now a Prime Member.");
          } catch (error) {
            console.error(error);
            alert("Something went wrong with the payment.");
          }
        },
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
      e.preventDefault();
    });
  } catch (error) {
    console.log(error);
  }
});
