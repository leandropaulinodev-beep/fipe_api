<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessMarca;
use App\Models\Marca;
use Illuminate\Support\Facades\Http;

class FipeController extends Controller
{
    public function cargaInicial()
    {
        $marcas = Http::get('https://parallelum.com.br/fipe/api/v1/carros/marcas')->json();
        foreach($marcas as $marca) ProcessMarca::dispatch($marca);
        return response()->json(['msg'=>'Carga inicial enviada para fila']);
    }

    public function listarMarcas() {
        return Marca::all();
    }
}
