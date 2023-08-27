let container = document.getElementById("container1");
container.innerHTML = "";
const token = localStorage.getItem("token");

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