    // Variables globales
    let reportes = JSON.parse(localStorage.getItem('reportes')) || [];
    let currentPage = 1;
    let itemsPerPage = 5;
    const reportTableBody = document.getElementById('userTableBody');
    const pagination = document.getElementById('pagination');
    const itemsPerPageSelect = document.getElementById('itemsPerPage');

    // Renderizar tabla
    function renderTable() {
      reportTableBody.innerHTML = '';
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedReports = reportes.slice(startIndex, endIndex);

      paginatedReports.forEach(reporte => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reporte.id}</td>
            <td>${reporte.tituloReporte}</td>
            <td>${reporte.descripcion}</td>
            <td>${reporte.fechaEmision}</td>
            <td>
              <div class="d-flex">
                <button class="btn btn-primary btn-sm me-2" onclick="openEditModal('${reporte.id}')">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteReport('${reporte.id}')">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          `;
          reportTableBody.appendChild(row);
        });
        renderPagination();
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

    // Agregar reporte
    function addReport(event) {
      event.preventDefault();

      const newReport = {
        id: document.getElementById('addId').value,
        tituloReporte: document.getElementById('addTituloReporte').value,
        descripcion: document.getElementById('addDescripcion').value,
        fechaEmision: document.getElementById('addFechaEmision').value,
      };

      reportes.push(newReport);
      localStorage.setItem('reportes', JSON.stringify(reportes));
      document.getElementById('addUserForm').reset();
      renderTable();
      const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
      modal.hide();
    }

    // Eliminar reporte
    function deleteReport(id) {
      reportes = reportes.filter(reporte => reporte.id !== id);
      localStorage.setItem('reportes', JSON.stringify(reportes));
      renderTable();
    }

    // Abrir modal de edición
    function openEditModal(id) {
      const reporte = reportes.find(reporte => reporte.id === id);

      document.getElementById('editId').value = reporte.id;
      document.getElementById('editTituloReporte').value = reporte.tituloReporte;
      document.getElementById('editDescripcion').value = reporte.descripcion;
      document.getElementById('editFechaEmision').value = reporte.fechaEmision;

      const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
      modal.show();
    }

    // Editar reporte
    function editReport(event) {
      event.preventDefault();

      const id = document.getElementById('editId').value;
      const updatedReport = {
        id,
        tituloReporte: document.getElementById('editTituloReporte').value,
        descripcion: document.getElementById('editDescripcion').value,
        fechaEmision: document.getElementById('editFechaEmision').value,
      };

      reportes = reportes.map(reporte => (reporte.id === id ? updatedReport : reporte));
      localStorage.setItem('reportes', JSON.stringify(reportes));
      renderTable();
      const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
      modal.hide();
    }

    // Búsqueda dinámica
    document.getElementById('search').addEventListener('input', function () {
      const searchText = this.value.toLowerCase();

      const filteredReports = reportes.filter(reporte =>
        Object.values(reporte).some(value =>
          value.toLowerCase().includes(searchText)
        )
      );

      renderFilteredTable(filteredReports);
    });

    function renderFilteredTable(filteredReports) {
      reportTableBody.innerHTML = '';
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedReports = filteredReports.slice(startIndex, endIndex);

      paginatedReports.forEach(reporte => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${reporte.id}</td>
          <td>${reporte.tituloReporte}</td>
          <td>${reporte.descripcion}</td>
          <td>${reporte.fechaEmision}</td>
          <td>
            <div class="d-flex">
              <button class="btn btn-primary btn-sm me-2" onclick="openEditModal('${reporte.id}')">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteReport('${reporte.id}')">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        `;
        reportTableBody.appendChild(row);
      });
      renderPagination();
    }

    // Inicializar eventos
    renderTable();
    document.getElementById('addUserForm').addEventListener('submit', addReport);
    document.getElementById('editUserForm').addEventListener('submit', editReport);
    function confirmarCerrarSesion() {
        return confirm('¿Estás seguro de que deseas cerrar sesión?');
    }