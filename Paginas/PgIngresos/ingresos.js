let ingresos = [
  { Num: 1, id: "001", cantidad: "50", fechaIngreso: "2024-09-30", idProducto: "02001", codigoInventario: "0701" },
  { Num: 2, id: "002", cantidad: "80", fechaIngreso: "2024-10-25", idProducto: "02002", codigoInventario: "0702" },
  { Num: 3, id: "003", cantidad: "40", fechaIngreso: "2024-10-30", idProducto: "02003", codigoInventario: "0703" },
  { Num: 4, id: "004", cantidad: "55", fechaIngreso: "2024-11-04", idProducto: "02004", codigoInventario: "0704" },
  { Num: 5, id: "005", cantidad: "78", fechaIngreso: "2024-11-16", idProducto: "02005", codigoInventario: "0705" },
  { Num: 6, id: "006", cantidad: "40", fechaIngreso: "2024-11-20", idProducto: "02006", codigoInventario: "0706" },
  { Num: 7, id: "007", cantidad: "70", fechaIngreso: "2024-01-06", idProducto: "02007", codigoInventario: "0707" },

];

let currentPage = 1;
let itemsPerPage = 5;

document.getElementById("itemsPerPage").addEventListener("change", function () {
  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  renderIngresos();
});

document.getElementById("search").addEventListener("input", searchIngresos);

function renderIngresos() {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedIngresos = ingresos.slice(start, end);

  paginatedIngresos.forEach((ingreso, index) => {
    const row = `<tr>
              <td>${ingreso.Num}</td>
              <td>${ingreso.id}</td>
              <td>${ingreso.cantidad}</td>
              <td>${ingreso.fechaIngreso}</td>
              <td>${ingreso.idProducto}</td>
              <td>${ingreso.codigoInventario}</td>
              <td class="d-flex gap-2">
                  <button class="btn btn-warning btn-sm" onclick="editIngreso(${start + index})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDeleteIngreso(${start + index})"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
  renderPagination();
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(ingresos.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (i === currentPage) li.classList.add("active");
    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.addEventListener("click", () => {
      currentPage = i;
      renderIngresos();
    });
    pagination.appendChild(li);
  }
}

function editIngreso(index) {
  const ingreso = ingresos[index];
  document.getElementById("editId").value = ingreso.id;
  document.getElementById("editCantidad").value = ingreso.cantidad;
  document.getElementById("editFechaIngreso").value = ingreso.fechaIngreso;
  document.getElementById("editIdProducto").value = ingreso.idProducto;
  document.getElementById("editCodigoInventario").value = ingreso.codigoInventario;

  document.getElementById("editUserForm").onsubmit = function (e) {
    e.preventDefault();
    ingresos[index] = {
      ...ingreso,
      id: document.getElementById("editId").value,
      cantidad: document.getElementById("editCantidad").value,
      fechaIngreso: document.getElementById("editFechaIngreso").value,
      idProducto: document.getElementById("editIdProducto").value,
      codigoInventario: document.getElementById("editCodigoInventario").value,
    };
    renderIngresos();
    bootstrap.Modal.getInstance(document.getElementById("editUserModal")).hide();
  };
  new bootstrap.Modal(document.getElementById("editUserModal")).show();
}

function confirmDeleteIngreso(index) {
  document.getElementById("confirmDeleteButton").onclick = function () {
    ingresos.splice(index, 1);
    renderIngresos();
    bootstrap.Modal.getInstance(document.getElementById("deleteUserModal")).hide();
  };
  new bootstrap.Modal(document.getElementById("deleteUserModal")).show();
}

function searchIngresos() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = ingresos.filter(ingreso =>
    Object.values(ingreso).some(value => value.toString().toLowerCase().includes(query))
  );
  renderFilteredIngresos(filtered);
}

function renderFilteredIngresos(filtered) {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  filtered.forEach((ingreso, index) => {
    const row = `<tr>
              <td>${ingreso.Num}</td>
              <td>${ingreso.id}</td>
              <td>${ingreso.cantidad}</td>
              <td>${ingreso.fechaIngreso}</td>
              <td>${ingreso.idProducto}</td>
              <td>${ingreso.codigoInventario}</td>
              <td class="d-flex gap-2">
                  <button class="btn btn-warning btn-sm" onclick="editIngreso(${index})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDeleteIngreso(${index})"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
}

document.addEventListener("DOMContentLoaded", renderIngresos);

document.getElementById("addUserForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const newIngreso = {
    Num: ingresos.length + 1,
    id: document.getElementById("addId").value,
    cantidad: document.getElementById("addCodigo").value,
    fechaIngreso: document.getElementById("addFechaIngreso").value,
    idProducto: document.getElementById("addIdProducto").value,
    codigoInventario: document.getElementById("addCodigoInventario").value,
  };
  ingresos.push(newIngreso);
  renderIngresos();
  bootstrap.Modal.getInstance(document.getElementById("addUserModal")).hide();
  document.getElementById("addUserForm").reset();
});

function toggleMenu() {
  document.querySelector('.sidebar').classList.toggle('active');
}

function confirmarCerrarSesion() {
  return confirm('¿Estás seguro de que deseas cerrar sesión?');
}