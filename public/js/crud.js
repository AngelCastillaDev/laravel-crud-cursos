document.addEventListener('DOMContentLoaded', function() {
    const personTbody = document.getElementById('person-tbody');
    const paginationContainer = document.getElementById('pagination-container');  // Contenedor para los botones de paginación
    const createPersonButton = document.getElementById('create-person-button');
    const createPersonModal = document.getElementById('create-person-modal');
    const closeModalButton = document.getElementById('close-modal');
    const createPersonForm = document.getElementById('create-person-form');
    const personIdInput = document.getElementById('person-id');
    const modalTitle = document.getElementById('modal-title');
    const submitButton = document.getElementById('submit-button');
    
    let currentPage = 1;  // Página actual

    // Función para cargar la lista de personas
    function loadPersons(page = 1) {
        fetch(`https://8000-idx-crud-1739237235987.cluster-duylic2g3fbzerqpzxxbw6helm.cloudworkstations.dev/api/persons/paginated?page=${page}`)
            .then(response => response.json())
            .then(data => {
                personTbody.innerHTML = ''; // Limpiar el tbody
                if (Array.isArray(data.data) && data.data.length > 0) {
                    data.data.forEach(person => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td class="px-6 py-4 whitespace-nowrap text-gray-400 dark:text-gray-300">${person.first_name}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-gray-400 dark:text-gray-300">${person.last_name}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-gray-400 dark:text-gray-300">${person.email}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-gray-400 dark:text-gray-300">${person.cell_phone}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button class="text-green-600 hover:text-green-600 focus:outline-none edit-button" data-id="${person.id}">Editar</button>
                                <button class="text-red-600 hover:text-red-800 focus:outline-none ml-4 delete-button" data-id="${person.id}">Eliminar</button>
                            </td>
                        `;
                        personTbody.appendChild(tr);
                    });
                } else {
                    const tr = document.createElement('tr');
                    tr.innerHTML = '<td colspan="5" class="px-6 py-4 text-center text-gray-500">No hay personas registradas</td>';
                    personTbody.appendChild(tr);
                }

                // Mostrar los botones de paginación
                showPagination(data);
            })
            .catch(error => {
                console.error('Error fetching person data:', error);
            });
    }

    // Función para mostrar los botones de paginación
    function showPagination(data) {
        paginationContainer.innerHTML = '';  // Limpiar la paginación

        const prevPage = data.prev_page_url;
        const nextPage = data.next_page_url;
        const currentPage = data.current_page;
        const totalPages = data.last_page;

        // Botón "Anterior"
        if (prevPage) {
            const prevButton = document.createElement('button');
            prevButton.textContent = '« Anterior';
            prevButton.classList.add('pagination-button');
            prevButton.onclick = () => loadPersons(currentPage - 1);
            paginationContainer.appendChild(prevButton);
        }

        // Botones de páginas
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('pagination-button');
            if (i === currentPage) {
                pageButton.classList.add('active');  // Página actual
            }
            pageButton.onclick = () => loadPersons(i);
            paginationContainer.appendChild(pageButton);
        }

        // Botón "Siguiente"
        if (nextPage) {
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Siguiente »';
            nextButton.classList.add('pagination-button');
            nextButton.onclick = () => loadPersons(currentPage + 1);
            paginationContainer.appendChild(nextButton);
        }
    }

    // Cargar la lista de personas al inicio
    loadPersons();

    // Abrir el modal para crear una nueva persona
    createPersonButton.addEventListener('click', () => {
        createPersonModal.classList.remove('hidden');
        createPersonForm.reset(); // Limpiar el formulario al abrir
        personIdInput.value = ''; // Reiniciar el ID
        modalTitle.textContent = 'Crear Persona'; // Cambiar el título
        submitButton.textContent = 'Registrar'; // Cambiar el texto del botón
    });

    // Cerrar el modal
    closeModalButton.addEventListener('click', () => {
        createPersonModal.classList.add('hidden');
        createPersonForm.reset(); // Limpiar el formulario al cerrar
        personIdInput.value = ''; // Reiniciar el ID
    });

    // Manejar el envío del formulario
    createPersonForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto

        const formData = new FormData(createPersonForm);
        const data = Object.fromEntries(formData);

        if (data.id) {
            // Actualizar persona existente
            fetch(`https://8000-idx-crud-1739237235987.cluster-duylic2g3fbzerqpzxxbw6helm.cloudworkstations.dev/api/persons/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(() => {
                createPersonModal.classList.add('hidden'); // Cerrar el modal
                loadPersons(); // Actualizar la lista de personas
                createPersonForm.reset(); // Limpiar el formulario después de actualizar
            })
            .catch(error => {
                console.error('Error updating person:', error);
            });
        } else {
            // Crear nueva persona
            fetch('https://8000-idx-crud-1739237235987.cluster-duylic2g3fbzerqpzxxbw6helm.cloudworkstations.dev/api/persons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(() => {
                createPersonModal.classList.add('hidden'); // Cerrar el modal
                loadPersons(); // Actualizar la lista de personas
                createPersonForm.reset(); // Limpiar el formulario después de insertar
            })
            .catch(error => {
                console.error('Error creating person:', error);
            });
        }
    });

    // Editar persona
    personTbody.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-button')) {
            const personId = event.target.getAttribute('data-id');
            fetch(`https://8000-idx-crud-1739237235987.cluster-duylic2g3fbzerqpzxxbw6helm.cloudworkstations.dev/api/persons/${personId}`)
                .then(response => response.json())
                .then(person => {
                    // Rellenar el formulario con los datos de la persona
                    personIdInput.value = person.person.id; // Establecer el ID
                    createPersonForm.elements['first_name'].value = person.person.first_name;
                    createPersonForm.elements['last_name'].value = person.person.last_name;
                    createPersonForm.elements['email'].value = person.person.email;
                    createPersonForm.elements['cell_phone'].value = person.person.cell_phone;

                    // Cambiar el título y el texto del botón
                    modalTitle.textContent = 'Editar Persona';
                    submitButton.textContent = 'Editar';

                    createPersonModal.classList.remove('hidden'); // Abrir el modal
                })
                .catch(error => {
                    console.error('Error fetching person details:', error);
                });
        }

        // Eliminar persona
        if (event.target.classList.contains('delete-button')) {
            const personId = event.target.getAttribute('data-id');
            fetch(`https://8000-idx-crud-1739237235987.cluster-duylic2g3fbzerqpzxxbw6helm.cloudworkstations.dev/api/persons/${personId}`, {
                method: 'DELETE'
            })
            .then(() => {
                loadPersons(); // Actualizar la lista de personas después de eliminar
            })
            .catch(error => {
                console.error('Error deleting person:', error);
            });
        }
    });
});
