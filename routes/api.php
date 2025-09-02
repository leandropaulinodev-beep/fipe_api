<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FipeController;
use App\Http\Controllers\VeiculoController;

Route::post('/fipe/carga-inicial', [FipeController::class, 'cargaInicial']);
Route::get('/fipe/marcas', [FipeController::class, 'listarMarcas']);
Route::get('/fipe/veiculos/{marca_id}', [VeiculoController::class, 'listarVeiculos']);
Route::put('/fipe/veiculos/{codigo}', [VeiculoController::class, 'atualizarVeiculo']);
