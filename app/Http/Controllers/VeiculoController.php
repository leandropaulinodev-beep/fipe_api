<?php

namespace App\Http\Controllers;

use App\Models\Veiculo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class VeiculoController extends Controller
{
    public function listarVeiculos($marca_id)
    {
        return Cache::remember("veiculos:marca:$marca_id", 3600, function() use ($marca_id) {
            return Veiculo::where('marca_id',$marca_id)->get();
        });
    }

    public function atualizarVeiculo(Request $req,$codigo)
    {
        $v = Veiculo::where('codigo',$codigo)->firstOrFail();
        $v->update($req->only('modelo','observacoes'));
        Cache::forget("veiculos:marca:{$v->marca_id}");
        return response()->json($v);
    }
}
