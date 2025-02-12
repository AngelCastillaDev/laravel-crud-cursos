document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 1;
    const rowsPerPage = 5;
    const tbody = document.getElementById('person-tbody');
    const totalRows = tbody.rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    function updateTable() {
        // Muestra solo las filas correspondientes a la página actual
        for (let i = 0; i < totalRows; i++) {
            if (i >= (currentPage - 1) * rowsPerPage && i < currentPage * rowsPerPage) {
                tbody.rows[i].style.display = '';
            } else {
                tbody.rows[i].style.display = 'none';
            }
        }
        // Actualizar el número de página mostrado
        document.getElementById('page-number').textContent = `Página ${currentPage}`;
    }

    // Lógica para el botón "Anterior"
    document.getElementById('prev-page').addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            updateTable();
        }
    });

    // Lógica para el botón "Siguiente"
    document.getElementById('next-page').addEventListener('click', function () {
        if (currentPage < totalPages) {
            currentPage++;
            updateTable();
        }
    });

    // Inicializar la tabla al cargar la página
    updateTable();
});
