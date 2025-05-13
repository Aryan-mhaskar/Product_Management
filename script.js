function loginUser() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!user || !pass) {
    message.textContent = "Please enter both username and password.";
    return false;
  }

  // Just go to product management if fields are filled
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("productSection").style.display = "block";

  return false; // prevent default form submit
}
function editRow(link) {
  const row = link.parentElement.parentElement;
  const cells = row.querySelectorAll("td");

  // Skip product ID and image column
  const editableIndexes = [1, 2, 3, 5]; // name, brand, country, price

  editableIndexes.forEach(i => {
    const oldText = cells[i].innerText;
    cells[i].innerHTML = `<input type="text" value="${oldText}" />`;
  });

  link.innerText = "Save";
  link.setAttribute("onclick", "saveRow(this)");
}

function saveRow(link) {
  const row = link.parentElement.parentElement;
  const cells = row.querySelectorAll("td");

  const editableIndexes = [1, 2, 3, 5];

  editableIndexes.forEach(i => {
    const inputVal = cells[i].querySelector("input").value;
    cells[i].innerText = inputVal;
  });

  link.innerText = "Edit";
  link.setAttribute("onclick", "editRow(this)");
}
function deleteRow(link) {
  if (confirm("Are you sure you want to delete this product?")) {
    const row = link.parentElement.parentElement;
    row.remove();
  }
}
function showAddProduct() {
  document.getElementById("productSection").style.display = "none";
  document.getElementById("addProductSection").style.display = "block";
}

function goToGrid() {
  document.getElementById("addProductSection").style.display = "none";
  document.getElementById("productSection").style.display = "block";
}

function submitProduct(event) {
  event.preventDefault();

  const name = document.getElementById("newProductName").value.trim();
  const brand = document.getElementById("newBrandName").value.trim();
  const country = document.getElementById("newCountry").value.trim();
  const price = document.getElementById("newPrice").value.trim();
  const imageInput = document.getElementById("newImage");

  const reader = new FileReader();
  reader.onload = function (e) {
    const imgSrc = e.target.result;

    const table = document.querySelector("#productSection table tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>P${Date.now()}</td>
      <td>${name}</td>
      <td>${brand}</td>
      <td>${country}</td>
      <td><img src="${imgSrc}" width="40"></td>
      <td>${price}</td>
      <td>
        <a href="#" onclick="editRow(this)">Edit</a> |
        <a href="#" onclick="deleteRow(this)">Delete</a>
      </td>
    `;

    table.appendChild(row);

    // Reset form and return to product grid
    document.getElementById("productForm").reset();
    goToGrid();
  };

  if (imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    alert("Please attach an image.");
  }

  return false;
}
