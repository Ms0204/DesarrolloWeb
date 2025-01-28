let pagos = [
  { Num: 1, id: "801", numeroPago: "001", metodoPago: "Efectivo", cantidad: "$110.00", fechaPago: "2024-04-30", cedulaUsuario: "1200989009" },
  { Num: 2, id: "802", numeroPago: "002", metodoPago: "Efectivo", cantidad: "$150.00", fechaPago: "2024-05-01", cedulaUsuario: "1209800902" },
  { Num: 3, id: "803", numeroPago: "003", metodoPago: "Tarjeta", cantidad: "$180.00", fechaPago: "2024-05-03", cedulaUsuario: "1209088112" },
  { Num: 4, id: "804", numeroPago: "004", metodoPago: "Efectivo", cantidad: "$235.00", fechaPago: "2024-05-25", cedulaUsuario: "1201998430" },
  { Num: 5, id: "805", numeroPago: "005", metodoPago: "Efectivo", cantidad: "$85.00", fechaPago: "2024-06-15", cedulaUsuario: "1208883892" },
  { Num: 6, id: "806", numeroPago: "006", metodoPago: "Tarjeta", cantidad: "$250.00", fechaPago: "2024-07-12", cedulaUsuario: "1200000987" },
  { Num: 7, id: "807", numeroPago: "007", metodoPago: "Tarjeta", cantidad: "$50.00", fechaPago: "2024-10-23", cedulaUsuario: "1203091774" }
];

let currentPage = 1;
let itemsPerPage = 5;

document.getElementById("itemsPerPage").addEventListener("change", function () {
  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  renderPagos();
});

document.getElementById("search").addEventListener("input", searchPagos);

function renderPagos() {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedPagos = pagos.slice(start, end);

  paginatedPagos.forEach((pago, index) => {
    const row = `<tr>
              <td>${pago.Num}</td>
              <td>${pago.id}</td>
              <td>${pago.numeroPago}</td>
              <td>${pago.metodoPago}</td>
              <td>${pago.cantidad}</td>
              <td>${pago.fechaPago}</td>
              <td>${pago.cedulaUsuario}</td>
              <td class="d-flex gap-2">
                  <button class="btn btn-warning btn-sm" onclick="editPago(${start + index})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDeletePago(${start + index})"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
  renderPagination();
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(pagos.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (i === currentPage) li.classList.add("active");
    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.addEventListener("click", () => {
      currentPage = i;
      renderPagos();
    });
    pagination.appendChild(li);
  }
}

function editPago(index) {
  const pago = pagos[index];
  document.getElementById("editId").value = pago.id;
  document.getElementById("editNumeroPago").value = pago.numeroPago;
  document.getElementById("editMetodoPago").value = pago.metodoPago;
  document.getElementById("editCantidad").value = pago.cantidad;
  document.getElementById("editFechaPago").value = pago.fechaPago;
  document.getElementById("editCedulaUsuario").value = pago.cedulaUsuario;

  document.getElementById("editUserForm").onsubmit = function (e) {
    e.preventDefault();
    pagos[index] = {
      ...pago,
      id: document.getElementById("editId").value,
      numeroPago: document.getElementById("editNumeroPago").value,
      metodoPago: document.getElementById("editMetodoPago").value,
      cantidad: document.getElementById("editCantidad").value,
      fechaPago: document.getElementById("editFechaPago").value,
      cedulaUsuario: document.getElementById("editCedulaUsuario").value
    };
    renderPagos();
    bootstrap.Modal.getInstance(document.getElementById("editUserModal")).hide();
  };
  new bootstrap.Modal(document.getElementById("editUserModal")).show();
}

function confirmDeletePago(index) {
  document.getElementById("confirmDeleteButton").onclick = function () {
    pagos.splice(index, 1);
    renderPagos();
    bootstrap.Modal.getInstance(document.getElementById("deleteUserModal")).hide();
  };
  new bootstrap.Modal(document.getElementById("deleteUserModal")).show();
}

function searchPagos() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = pagos.filter(pago =>
    Object.values(pago).some(value => value.toString().toLowerCase().includes(query))
  );
  renderFilteredPagos(filtered);
}

function renderFilteredPagos(filtered) {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  filtered.forEach((pago, index) => {
    const row = `<tr>
              <td>${pago.Num}</td>
              <td>${pago.id}</td>
              <td>${pago.numeroPago}</td>
              <td>${pago.metodoPago}</td>
              <td>${pago.cantidad}</td>
              <td>${pago.fechaPago}</td>
              <td>${pago.cedulaUsuario}</td>
              <td class="d-flex gap-2">
                  <button class="btn btn-warning btn-sm" onclick="editPago(${index})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDeletePago(${index})"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
}

document.addEventListener("DOMContentLoaded", renderPagos);

document.getElementById("addUserForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const newPago = {
    Num: pagos.length + 1, // Genera automáticamente el número de registro
    id: document.getElementById("addId").value,
    numeroPago: document.getElementById("addNumeroPago").value,
    metodoPago: document.getElementById("addMetodoPago").value,
    cantidad: document.getElementById("addCantidad").value,
    fechaPago: document.getElementById("addFechaPago").value,
    cedulaUsuario: document.getElementById("addCedulaUsuario").value
  };
  pagos.push(newPago);
  renderPagos();
  bootstrap.Modal.getInstance(document.getElementById("addUserModal")).hide();
  document.getElementById("addUserForm").reset();
});
function confirmarCerrarSesion() {
  return confirm('¿Estás seguro de que deseas cerrar sesión?');
}