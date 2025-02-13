<div class="p-2 lg:p-8 bg-white dark:bg-gray-800 dark:bg-gradient-to-bl dark:from-gray-700/50 dark:via-transparent border-b border-gray-200 dark:border-gray-700">
    <div class="mt-4 text-2xl">
        <div class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Listado de Personas</div>
        <div class="mt-3">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Apellido</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Correo Electrónico</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Número de Celular</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($persons as $person)
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap text-gray-400 dark:text-gray-300">{{ $person['first_name'] }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-gray-400 dark:text-gray-300">{{ $person['last_name'] }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-gray-400 dark:text-gray-300">{{ $person['email'] }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-gray-400 dark:text-gray-300">{{ $person['cell_phone'] }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button class="text-green-600 hover:text-green-600 focus:outline-none edit-button">Editar</button>
                                <button class="text-red-600 hover:text-red-800 focus:outline-none ml-4 delete-button">Eliminar</button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <!-- Paginación -->
            <div class="mt-4">
    <div class="flex justify-between mt-4">    
       <div class="flex items-center">
            @for($i = 1; $i <= $lastPage; $i++)
                <button wire:click="gotoPage({{ $i }})" class="mx-1 px-3 py-1 rounded-lg 
                    @if($currentPage == $i) bg-blue-600 text-white @else bg-gray-200 text-gray-700 hover:bg-gray-300 @endif">
                    {{ $i }}
                </button>
            @endfor
        </div>
    </div>
</div>

        </div>
    </div>
</div>
