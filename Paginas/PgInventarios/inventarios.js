let inventarios = JSON.parse(localStorage.getItem('inventarios')) || [];
let currentPage = 1;
let itemsPerPage = 5;
const inventoryTableBody = document.getElementById('userTableBody');
const pagination = document.getElementById('pagination');
const itemsPerPageSelect = document.getElementById('itemsPerPage');

// Renderizar tabla
function renderTable() {
  inventoryTableBody.innerHTML = '';
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInventories = inventarios.slice(startIndex, endIndex);

  paginatedInventories.forEach(inventario => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${inventario.codigo}</td>
      <td>${inventario.tipoMovimiento}</td>
      <td>${inventario.fechaRegistro}</td>
      <td>${inventario.cantidadProductos}</td>
      <td>${inventario.cedulaUsuario}</td>
      <td>
        <div class="d-flex">
          <button class="btn btn-primary btn-sm me-2" onclick="openEditModal('${inventario.codigo}')">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteInventory('${inventario.codigo}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    `;
    inventoryTableBody.appendChild(row);
  });
  renderPagination();
}

// Renderizar paginación
function renderPagination() {
  pagination.innerHTML = '';
  const totalPages = Math.ceil(inventarios.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.classList.add('page-item');
    if (i === currentPage) li.classList.add('active');
    li.innerHTML = `<a href="#" class="page-link" onclick="goToPage(${i})">${i}</a>`;
    pagination.appendChild(li);
  }
}

function goToPage(page) {
  currentPage = page;
  renderTable();
}

itemsPerPageSelect.addEventListener('change', function () {
  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  renderTable();
});

// Agregar inventario
function addInventory(event) {
  event.preventDefault();

  const newInventory = {
    codigo: document.getElementById('addCodigo').value,
    tipoMovimiento: document.getElementById('addTipoMovimiento').value,
    fechaRegistro: document.getElementById('addFechaRegistro').value,
    cantidadProductos: document.getElementById('addCantidadProductos').value,
    cedulaUsuario: document.getElementById('addCedulaUsuario').value
  };

  inventarios.push(newInventory);
  localStorage.setItem('inventarios', JSON.stringify(inventarios));
  document.getElementById('addUserForm').reset();
  renderTable();
  const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
  modal.hide();
}

// Eliminar inventario
function deleteInventory(codigo) {
  inventarios = inventarios.filter(inventario => inventario.codigo !== codigo);
  localStorage.setItem('inventarios', JSON.stringify(inventarios));
  renderTable();
}

// Abrir modal de edición
function openEditModal(codigo) {
  const inventario = inventarios.find(inventario => inventario.codigo === codigo);

  document.getElementById('editCodigo').value = inventario.codigo;
  document.getElementById('editTipoMovimiento').value = inventario.tipoMovimiento;
  document.getElementById('editFechaRegistro').value = inventario.fechaRegistro;
  document.getElementById('editCantidadProductos').value = inventario.cantidadProductos;
  document.getElementById('editCedulaUsuario').value = inventario.cedulaUsuario;

  const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
  modal.show();
}

// Editar inventario
function editInventory(event) {
  event.preventDefault();

  const codigo = document.getElementById('editCodigo').value;
  const updatedInventory = {
    codigo,
    tipoMovimiento: document.getElementById('editTipoMovimiento').value,
    fechaRegistro: document.getElementById('editFechaRegistro').value,
    cantidadProductos: document.getElementById('editCantidadProductos').value,
    cedulaUsuario: document.getElementById('editCedulaUsuario').value
  };

  inventarios = inventarios.map(inventario => (inventario.codigo === codigo ? updatedInventory : inventario));
  localStorage.setItem('inventarios', JSON.stringify(inventarios));
  renderTable();
  const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
  modal.hide();
}

// Búsqueda dinámica
document.getElementById('search').addEventListener('input', function () {
  const searchText = this.value.toLowerCase();

  const filteredInventories = inventarios.filter(inventario =>
    Object.values(inventario).some(value =>
      value.toLowerCase().includes(searchText)
    )
  );

  renderFilteredTable(filteredInventories);
});

function renderFilteredTable(filteredInventories) {
  inventoryTableBody.innerHTML = '';
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInventories = filteredInventories.slice(startIndex, endIndex);

  paginatedInventories.forEach(inventario => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${inventario.codigo}</td>
      <td>${inventario.tipoMovimiento}</td>
      <td>${inventario.fechaRegistro}</td>
      <td>${inventario.cantidadProductos}</td>
      <td>${inventario.cedulaUsuario}</td>
      <td>
        <div class="d-flex">
          <button class="btn btn-primary btn-sm me-2" onclick="openEditModal('${inventario.codigo}')">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteInventory('${inventario.codigo}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    `;
    inventoryTableBody.appendChild(row);
  });
  renderPagination();
}

// Inicializar eventos
    renderTable();
    document.getElementById('addUserForm').addEventListener('submit', addInventory);
    document.getElementById('editUserForm').addEventListener('submit', editInventory);
    function confirmarCerrarSesion() {
    return confirm('¿Estás seguro de que deseas cerrar sesión?');
}
//  Mensaje de Eliminacion
function deleteUser(codigo) {
    // Mostrar mensaje de confirmación
    const confirmDelete = confirm('¿Está seguro de que desea eliminar este usuario? Esta acción no se puede deshacer.');
    
    // Confirmacion eliminar
    if (confirmDelete) {
    users = users.filter(user => user.codigo !== codigo);
    localStorage.setItem('users', JSON.stringify(users));
    renderTable();
    alert('El usuario ha sido eliminado correctamente.');
    } else {
    alert('La acción de eliminar fue cancelada.');
    }
    }