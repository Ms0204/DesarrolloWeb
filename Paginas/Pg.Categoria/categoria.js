let categorias = [
  { Num: 1, id: "08001", nombre: "Productos de limpieza y desinfección", descripcion: "Mantener espacios limpios, seguros y saludables, en el ámbito industrial.", idProducto:"02001" },
  { Num: 2, id: "08002", nombre: "Equipos y herramientas de limpieza", descripcion: "Dispositivos diseñados para facilitar la limpieza y el mantenimiento de espacios.", idProducto:"02002" },
  { Num: 3, id: "08003", nombre: "Materiales para mantenimiento	", descripcion: "Insumos y productos utilizados para conservar, reparar y optimizar el funcionamiento.", idProducto:"02003" },
  { Num: 4, id: "08004", nombre: "Productos de seguridad y protección personal", descripcion: "Equipos diseñados para proteger al personal durante el desarrollo de actividades laborales.", idProducto:"02004" },
  { Num: 5, id: "08005", nombre: "Equipos y herramientas de limpieza", descripcion: "Dispositivos diseñados para facilitar la limpieza y el mantenimiento de espacios.", idProducto:"02005" },
  { Num: 6, id: "08006", nombre: "Productos de seguridad y protección personal", descripcion: "Equipos y accesorios diseñados para proteger a las personas frente a riesgos físicos, químicos o biológicos.", idProducto:"02006" },
  { Num: 7, id: "08007", nombre: "Productos para manejo de residuos", descripcion: "Herramientas y recipientes diseñados para recolectar, separar y desechar desechos de manera segura y eficiente, como bolsas, contenedores, compactadores y papeleras.", idProducto:"02007" },
];
let currentPage = 1;
let itemsPerPage = 5;

document.getElementById("itemsPerPage").addEventListener("change", function () {
  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  renderCategorias();
});

document.getElementById("search").addEventListener("input", searchCategorias);

function renderCategorias() {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedCategorias = categorias.slice(start, end);

  paginatedCategorias.forEach((categoria, index) => {
    const row = `<tr>
              <td>${categoria.Num}</td>
              <td>${categoria.id}</td>
              <td>${categoria.nombre}</td>
              <td>${categoria.descripcion}</td>
              <td>${categoria.idProducto}</td>
              <td class="d-flex gap-2">
                  <button class="btn btn-warning btn-sm" onclick="editCategoria(${start + index})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDeleteCategoria(${start + index})"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
  renderPagination();
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(categorias.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (i === currentPage) li.classList.add("active");
    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.addEventListener("click", () => {
      currentPage = i;
      renderCategorias();
    });
    pagination.appendChild(li);
  }
}

function editCategoria(index) {
  const categoria = categorias[index];
  document.getElementById("editId").value = categoria.id;
  document.getElementById("editNombre").value = categoria.nombre;
  document.getElementById("editDescripsion").value = categoria.descripcion;
  document.getElementById("editIdProducto").value = categoria.idProducto;

  document.getElementById("editUserForm").onsubmit = function (e) {
    e.preventDefault();
    categorias[index] = {
      ...categoria,
      id: document.getElementById("editId").value,
      nombre: document.getElementById("editNombre").value,
      descripcion: document.getElementById("editDescripsion").value,
      idProducto: document.getElementById("editIdProducto").value
    };
    renderCategorias();
    bootstrap.Modal.getInstance(document.getElementById("editUserModal")).hide();
  };
  new bootstrap.Modal(document.getElementById("editUserModal")).show();
}

function confirmDeleteCategoria(index) {
  document.getElementById("confirmDeleteButton").onclick = function () {
    categorias.splice(index, 1);
    renderCategorias();
    bootstrap.Modal.getInstance(document.getElementById("deleteUserModal")).hide();
  };
  new bootstrap.Modal(document.getElementById("deleteUserModal")).show();
}

function searchCategorias() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = categorias.filter(categoria =>
    Object.values(categoria).some(value => value.toString().toLowerCase().includes(query))
  );
  renderFilteredCategorias(filtered);
}

function renderFilteredCategorias(filtered) {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  filtered.forEach((categoria, index) => {
    const row = `<tr>
              <td>${categoria.Num}</td>
              <td>${categoria.id}</td>
              <td>${categoria.nombre}</td>
              <td>${categoria.descripcion}</td>
              <td>${categoria.idProducto}</td>
              <td class="d-flex gap-2">
                  <button class="btn btn-warning btn-sm" onclick="editCategoria(${index})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDeleteCategoria(${index})"><i class="fas fa-trash-alt"></i></button>
              </td>
          </tr>`;
    tableBody.innerHTML += row;
  });
}

document.addEventListener("DOMContentLoaded", renderCategorias);

document.getElementById("addUserForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const newCategoria = {
    Num: categorias.length + 1,
    id: document.getElementById("addId").value,
    nombre: document.getElementById("addNombre").value,
    descripcion: document.getElementById("addDescripcion").value,
    idProducto: document.getElementById("addIdProducto").value
  };
  categorias.push(newCategoria);
  renderCategorias();
  bootstrap.Modal.getInstance(document.getElementById("addUserModal")).hide();
  document.getElementById("addUserForm").reset();
});

function toggleMenu() {
  document.querySelector('.sidebar').classList.toggle('active');
}

function confirmarCerrarSesion() {
  return confirm('¿Estás seguro de que deseas cerrar sesión?');
}