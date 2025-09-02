<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Veiculo extends Model
{
    protected $fillable = ['codigo','marca_id','modelo','observacoes'];

    public function marca() {
        return $this->belongsTo(Marca::class);
    }
}
