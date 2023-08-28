document.addEventListener("DOMContentLoaded", async function () {
  let leaderboard = document.getElementById("leadboard");
  let tableContainer = document.getElementById("list-of-expense");
  let container = document.getElementById("container1");

  leaderboard.addEventListener("click", async (event) => {
    event.preventDefault();
    tableContainer.innerHTML = `
        <table class="expense-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Expense Amount</th>
            </tr>
          </thead>
          <tbody id="tbody"></tbody>
        </table>`;
    let tbody = document.getElementById("tbody");

    try {
      const response = await axios.get("/premium/leaderboard");
      if (Array.isArray(response.data)) {
        response.data.forEach((element) => {
          const row = document.createElement("tr");
          const nameCell = document.createElement("td");
          const amountCell = document.createElement("td");

          nameCell.textContent = element.name;
          amountCell.textContent = element.total_cost;

          row.appendChild(nameCell);
          row.appendChild(amountCell);
          tbody.appendChild(row);
        });
      } else {
        console.error("Response is not an array:", response.data);
      }
    } catch (err) {
      console.log(err);
    }

    container.appendChild(tableContainer);
  });
});
