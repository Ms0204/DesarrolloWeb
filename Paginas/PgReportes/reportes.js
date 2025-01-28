let reportes = [
  { Num: 1, id: "09001", tituloReporte: "Técnico", descripcion: "Evaluación de Desempeño de los productos", fechaEmision: "2024-01-01" },
  { Num: 2, id: "09002", tituloReporte: "Técnico", descripcion: "Evaluación de Desempeño de los categorias", fechaEmision: "2024-01-15" },
  { Num: 3, id: "09003", tituloReporte: "Técnico", descripcion: "Historial de Acceso y Permisos de Usuarios Activos", fechaEmision: "2024-02-10" },
  { Num: 4, id: "09004", tituloReporte: "Empresarial", descripcion: "Análisis de Rotación de Inventario", fechaEmision: "2024-03-20" },
  { Num: 5, id: "09005", tituloReporte: "Técnico", descripcion: "Reporte de Pagos realizados por clientes", fechaEmision: "2024-04-05" },
  { Num: 6, id: "09006", tituloReporte: "Empresarial", descripcion: "Reportes de Salida de Productos", fechaEmision: "2024-05-18" },
  { Num: 7, id: "09007", tituloReporte: "Empresarial", descripcion: "Reporte de Mantenimiento", fechaEmision: "2024-06-10" }
];

let currentPage = 1;
let itemsPerPage = 5;

document.getElementById("itemsPerPage").addEventListener("change", function () {
  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  renderReportes();
});

document.getElementById("search").addEventListener("input", searchReportes);

function renderReportes() {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedReportes = reportes.slice(start, end);

  paginatedReportes.forEach((reporte, index) => {
    const row = `<tr>
              <td>${reporte.Num}</td>
              <td>${reporte.id}</td>
              <td>${reporte.tituloReporte}</td>
              <td>${reporte.descripcion}</td>
              <td>${reporte.fechaEmision}</td>
              <td class="d-flex gap-2">
                  <button class="btn btn-warning btn-sm" onclick="editReporte(${start + index})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDeleteReporte(${start + index})"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
  renderPagination();
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(reportes.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (i === currentPage) li.classList.add("active");
    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.addEventListener("click", () => {
      currentPage = i;
      renderReportes();
    });
    pagination.appendChild(li);
  }
}

function editReporte(index) {
  const reporte = reportes[index];
  document.getElementById("editId").value = reporte.id;
  document.getElementById("editTituloReporte").value = reporte.tituloReporte;
  document.getElementById("editDescripcion").value = reporte.descripcion;
  document.getElementById("editFechaEmision").value = reporte.fechaEmision;

  document.getElementById("editUserForm").onsubmit = function (e) {
    e.preventDefault();
    reportes[index] = {
      ...reporte,
      id: document.getElementById("editId").value,
      tituloReporte: document.getElementById("editTituloReporte").value,
      descripcion: document.getElementById("editDescripcion").value,
      fechaEmision: document.getElementById("editFechaEmision").value
    };
    renderReportes();
    bootstrap.Modal.getInstance(document.getElementById("editUserModal")).hide();
  };
  new bootstrap.Modal(document.getElementById("editUserModal")).show();
}

function confirmDeleteReporte(index) {
  document.getElementById("confirmDeleteButton").onclick = function () {
    reportes.splice(index, 1);
    renderReportes();
    bootstrap.Modal.getInstance(document.getElementById("deleteUserModal")).hide();
  };
  new bootstrap.Modal(document.getElementById("deleteUserModal")).show();
}

function searchReportes() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = reportes.filter(reporte =>
    Object.values(reporte).some(value => value.toString().toLowerCase().includes(query))
  );
  renderFilteredReportes(filtered);
}

function renderFilteredReportes(filtered) {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  filtered.forEach((reporte, index) => {
    const row = `<tr>
              <td>${reporte.Num}</td>
              <td>${reporte.id}</td>
              <td>${reporte.tituloReporte}</td>
              <td>${reporte.descripcion}</td>
              <td>${reporte.fechaEmision}</td>
              <td class="d-flex gap-2">
                  <button class="btn btn-warning btn-sm" onclick="editReporte(${index})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDeleteReporte(${index})"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
}

document.addEventListener("DOMContentLoaded", renderReportes);

document.getElementById("addUserForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const newReporte = {
    Num: reportes.length + 1,
    id: document.getElementById("addId").value,
    tituloReporte: document.getElementById("addTituloReporte").value,
    descripcion: document.getElementById("addDescripcion").value,
    fechaEmision: document.getElementById("addFechaEmision").value
  };
  reportes.push(newReporte);
  renderReportes();
  bootstrap.Modal.getInstance(document.getElementById("addUserModal")).hide();
  document.getElementById("addUserForm").reset();
});

function toggleMenu() {
  document.querySelector('.sidebar').classList.toggle('active');
}

    function confirmarCerrarSesion() {
        return confirm('¿Estás seguro de que deseas cerrar sesión?');
    }