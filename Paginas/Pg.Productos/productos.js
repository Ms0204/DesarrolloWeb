let productos = JSON.parse(localStorage.getItem('productos')) || [];
let currentPage = 1;
let itemsPerPage = 5;
const productTableBody = document.getElementById('userTableBody');
const pagination = document.getElementById('pagination');
const itemsPerPageSelect = document.getElementById('itemsPerPage');

// Renderizar tabla
function renderTable() {
    productTableBody.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = productos.slice(startIndex, endIndex);

    paginatedProducts.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>
                <div class="d-flex">
                    <button class="btn btn-primary btn-sm me-2" onclick="openEditModal('${producto.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct('${producto.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        productTableBody.appendChild(row);
    });
    renderPagination();
}

// Renderizar paginación
function renderPagination() {
    pagination.innerHTML = '';
    const totalPages = Math.ceil(productos.length / itemsPerPage);

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

// Agregar producto
function addProduct(event) {
    event.preventDefault();

    const newProduct = {
        id: document.getElementById('addId').value,
        nombre: document.getElementById('addNombre').value,
        cantidad: document.getElementById('addCantidad').value
    };

    productos.push(newProduct);
    localStorage.setItem('productos', JSON.stringify(productos));
    document.getElementById('addUserForm').reset();
    renderTable();
    const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
    modal.hide();
}

// Eliminar producto
function deleteProduct(id) {
    productos = productos.filter(producto => producto.id !== id);
    localStorage.setItem('productos', JSON.stringify(productos));
    renderTable();
}

// Abrir modal de edición
function openEditModal(id) {
    const producto = productos.find(producto => producto.id === id);

    document.getElementById('editId').value = producto.id;
    document.getElementById('editNombre').value = producto.nombre;
    document.getElementById('editCantidad').value = producto.cantidad;

    const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
    modal.show();
}

// Editar producto
function editProduct(event) {
    event.preventDefault();

    const id = document.getElementById('editId').value;
    const updatedProduct = {
        id,
        nombre: document.getElementById('editNombre').value,
        cantidad: document.getElementById('editCantidad').value
    };

    productos = productos.map(producto => (producto.id === id ? updatedProduct : producto));
    localStorage.setItem('productos', JSON.stringify(productos));
    renderTable();
    const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
    modal.hide();
}

// Búsqueda dinámica
document.getElementById('search').addEventListener('input', function () {
    const searchText = this.value.toLowerCase();

    const filteredProducts = productos.filter(producto =>
        Object.values(producto).some(value =>
            value.toLowerCase().includes(searchText)
        )
    );

    renderFilteredTable(filteredProducts);
});

function renderFilteredTable(filteredProducts) {
    productTableBody.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    paginatedProducts.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>
                <div class="d-flex">
                    <button class="btn btn-primary btn-sm me-2" onclick="openEditModal('${producto.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct('${producto.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        productTableBody.appendChild(row);
    });
    renderPagination();
}

// Inicializar eventos
renderTable();
document.getElementById('addUserForm').addEventListener('submit', addProduct);
document.getElementById('editUserForm').addEventListener('submit', editProduct);
function confirmarCerrarSesion() {
    return confirm('¿Estás seguro de que deseas cerrar sesión?');
}