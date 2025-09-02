<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
    protected $fillable = ['nome','codigo'];

    public function veiculos() {
        return $this->hasMany(Veiculo::class);
    }
}
