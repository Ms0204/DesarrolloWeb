let egresos = [
    { Num: 1, id: "011", cantidad: "50", fechaEgreso: "2024-09-30", idProducto: "02001", codigoInventario: "0701" },
    { Num: 2, id: "012", cantidad: "80", fechaEgreso: "2024-10-25", idProducto: "02002", codigoInventario: "0702" },
    { Num: 3, id: "013", cantidad: "40", fechaEgreso: "2024-10-30", idProducto: "02003", codigoInventario: "0703" },
    { Num: 4, id: "014", cantidad: "55", fechaEgreso: "2024-11-04", idProducto: "02004", codigoInventario: "0704" },
    { Num: 5, id: "015", cantidad: "78", fechaEgreso: "2024-11-16", idProducto: "02005", codigoInventario: "0705" },
    { Num: 6, id: "016", cantidad: "32", fechaEgreso: "2024-12-30", idProducto: "02006", codigoInventario: "0706" },
    { Num: 7, id: "017", cantidad: "20", fechaEgreso: "2025-01-03", idProducto: "02007", codigoInventario: "0707" },
  ];
  
  let currentPage = 1;
  let itemsPerPage = 5;
  
  document.getElementById("itemsPerPage").addEventListener("change", function () {
    itemsPerPage = parseInt(this.value);
    currentPage = 1;
    renderEgresos();
  });
  
  document.getElementById("search").addEventListener("input", searchEgresos);
  
  function renderEgresos() {
    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedEgresos = egresos.slice(start, end);
  
    paginatedEgresos.forEach((egreso, index) => {
      const row = `<tr>
                <td>${egreso.Num}</td>
                <td>${egreso.id}</td>
                <td>${egreso.cantidad}</td>
                <td>${egreso.fechaEgreso}</td>
                <td>${egreso.idProducto}</td>
                <td>${egreso.codigoInventario}</td>
                <td class="d-flex gap-2">
                    <button class="btn btn-warning btn-sm" onclick="editEgreso(${start + index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="confirmDeleteEgreso(${start + index})"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>`;
      tableBody.innerHTML += row;
    });
    renderPagination();
  }
  
  function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    const totalPages = Math.ceil(egresos.length / itemsPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.classList.add("page-item");
      if (i === currentPage) li.classList.add("active");
      li.innerHTML = `<button class="page-link">${i}</button>`;
      li.addEventListener("click", () => {
        currentPage = i;
        renderEgresos();
      });
      pagination.appendChild(li);
    }
  }
  
  function editEgreso(index) {
    const egreso = egresos[index];
    document.getElementById("editId").value = egreso.id;
    document.getElementById("editCantidad").value = egreso.cantidad;
    document.getElementById("editFechaEgreso").value = egreso.fechaEgreso;
    document.getElementById("editIdProducto").value = egreso.idProducto;
    document.getElementById("editCodigoInventario").value = egreso.codigoInventario;
  
    document.getElementById("editUserForm").onsubmit = function (e) {
      e.preventDefault();
      egresos[index] = {
        ...egreso,
        id: document.getElementById("editId").value,
        cantidad: document.getElementById("editCantidad").value,
        fechaEgreso: document.getElementById("editFechaEgreso").value,
        idProducto: document.getElementById("editIdProducto").value,
        codigoInventario: document.getElementById("editCodigoInventario").value,
      };
      renderEgresos();
      bootstrap.Modal.getInstance(document.getElementById("editUserModal")).hide();
    };
    new bootstrap.Modal(document.getElementById("editUserModal")).show();
  }
  
  function confirmDeleteEgreso(index) {
    document.getElementById("confirmDeleteButton").onclick = function () {
      egresos.splice(index, 1);
      renderEgresos();
      bootstrap.Modal.getInstance(document.getElementById("deleteUserModal")).hide();
    };
    new bootstrap.Modal(document.getElementById("deleteUserModal")).show();
  }
  
  function searchEgresos() {
    const query = document.getElementById("search").value.toLowerCase();
    const filtered = egresos.filter(egreso =>
      Object.values(egreso).some(value => value.toString().toLowerCase().includes(query))
    );
    renderFilteredEgresos(filtered);
  }
  
  function renderFilteredEgresos(filtered) {
    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";
    filtered.forEach((egreso, index) => {
      const row = `<tr>
                <td>${egreso.Num}</td>
                <td>${egreso.id}</td>
                <td>${egreso.cantidad}</td>
                <td>${egreso.fechaEgreso}</td>
                <td>${egreso.idProducto}</td>
                <td>${egreso.codigoInventario}</td>
                <td class="d-flex gap-2">
                    <button class="btn btn-warning btn-sm" onclick="editEgreso(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="confirmDeleteEgreso(${index})"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>`;
      tableBody.innerHTML += row;
    });
  }
  
  document.addEventListener("DOMContentLoaded", renderEgresos);
  
  document.getElementById("addUserForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const newEgreso = {
      Num: egresos.length + 1,
      id: document.getElementById("addId").value,
      cantidad: document.getElementById("addCodigo").value,
      fechaEgreso: document.getElementById("addFechaEgreso").value,
      idProducto: document.getElementById("addIdProducto").value,
      codigoInventario: document.getElementById("addCodigoInventario").value,
    };
    egresos.push(newEgreso);
    renderEgresos();
    bootstrap.Modal.getInstance(document.getElementById("addUserModal")).hide();
    document.getElementById("addUserForm").reset();
  });
  
  function toggleMenu() {
    document.querySelector('.sidebar').classList.toggle('active');
  }
  
  function confirmarCerrarSesion() {
    return confirm('¿Estás seguro de que deseas cerrar sesión?');
  }