<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tareas extends Model
{
    use HasFactory;

    protected $table = 'tareas';

    protected $primaryKey = 'id_tarea';

    protected $fillable = [
        'titulo',
        'descripcion',
        'fecha_entrega',
        'estado',
        'id_categoria',
        'id_materia',
        'id_usuario'
    ];
}