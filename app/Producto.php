<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table='producto';

    protected $fillable=['id','titulo', 'descripcion', 'precio', 'cantidad' ];

    //guardar datos sin el created_at
    public $timestamps=false;
}
