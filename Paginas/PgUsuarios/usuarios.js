let users = JSON.parse(localStorage.getItem("users")) || [
  { Cedula: "1209854870", usuario: "Esm45e", NombresApellidos: "Esmeralda Sofia Torres Aguilar", email: "esm45ag@gmail.com", direccion: "Machala-Los Sauces", telefono: "0990879943" },
  { Cedula: "1207086500", usuario: "Mar09y", NombresApellidos: "Maria Angela Angulo Cuenca", email: "angela09ma@hotmail.com", direccion: "Machala-Barrio 10 de Agosto", telefono: "0993876943" },
  { Cedula: "1207666700", usuario: "Carlos80", NombresApellidos: "Carlos Leonardo Diaz Orozco", email: "diaz80cl@gmail.com", direccion: "Machala-Bolivar y 9 de mayo", telefono: "0990823612" }
];

let currentPage = 1;
let itemsPerPage = 5;

const userTableBody = document.getElementById("userTableBody");
const pagination = document.getElementById("pagination");
const itemsPerPageSelect = document.getElementById("itemsPerPage");

function renderTable(filteredUsers = null) {
  userTableBody.innerHTML = "";
  const data = filteredUsers || users;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = data.slice(startIndex, endIndex);

  paginatedUsers.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.Cedula}</td>
      <td>${user.usuario}</td>
      <td>${user.NombresApellidos}</td>
      <td>${user.email}</td>
      <td>${user.direccion}</td>
      <td>${user.telefono}</td>
      <td>
        <div class="d-flex">
          <button class="btn btn-primary btn-sm me-2" onclick="openEditModal('${user.Cedula}')">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.Cedula}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    `;
    userTableBody.appendChild(row);
  });

  renderPagination(data);
}

function renderPagination(data) {
  pagination.innerHTML = "";
  const totalPages = Math.ceil(data.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item", i === currentPage ? "active" : "");
    li.innerHTML = `<a href="#" class="page-link" onclick="goToPage(${i})">${i}</a>`;
    pagination.appendChild(li);
  }
}

function goToPage(page) {
  currentPage = page;
  renderTable();
}

itemsPerPageSelect.addEventListener("change", function () {
  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  renderTable();
});

function addUser(event) {
  event.preventDefault();

  const newUser = {
    Cedula: document.getElementById("addCedula").value,
    usuario: document.getElementById("addUsuario").value,
    NombresApellidos: document.getElementById("addNombres").value,
    email: document.getElementById("addCorreo").value,
    direccion: document.getElementById("addDireccion").value,
    telefono: document.getElementById("addTelefono").value
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("addUserForm").reset();
  renderTable();

  const modal = bootstrap.Modal.getInstance(document.getElementById("addUserModal"));
  modal.hide();
}

function deleteUser(cedula) {
  if (confirm("¿Está seguro de que desea eliminar este usuario?")) {
    users = users.filter(user => user.Cedula !== cedula);
    localStorage.setItem("users", JSON.stringify(users));
    renderTable();
    alert("Usuario eliminado correctamente.");
  }
}

function openEditModal(cedula) {
  const user = users.find(user => user.Cedula === cedula);

  if (!user) return;

  document.getElementById("editCedula").value = user.Cedula;
  document.getElementById("editUsuario").value = user.usuario;
  document.getElementById("editNombres").value = user.NombresApellidos;
  document.getElementById("editCorreo").value = user.email;
  document.getElementById("editDireccion").value = user.direccion;
  document.getElementById("editTelefono").value = user.telefono;

  const modal = new bootstrap.Modal(document.getElementById("editUserModal"));
  modal.show();
}

function editUser(event) {
  event.preventDefault();

  const cedula = document.getElementById("editCedula").value;
  const updatedUser = {
    Cedula: cedula,
    usuario: document.getElementById("editUsuario").value,
    NombresApellidos: document.getElementById("editNombres").value,
    email: document.getElementById("editCorreo").value,
    direccion: document.getElementById("editDireccion").value,
    telefono: document.getElementById("editTelefono").value
  };

  users = users.map(user => (user.Cedula === cedula ? updatedUser : user));
  localStorage.setItem("users", JSON.stringify(users));
  renderTable();

  const modal = bootstrap.Modal.getInstance(document.getElementById("editUserModal"));
  modal.hide();
}

document.getElementById("addUserForm").addEventListener("submit", addUser);
document.getElementById("editUserForm").addEventListener("submit", editUser);

document.getElementById("search").addEventListener("input", function () {
  const searchText = this.value.toLowerCase();
  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      value.toLowerCase().includes(searchText)
    )
  );
  renderTable(filteredUsers);
});

function confirmarCerrarSesion() {
  return confirm("¿Estás seguro de que deseas cerrar sesión?");
}

renderTable();
