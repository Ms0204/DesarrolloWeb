let users = [
  { Num: 1, cedula: "1200989009", usuario: "Esm45e", contraseña: "45Esm", nombres: "Esme Sofia Torres Aguilar", correo: "esm45eg@gmail.com", direccion: "Machala-Los Sauces", telefono: "0990879943" },
  { Num: 2, cedula: "1209800902", usuario: "Mar09y", contraseña: "Mary09", nombres: "Maria Ana Angulo Cuenca", correo: "angela09ma@hotmail.com", direccion: "Machala-10 de Agosto", telefono: "0990879943" },
  { Num: 3, cedula: "1209088112", usuario: "Carlos80", contraseña: "80CarlosL", nombres: "Carlos Leo Diaz Orozco", correo: "diaz80cl@gmail.com", direccion: "Machala-Bolivar y 9 Mayo", telefono: "0990823612" },
  { Num: 4, cedula: "1201998430", usuario: "naye2lili", contraseña: "Nayeli2ll", nombres: "Lili Nayeli Coraisaca Leon", correo: "lili02nayeli@gmail.com", direccion: "Machala-Via Balosa", telefono: "0974871120" },
  { Num: 5, cedula: "1208883892", usuario: "Andra89eJ", contraseña: "Maria89a", nombres: "Julia Mary Andrade Montero", correo: "julia89am@hotmail.com", direccion: "Machala-Guayas y Pasaje", telefono: "0998030500" },
  { Num: 6, cedula: "1200000987", usuario: "rober00f", contraseña: "Roberto00f", nombres: "Robert Fran Perez Lopez", correo: "robert00pl@live.com", direccion: "Machala-Rayito de Luz", telefono: "0999398210" },
  { Num: 7, cedula: "1203091774", usuario: "juanjo80i", contraseña: "JuanJ80", nombres: "Juan Illescas Andrade", correo: "juan80jose@gmail.com", direccion: "Machala-Av.25 de Junio y Buenavista", telefono: "0993092100" }
];

let currentPage = 1;
let itemsPerPage = 5;

document.getElementById("itemsPerPage").addEventListener("change", function () {
  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  renderUsers();
});

document.getElementById("search").addEventListener("input", searchUsers);

function renderUsers() {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedUsers = users.slice(start, end);

  paginatedUsers.forEach((user, index) => {
    const row = `<tr>
              <td>${user.Num}</td>
              <td>${user.cedula}</td>
              <td>${user.usuario}</td>
              <td>${user.contraseña}</td>
              <td>${user.nombres}</td>
              <td>${user.correo}</td>
              <td>${user.direccion}</td>
              <td>${user.telefono}</td>
              <td class="d-flex gap-2">
                  <button class="btn btn-warning btn-sm" onclick="editUser(${start + index})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDeleteUser(${start + index})"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
  renderPagination();
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(users.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (i === currentPage) li.classList.add("active");
    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.addEventListener("click", () => {
      currentPage = i;
      renderUsers();
    });
    pagination.appendChild(li);
  }
}

function editUser(index) {
  const user = users[index];
  document.getElementById("editCedula").value = user.cedula;
  document.getElementById("editUsuario").value = user.usuario;
  document.getElementById("editContraseña").value = user.contraseña;
  document.getElementById("editNombres").value = user.nombres;
  document.getElementById("editCorreo").value = user.correo;
  document.getElementById("editDireccion").value = user.direccion;
  document.getElementById("editTelefono").value = user.telefono;

  document.getElementById("editUserForm").onsubmit = function (e) {
    e.preventDefault();
    users[index] = {
      ...user,
      cedula: document.getElementById("editCedula").value,
      usuario: document.getElementById("editUsuario").value,
      contraseña: document.getElementById("editContraseña").value,
      nombres: document.getElementById("editNombres").value,
      correo: document.getElementById("editCorreo").value,
      direccion: document.getElementById("editDireccion").value,
      telefono: document.getElementById("editTelefono").value
    };
    renderUsers();
    bootstrap.Modal.getInstance(document.getElementById("editUserModal")).hide();
  };
  new bootstrap.Modal(document.getElementById("editUserModal")).show();
}

function confirmDeleteUser(index) {
  document.getElementById("confirmDeleteButton").onclick = function () {
    users.splice(index, 1);
    renderUsers();
    bootstrap.Modal.getInstance(document.getElementById("deleteUserModal")).hide();
  };
  new bootstrap.Modal(document.getElementById("deleteUserModal")).show();
}

function searchUsers() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = users.filter(user =>
    Object.values(user).some(value => value.toString().toLowerCase().includes(query))
  );
  renderFilteredUsers(filtered);
}

function renderFilteredUsers(filtered) {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  filtered.forEach((user, index) => {
    const row = `<tr>
              <td>${user.Num}</td>
              <td>${user.cedula}</td>
              <td>${user.usuario}</td>
              <td>${user.contraseña}</td>
              <td>${user.nombres}</td>
              <td>${user.correo}</td>
              <td>${user.direccion}</td>
              <td>${user.telefono}</td>
              <td class="d-flex gap-2">
                  <button class="btn btn-warning btn-sm" onclick="editUser(${index})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDeleteUser(${index})"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
}

document.addEventListener("DOMContentLoaded", renderUsers);

document.getElementById("addUserForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const newUser = {
    Num: users.length + 1,
    cedula: document.getElementById("addCedula").value,
    usuario: document.getElementById("addUsuario").value,
    contraseña: document.getElementById("addContraseña").value,
    nombres: document.getElementById("addNombres").value,
    correo: document.getElementById("addCorreo").value,
    direccion: document.getElementById("addDireccion").value,
    telefono: document.getElementById("addTelefono").value
  };
  users.push(newUser);
  renderUsers();
  bootstrap.Modal.getInstance(document.getElementById("addUserModal")).hide();
  document.getElementById("addUserForm").reset();
});

function toggleMenu() {
  document.querySelector('.sidebar').classList.toggle('active');
}
function confirmarCerrarSesion() {
  return confirm('¿Estás seguro de que deseas cerrar sesión?');
}