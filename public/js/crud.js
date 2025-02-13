document.addEventListener('DOMContentLoaded', function() {
    const personTbody = document.getElementById('person-tbody');
    const createPersonButton = document.getElementById('create-person-button');
    const createPersonModal = document.getElementById('create-person-modal');
    const closeModalButton = document.getElementById('close-modal');
    const createPersonForm = document.getElementById('create-person-form');
    const personIdInput = document.getElementById('person-id');
    const modalTitle = document.getElementById('modal-title');
    const submitButton = document.getElementById('submit-button');

    // Función para cargar la lista de personas
    function loadPersons() {
        fetch('https://8000-idx-crud-1739237235987.cluster-duylic2g3fbzerqpzxxbw6helm.cloudworkstations.dev/api/persons')
            .then(response => response.json())
            .then(data => {
                personTbody.innerHTML = ''; // Limpiar el tbody
                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(person => {
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
            })
            .catch(error => {
                console.error('Error fetching person data:', error);
            });
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
                    personIdInput.value = person.id; // Establecer el ID
                    createPersonForm.elements['first_name'].value = person.first_name;
                    createPersonForm.elements['last_name'].value = person.last_name;
                    createPersonForm.elements['email'].value = person.email;
                    createPersonForm.elements['cell_phone'].value = person.cell_phone;

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

    // Exportar a Excel
    document.getElementById('export-excel-button').addEventListener('click', () => {
        const rows = [];
        const headers = ["Nombre", "Apellido", "Correo Electrónico", "Número de Celular"];
        rows.push(headers);

        const personRows = Array.from(personTbody.querySelectorAll('tr')).map(tr => {
            const cells = tr.querySelectorAll('td');
            return Array.from(cells).slice(0, 4).map(td => td.textContent);
        });

        rows.push(...personRows);

        const ws = XLSX.utils.aoa_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Personas");

        // Exportar el archivo
        XLSX.writeFile(wb, "personas.xlsx");
    });
});