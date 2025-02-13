<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\WithPagination;
use Illuminate\Support\Facades\Http;

class Person extends Component
{
    use WithPagination;

    public $perPage = 5; // Número de registros por página
    public $currentPage = 1; // Página actual
    public $lastPage; // Propiedad para almacenar la última página

    public function render()
    {
        // Consumir la API para obtener las personas paginadas
        $response = Http::get(url('/api/persons/paginated'), [
            'perPage' => $this->perPage,
            'page' => $this->currentPage, // Pasar la página actual a la API
        ]);

        $persons = collect($response->json()['data'] ?? []);
        $this->lastPage = $response->json()['last_page'] ?? 1; // Asignar la última página

        return view('livewire.person', [
            'persons' => $persons,
            'total' => $response->json()['total'] ?? 0,
        ]);
    }

    public function gotoPage($page)
    {
        if ($page > 0 && $page <= $this->lastPage) {
            $this->currentPage = $page; // Actualizar la página actual
            $this->render(); // Volver a renderizar el componente
        }
    }
}
