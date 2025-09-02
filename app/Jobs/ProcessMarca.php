<?php

namespace App\Jobs;

use App\Models\Marca;
use App\Models\Veiculo;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class ProcessMarca implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $marca;

    public function __construct($marca) {
        $this->marca = $marca;
    }

    public function handle()
    {
        $res = Http::get("https://parallelum.com.br/fipe/api/v1/carros/marcas/{$this->marca['codigo']}/modelos");
        $modelos = $res->json()['modelos'] ?? [];

        $marcaModel = Marca::firstOrCreate([
            'codigo'=>$this->marca['codigo'],
            'nome'=>$this->marca['nome']
        ]);

        foreach($modelos as $m) {
            Veiculo::updateOrCreate(
                ['codigo'=>$m['codigo']],
                ['marca_id'=>$marcaModel->id,'modelo'=>$m['nome']]
            );
        }
    }
}
