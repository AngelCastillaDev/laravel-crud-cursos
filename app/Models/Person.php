<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Person extends Model
{
    use HasFactory;

    protected $table = 'person';

    protected $fillable = ['first_name', 'last_name', 'email', 'cell_phone'];

    public $timestamps = false;

    public $incrementing = false; // Evita que Laravel use autoincremento
    protected $keyType = 'string'; // Define el ID como string

    // Generar UUID automáticamente al crear un nuevo registro
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = (string) Str::uuid(); 
        });
    }
}
