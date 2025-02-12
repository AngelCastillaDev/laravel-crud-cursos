<?php

return [

    /*
    |----------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |----------------------------------------------------------------------
    |
    | Aquí puedes configurar tus ajustes para compartir recursos entre orígenes
    | o "CORS". Esto determina qué operaciones de origen cruzado pueden ejecutarse
    | en los navegadores web. Puedes ajustar estos ajustes según sea necesario.
    |
    | Para aprender más: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Se aplica CORS a rutas API y CSRF cookies de Sanctum

    'allowed_methods' => ['*'], // Permite cualquier método HTTP (GET, POST, PUT, DELETE, etc.)

    'allowed_origins' => ['*'], // Permite cualquier origen (dominio)

    'allowed_origins_patterns' => [], // No se usan patrones de orígenes

    'allowed_headers' => ['*'], // Permite cualquier cabecera en la solicitud

    'exposed_headers' => [], // No se exponen cabeceras adicionales

    'max_age' => 0, // No especifica un tiempo de cache para el navegador

    'supports_credentials' => false, // No se permiten credenciales (cookies, autenticación, etc.)

];
