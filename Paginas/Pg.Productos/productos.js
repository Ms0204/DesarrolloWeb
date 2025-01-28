let productos = [
    { Num: 1, id: "02001", nombre: "Cloro", cantidad: "3" },
    { Num: 2, id: "02002", nombre: "Aspiradoras industriales", cantidad: "5" },
    { Num: 3, id: "02003", nombre: "Selladores y masillas resistentes al agua", cantidad: "8" },
    { Num: 4, id: "02004", nombre: "Botas impermeables", cantidad: "20" },
    { Num: 5, id: "02005", nombre: "Cepillos y escobas industriales", cantidad: "15" },
    { Num: 6, id: "02006", nombre: "Electrodos y varillas de soldadura", cantidad: "24" },
    { Num: 7, id: "02007", nombre: "Cascos y gafas de seguridad", cantidad: "10" },
  ];
  
  let currentPage = 1;
  let itemsPerPage = 5;
  
  document.getElementById("itemsPerPage").addEventListener("change", function () {
    itemsPerPage = parseInt(this.value);
    currentPage = 1;
    renderProductos();
  });
  
  document.getElementById("search").addEventListener("input", searchProductos);
  
  function renderProductos() {
    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProductos = productos.slice(start, end);
  
    paginatedProductos.forEach((producto, index) => {
      const row = `<tr>
                <td>${producto.Num}</td>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td class="d-flex gap-2">
                    <button class="btn btn-warning btn-sm" onclick="editProducto(${start + index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="confirmDeleteProducto(${start + index})"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>`;
      tableBody.innerHTML += row;
    });
    renderPagination();
  }
  
  function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    const totalPages = Math.ceil(productos.length / itemsPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.classList.add("page-item");
      if (i === currentPage) li.classList.add("active");
      li.innerHTML = `<button class="page-link">${i}</button>`;
      li.addEventListener("click", () => {
        currentPage = i;
        renderProductos();
      });
      pagination.appendChild(li);
    }
  }
  
  function editProducto(index) {
    const producto = productos[index];
    document.getElementById("editId").value = producto.id;
    document.getElementById("editNombre").value = producto.nombre;
    document.getElementById("editCantidad").value = producto.cantidad;
  
    document.getElementById("editUserForm").onsubmit = function (e) {
      e.preventDefault();
      productos[index] = {
        ...producto,
        id: document.getElementById("editId").value,
        nombre: document.getElementById("editNombre").value,
        cantidad: document.getElementById("editCantidad").value,
      };
      renderProductos();
      bootstrap.Modal.getInstance(document.getElementById("editUserModal")).hide();
    };
    new bootstrap.Modal(document.getElementById("editUserModal")).show();
  }
  
  function confirmDeleteProducto(index) {
    document.getElementById("confirmDeleteButton").onclick = function () {
      productos.splice(index, 1);
      renderProductos();
      bootstrap.Modal.getInstance(document.getElementById("deleteUserModal")).hide();
    };
    new bootstrap.Modal(document.getElementById("deleteUserModal")).show();
  }
  
  function searchProductos() {
    const query = document.getElementById("search").value.toLowerCase();
    const filtered = productos.filter(producto =>
      Object.values(producto).some(value => value.toString().toLowerCase().includes(query))
    );
    renderFilteredProductos(filtered);
  }
  
  function renderFilteredProductos(filtered) {
    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";
    filtered.forEach((producto, index) => {
      const row = `<tr>
                <td>${producto.Num}</td>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td class="d-flex gap-2">
                    <button class="btn btn-warning btn-sm" onclick="editProducto(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="confirmDeleteProducto(${index})"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>`;
      tableBody.innerHTML += row;
    });
  }
  
  document.addEventListener("DOMContentLoaded", renderProductos);
  
  document.getElementById("addUserForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const newProducto = {
      Num: productos.length + 1,
      id: document.getElementById("addId").value,
      nombre: document.getElementById("addNombre").value,
      cantidad: document.getElementById("addCantidad").value,
    };
    productos.push(newProducto);
    renderProductos();
    bootstrap.Modal.getInstance(document.getElementById("addUserModal")).hide();
    document.getElementById("addUserForm").reset();
  });
  
  function toggleMenu() {
    document.querySelector('.sidebar').classList.toggle('active');
  }
  
  function confirmarCerrarSesion() {
    return confirm('¿Estás seguro de que deseas cerrar sesión?');
  }