        // Variables globales
        let pagos = JSON.parse(localStorage.getItem('pagos')) || [];
        let currentPage = 1;
        let itemsPerPage = 5;
        const paymentTableBody = document.getElementById('userTableBody');
        const pagination = document.getElementById('pagination');
        const itemsPerPageSelect = document.getElementById('itemsPerPage');
  
        // Renderizar tabla
        function renderTable() {
          paymentTableBody.innerHTML = '';
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const paginatedPayments = pagos.slice(startIndex, endIndex);
  
          paginatedPayments.forEach(pago => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${pago.id}</td>
              <td>${pago.numeroPago}</td>
              <td>${pago.metodoPago}</td>
              <td>${pago.cantidad}</td>
              <td>${pago.fechaPago}</td>
              <td>${pago.cedulaUsuario}</td>
              <td>
                <div class="d-flex">
                  <button class="btn btn-primary btn-sm me-2" onclick="openEditModal('${pago.id}')">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-danger btn-sm" onclick="deletePayment('${pago.id}')">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            `;
            paymentTableBody.appendChild(row);
          });
          renderPagination();
        }
  
        // Renderizar paginación
        function renderPagination() {
          pagination.innerHTML = '';
          const totalPages = Math.ceil(pagos.length / itemsPerPage);
  
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
  
        // Agregar pago
        function addPayment(event) {
          event.preventDefault();
  
          const newPayment = {
            id: document.getElementById('addId').value,
            numeroPago: document.getElementById('addNumeroPago').value,
            metodoPago: document.getElementById('addMetodoPago').value,
            cantidad: document.getElementById('addCantidad').value,
            fechaPago: document.getElementById('addFechaPago').value,
            cedulaUsuario: document.getElementById('addCedulaUsuario').value
          };
  
          pagos.push(newPayment);
          localStorage.setItem('pagos', JSON.stringify(pagos));
          document.getElementById('addUserForm').reset();
          renderTable();
          const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
          modal.hide();
        }
  
        // Eliminar pago
        function deletePayment(id) {
          pagos = pagos.filter(pago => pago.id !== id);
          localStorage.setItem('pagos', JSON.stringify(pagos));
          renderTable();
        }
  
        // Abrir modal de edición
        function openEditModal(id) {
          const pago = pagos.find(pago => pago.id === id);
  
          document.getElementById('editId').value = pago.id;
          document.getElementById('editNumeroPago').value = pago.numeroPago;
          document.getElementById('editMetodoPago').value = pago.metodoPago;
          document.getElementById('editCantidad').value = pago.cantidad;
          document.getElementById('editFechaPago').value = pago.fechaPago;
          document.getElementById('editCedulaUsuario').value = pago.cedulaUsuario;
  
          const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
          modal.show();
        }
  
        // Editar pago
        function editPayment(event) {
          event.preventDefault();
  
          const id = document.getElementById('editId').value;
          const updatedPayment = {
            id,
            numeroPago: document.getElementById('editNumeroPago').value,
            metodoPago: document.getElementById('editMetodoPago').value,
            cantidad: document.getElementById('editCantidad').value,
            fechaPago: document.getElementById('editFechaPago').value,
            cedulaUsuario: document.getElementById('editCedulaUsuario').value
          };
  
          pagos = pagos.map(pago => (pago.id === id ? updatedPayment : pago));
          localStorage.setItem('pagos', JSON.stringify(pagos));
          renderTable();
          const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
          modal.hide();
        }
  
        // Búsqueda dinámica
        document.getElementById('search').addEventListener('input', function () {
          const searchText = this.value.toLowerCase();
  
          const filteredPayments = pagos.filter(pago =>
            Object.values(pago).some(value =>
              value.toLowerCase().includes(searchText)
            )
          );
  
          renderFilteredTable(filteredPayments);
        });
  
        function renderFilteredTable(filteredPayments) {
          paymentTableBody.innerHTML = '';
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const paginatedPayments = filteredPayments.slice(startIndex, endIndex);
  
          paginatedPayments.forEach(pago => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${pago.id}</td>
              <td>${pago.numeroPago}</td>
              <td>${pago.metodoPago}</td>
              <td>${pago.cantidad}</td>
              <td>${pago.fechaPago}</td>
              <td>${pago.cedulaUsuario}</td>
              <td>
                <div class="d-flex">
                  <button class="btn btn-primary btn-sm me-2" onclick="openEditModal('${pago.id}')">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-danger btn-sm" onclick="deletePayment('${pago.id}')">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            `;
            paymentTableBody.appendChild(row);
          });
          renderPagination();
        }
  
        // Inicializar eventos
        renderTable();
            document.getElementById('addUserForm').addEventListener('submit', addPayment);
            document.getElementById('editUserForm').addEventListener('submit', editPayment);
            function confirmarCerrarSesion() {
            return confirm('¿Estás seguro de que deseas cerrar sesión?');
        }