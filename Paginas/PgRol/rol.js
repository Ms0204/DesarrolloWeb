let roles = [
    { Num: 1, id: "09101", nombre: "Administrador", descripcion: "Control total del sistema, gestión de usuarios, configuración y supervisión general." },
    { Num: 2, id: "09102", nombre: "Contador", descripcion: "Controla el stock, gestiona entradas y salidas, y supervisa reportes." },
    { Num: 3, id: "09103", nombre: "Gerente", descripcion: "Administra la facturación, controla costos, analiza finanzas y genera reportes contables." },
  ];
  
  let currentPage = 1;
  let itemsPerPage = 5;
  
  document.getElementById("itemsPerPage").addEventListener("change", function () {
    itemsPerPage = parseInt(this.value);
    currentPage = 1;
    renderRoles();
  });
  
  document.getElementById("search").addEventListener("input", searchRoles);
  
  function renderRoles() {
    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedRoles = roles.slice(start, end);
  
    paginatedRoles.forEach((role, index) => {
      const row = `<tr>
                <td>${role.Num}</td>
                <td>${role.id}</td>
                <td>${role.nombre}</td>
                <td>${role.descripcion}</td>
                <td class="d-flex gap-2">
                    <button class="btn btn-warning btn-sm" onclick="editRole(${start + index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="confirmDeleteRole(${start + index})"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>`;
      tableBody.innerHTML += row;
    });
    renderPagination();
  }
  
  function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    const totalPages = Math.ceil(roles.length / itemsPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.classList.add("page-item");
      if (i === currentPage) li.classList.add("active");
      li.innerHTML = `<button class="page-link">${i}</button>`;
      li.addEventListener("click", () => {
        currentPage = i;
        renderRoles();
      });
      pagination.appendChild(li);
    }
  }
  
  function editRole(index) {
    const role = roles[index];
    document.getElementById("editId").value = role.id;
    document.getElementById("editNombre").value = role.nombre;
    document.getElementById("editDescripsion").value = role.descripcion;
  
    document.getElementById("editUserForm").onsubmit = function (e) {
      e.preventDefault();
      roles[index] = {
        ...role,
        id: document.getElementById("editId").value,
        nombre: document.getElementById("editNombre").value,
        descripcion: document.getElementById("editDescripsion").value
      };
      renderRoles();
      bootstrap.Modal.getInstance(document.getElementById("editUserModal")).hide();
    };
    new bootstrap.Modal(document.getElementById("editUserModal")).show();
  }
  
  function confirmDeleteRole(index) {
    document.getElementById("confirmDeleteButton").onclick = function () {
      roles.splice(index, 1);
      renderRoles();
      bootstrap.Modal.getInstance(document.getElementById("deleteUserModal")).hide();
    };
    new bootstrap.Modal(document.getElementById("deleteUserModal")).show();
  }
  
  function searchRoles() {
    const query = document.getElementById("search").value.toLowerCase();
    const filtered = roles.filter(role =>
      Object.values(role).some(value => value.toString().toLowerCase().includes(query))
    );
    renderFilteredRoles(filtered);
  }
  
  function renderFilteredRoles(filtered) {
    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";
    filtered.forEach((role, index) => {
      const row = `<tr>
                <td>${role.Num}</td>
                <td>${role.id}</td>
                <td>${role.nombre}</td>
                <td>${role.descripcion}</td>
                <td class="d-flex gap-2">
                    <button class="btn btn-warning btn-sm" onclick="editRole(${index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="confirmDeleteRole(${index})"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>`;
      tableBody.innerHTML += row;
    });
  }
  
  document.addEventListener("DOMContentLoaded", renderRoles);
  
  document.getElementById("addUserForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const newRole = {
      Num: roles.length + 1,
      id: document.getElementById("addId").value,
      nombre: document.getElementById("addNombre").value,
      descripcion: document.getElementById("addDescripcion").value
    };
    roles.push(newRole);
    renderRoles();
    bootstrap.Modal.getInstance(document.getElementById("addUserModal")).hide();
    document.getElementById("addUserForm").reset();
  });
  
  function toggleMenu() {
    document.querySelector('.sidebar').classList.toggle('active');
  }
  
  function confirmarCerrarSesion() {
    return confirm('¿Estás seguro de que deseas cerrar sesión?');
  }
  