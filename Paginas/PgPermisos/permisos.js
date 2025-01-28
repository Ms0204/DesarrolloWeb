let permisos = [
  { Num: 1, id: "09101", fechaAsignacion: "2024-09-10", estado: "Activo", cedulaUsuario: "0709803345", idRol: "09101" },
  { Num: 2, id: "09102", fechaAsignacion: "2024-09-15", estado: "Inactivo", cedulaUsuario: "0703200832", idRol: "09102" },
  { Num: 3, id: "09103", fechaAsignacion: "2024-10-10", estado: "Activo", cedulaUsuario: "0700007900", idRol: "09103" },
];

let currentPage = 1;
let itemsPerPage = 5;

document.getElementById("itemsPerPage").addEventListener("change", function () {
  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  renderPermisos();
});

document.getElementById("search").addEventListener("input", searchPermisos);

function renderPermisos() {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedPermisos = permisos.slice(start, end);

  paginatedPermisos.forEach((permiso, index) => {
    const row = `<tr>
              <td>${permiso.Num}</td>
              <td>${permiso.id}</td>
              <td>${permiso.fechaAsignacion}</td>
              <td>${permiso.estado}</td>
              <td>${permiso.cedulaUsuario}</td>
              <td>${permiso.idRol}</td>
              <td class="d-flex gap-2">
                  <button class="btn btn-warning btn-sm" onclick="editPermiso(${start + index})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDeletePermiso(${start + index})"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
  renderPagination();
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(permisos.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (i === currentPage) li.classList.add("active");
    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.addEventListener("click", () => {
      currentPage = i;
      renderPermisos();
    });
    pagination.appendChild(li);
  }
}

function editPermiso(index) {
  const permiso = permisos[index];
  document.getElementById("editId").value = permiso.id;
  document.getElementById("editNombre").value = permiso.fechaAsignacion;
  document.getElementById("editDescripsion").value = permiso.estado;
  document.getElementById("editCedulaUsuario").value = permiso.cedulaUsuario;
  document.getElementById("editIdRol").value = permiso.idRol;

  document.getElementById("editUserForm").onsubmit = function (e) {
    e.preventDefault();
    permisos[index] = {
      ...permiso,
      id: document.getElementById("editId").value,
      fechaAsignacion: document.getElementById("editNombre").value,
      estado: document.getElementById("editDescripsion").value,
      cedulaUsuario: document.getElementById("editCedulaUsuario").value,
      idRol: document.getElementById("editIdRol").value
    };
    renderPermisos();
    bootstrap.Modal.getInstance(document.getElementById("editUserModal")).hide();
  };
  new bootstrap.Modal(document.getElementById("editUserModal")).show();
}

function confirmDeletePermiso(index) {
  document.getElementById("confirmDeleteButton").onclick = function () {
    permisos.splice(index, 1);
    renderPermisos();
    bootstrap.Modal.getInstance(document.getElementById("deleteUserModal")).hide();
  };
  new bootstrap.Modal(document.getElementById("deleteUserModal")).show();
}

function searchPermisos() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = permisos.filter(permiso =>
    Object.values(permiso).some(value => value.toString().toLowerCase().includes(query))
  );
  renderFilteredPermisos(filtered);
}

function renderFilteredPermisos(filtered) {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  filtered.forEach((permiso, index) => {
    const row = `<tr>
              <td>${permiso.Num}</td>
              <td>${permiso.id}</td>
              <td>${permiso.fechaAsignacion}</td>
              <td>${permiso.estado}</td>
              <td>${permiso.cedulaUsuario}</td>
              <td>${permiso.idRol}</td>
              <td class="d-flex gap-2">
                  <button class="btn btn-warning btn-sm" onclick="editPermiso(${index})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDeletePermiso(${index})"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
}

document.addEventListener("DOMContentLoaded", renderPermisos);

document.getElementById("addUserForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const newPermiso = {
    Num: permisos.length + 1,
    id: document.getElementById("addId").value,
    fechaAsignacion: document.getElementById("addNombre").value,
    estado: document.getElementById("addDescripcion").value,
    cedulaUsuario: document.getElementById("addCedulaUsuario").value,
    idRol: document.getElementById("addIdRol").value
  };
  permisos.push(newPermiso);
  renderPermisos();
  bootstrap.Modal.getInstance(document.getElementById("addUserModal")).hide();
  document.getElementById("addUserForm").reset();
});

function toggleMenu() {
  document.querySelector('.sidebar').classList.toggle('active');
}

function confirmarCerrarSesion() {
  return confirm('¿Estás seguro de que deseas cerrar sesión?');
}