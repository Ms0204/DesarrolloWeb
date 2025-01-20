      // Variables globales
      let categorias = JSON.parse(localStorage.getItem('categorias')) || [];
      let currentPage = 1;
      let itemsPerPage = 5;
      const categoryTableBody = document.getElementById('userTableBody');
      const pagination = document.getElementById('pagination');
      const itemsPerPageSelect = document.getElementById('itemsPerPage');
    
      // Renderizar tabla
      function renderTable() {
        categoryTableBody.innerHTML = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedCategories = categorias.slice(startIndex, endIndex);
    
        paginatedCategories.forEach(category => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${category.id}</td>
            <td>${category.nombre}</td>
            <td>${category.descripcion}</td>
            <td>${category.idProducto}</td>
            <td>
              <div class="d-flex">
                <button class="btn btn-primary btn-sm me-2" onclick="openEditModal('${category.id}')">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteCategory('${category.id}')">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          `;
          categoryTableBody.appendChild(row);
        });
        renderPagination();
      }
    
      // Renderizar paginación
      function renderPagination() {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(categorias.length / itemsPerPage);
    
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
    
      // Agregar categoría
      function addCategory(event) {
        event.preventDefault();
    
        const newCategory = {
          id: document.getElementById('addId').value,
          nombre: document.getElementById('addNombre').value,
          descripcion: document.getElementById('addDescripcion').value,
          idProducto: document.getElementById('addIdProducto').value
        };
    
        categorias.push(newCategory);
        localStorage.setItem('categorias', JSON.stringify(categorias));
        document.getElementById('addUserForm').reset();
        renderTable();
        const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
        modal.hide();
      }
    
      // Eliminar categoría
      function deleteCategory(id) {
        categorias = categorias.filter(category => category.id !== id);
        localStorage.setItem('categorias', JSON.stringify(categorias));
        renderTable();
      }
    
      // Abrir modal de edición
      function openEditModal(id) {
        const category = categorias.find(category => category.id === id);
    
        document.getElementById('editId').value = category.id;
        document.getElementById('editNombre').value = category.nombre;
        document.getElementById('editDescripcion').value = category.descripcion;
        document.getElementById('editIdProducto').value = category.idProducto;
    
        const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
        modal.show();
      }
    
      // Editar categoría
      function editCategory(event) {
        event.preventDefault();
    
        const id = document.getElementById('editId').value;
        const updatedCategory = {
          id,
          nombre: document.getElementById('editNombre').value,
          descripcion: document.getElementById('editDescripcion').value,
          idProducto: document.getElementById('editIdProducto').value
        };
    
        categorias = categorias.map(category => (category.id === id ? updatedCategory : category));
        localStorage.setItem('categorias', JSON.stringify(categorias));
        renderTable();
        const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
        modal.hide();
      }
    
      // Búsqueda dinámica
      document.getElementById('search').addEventListener('input', function () {
        const searchText = this.value.toLowerCase();
    
        const filteredCategories = categorias.filter(category =>
          Object.values(category).some(value =>
            value.toLowerCase().includes(searchText)
          )
        );
    
        renderFilteredTable(filteredCategories);
      });
    
      function renderFilteredTable(filteredCategories) {
        categoryTableBody.innerHTML = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedCategories = filteredCategories.slice(startIndex, endIndex);
    
        paginatedCategories.forEach(category => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${category.id}</td>
            <td>${category.nombre}</td>
            <td>${category.descripcion}</td>
            <td>${category.idProducto}</td>
            <td>
              <div class="d-flex">
                <button class="btn btn-primary btn-sm me-2" onclick="openEditModal('${category.id}')">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteCategory('${category.id}')">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          `;
          categoryTableBody.appendChild(row);
        });
        renderPagination();
      }
    
      // Inicializar eventos
      renderTable();
      document.getElementById('addUserForm').addEventListener('submit', addCategory);
      document.getElementById('editUserForm').addEventListener('submit', editCategory);
      function confirmarCerrarSesion() {
        return confirm('¿Estás seguro de que deseas cerrar sesión?');
    }