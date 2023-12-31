const logoutBtn = document.getElementById('logoutbtn');
const show = document.querySelector('#show');
const tbody = document.querySelector('#tbodyId');

show.addEventListener('click', showfiledownloaded);

async function showfiledownloaded(e) {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      "http://localhost:3000/premium/showfiledownloaded",
      {
        headers: { Authorization: token },
      }
    );
    var ptr = 1;

    res.data.data.forEach((data) => {

        let tr = document.createElement("tr");
        tbody.appendChild(tr);
    
        let td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(ptr++));
    
        let td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(data.fileurl));
    
        let td3 = document.createElement("td");
        td3.appendChild(document.createTextNode(data.createdAt));
    
         tr.appendChild(td1);
         tr.appendChild(td2);
         tr.appendChild(td3);
    });
  } catch (error) {
    console.log(error);
  }
}
logoutBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    console.log('Logout button clicked');
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/user/logout',  { headers: { Authorization: token } })
      localStorage.clear();
      window.location.href = '/';
  } catch (error) {
    console.log('Error during logout:', error);
  }
});