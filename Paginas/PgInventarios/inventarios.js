let inventories = [
  { Num:1, codigo: "0701", tipoMovimiento: "Registro", fechaRegistro: "2024-03-03", cantidadProductos: "3", cedulaUsuario: "1200989009" },
  { Num:2, codigo: "0702", tipoMovimiento: "Eliminación", fechaRegistro: "2024-06-02", cantidadProductos: "10", cedulaUsuario: "1209800902" },
  { Num:3, codigo: "0703", tipoMovimiento: "Registro", fechaRegistro: "2024-07-09", cantidadProductos: "5", cedulaUsuario: "1209088112" },
  { Num:4, codigo: "0704", tipoMovimiento: "Registro", fechaRegistro: "2024-08-10", cantidadProductos: "8", cedulaUsuario: "1201998430" },
  { Num:5, codigo: "0705", tipoMovimiento: "Eliminación", fechaRegistro: "2024-10-03", cantidadProductos: "4", cedulaUsuario: "1208883892" },
  { Num:6, codigo: "0706", tipoMovimiento: "Registro", fechaRegistro: "2024-12-15", cantidadProductos: "14", cedulaUsuario: "1200000987" },
  { Num:7, codigo: "0707", tipoMovimiento: "Eliminación", fechaRegistro: "2025-01-03", cantidadProductos: "20", cedulaUsuario: "1203091774" }
];
let currentPage = 1;
let itemsPerPage = 5;

document.getElementById("itemsPerPage").addEventListener("change", function () {
  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  renderInventories();
});

document.getElementById("search").addEventListener("input", searchInventories);

function renderInventories() {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedInventories = inventories.slice(start, end);

  paginatedInventories.forEach((inventory, index) => {
    const row = `<tr>
              <td>${inventory.Num}</td>
              <td>${inventory.codigo}</td>
              <td>${inventory.tipoMovimiento}</td>
              <td>${inventory.fechaRegistro}</td>
              <td>${inventory.cantidadProductos}</td>
              <td>${inventory.cedulaUsuario}</td>
              <td class="d-flex gap-2">
                  <button class="btn btn-warning btn-sm" onclick="editInventory(${start + index})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDeleteInventory(${start + index})"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
  renderPagination();
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(inventories.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (i === currentPage) li.classList.add("active");
    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.addEventListener("click", () => {
      currentPage = i;
      renderInventories();
    });
    pagination.appendChild(li);
  }
}

function editInventory(index) {
  const inventory = inventories[index];
  document.getElementById("editCodigo").value = inventory.codigo;
  document.getElementById("editTipoMovimiento").value = inventory.tipoMovimiento;
  document.getElementById("editFechaRegistro").value = inventory.fechaRegistro;
  document.getElementById("editCantidadProductos").value = inventory.cantidadProductos;
  document.getElementById("editCedulaUsuario").value = inventory.cedulaUsuario;

  document.getElementById("editUserForm").onsubmit = function (e) {
    e.preventDefault();
    inventories[index] = {
      ...inventory,
      codigo: document.getElementById("editCodigo").value,
      tipoMovimiento: document.getElementById("editTipoMovimiento").value,
      fechaRegistro: document.getElementById("editFechaRegistro").value,
      cantidadProductos: document.getElementById("editCantidadProductos").value,
      cedulaUsuario: document.getElementById("editCedulaUsuario").value
    };
    renderInventories();
    bootstrap.Modal.getInstance(document.getElementById("editUserModal")).hide();
  };
  new bootstrap.Modal(document.getElementById("editUserModal")).show();
}

function confirmDeleteInventory(index) {
  document.getElementById("confirmDeleteButton").onclick = function () {
    inventories.splice(index, 1);
    renderInventories();
    bootstrap.Modal.getInstance(document.getElementById("deleteUserModal")).hide();
  };
  new bootstrap.Modal(document.getElementById("deleteUserModal")).show();
}

function searchInventories() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = inventories.filter(inventory =>
    Object.values(inventory).some(value => value.toString().toLowerCase().includes(query))
  );
  renderFilteredInventories(filtered);
}

function renderFilteredInventories(filtered) {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  filtered.forEach((inventory, index) => {
    const row = `<tr>
              <td>${inventory.Num}</td>
              <td>${inventory.codigo}</td>
              <td>${inventory.tipoMovimiento}</td>
              <td>${inventory.fechaRegistro}</td>
              <td>${inventory.cantidadProductos}</td>
              <td>${inventory.cedulaUsuario}</td>
              <td class="d-flex gap-2">
                  <button class="btn btn-warning btn-sm" onclick="editInventory(${index})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDeleteInventory(${index})"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
}

document.addEventListener("DOMContentLoaded", renderInventories);

document.getElementById("addUserForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const newInventory = {
    Num: inventories.length + 1,
    codigo: document.getElementById("addCodigo").value,
    tipoMovimiento: document.getElementById("addTipoMovimiento").value,
    fechaRegistro: document.getElementById("addFechaRegistro").value,
    cantidadProductos: document.getElementById("addCantidadProductos").value,
    cedulaUsuario: document.getElementById("addCedulaUsuario").value
  };
  inventories.push(newInventory);
  renderInventories();
  bootstrap.Modal.getInstance(document.getElementById("addUserModal")).hide();
  document.getElementById("addUserForm").reset();
});

function toggleMenu() {
  document.querySelector('.sidebar').classList.toggle('active');
}
  function confirmarCerrarSesion() {
  return confirm('¿Estás seguro de que deseas cerrar sesión?');
}
