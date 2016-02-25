<?php

namespace CodeDelivery\Http\Controllers\API;

use CodeDelivery\Repositories\CupomRepository;
use CodeDelivery\Http\Controllers\Controller;

class CupomController extends Controller
{
    private $repository;

    public function __construct(CupomRepository $cupomRepository)
    {
        $this->repository = $cupomRepository;
    }

    public function show($code)
    {
        return $this->repository->skipPresenter(false)->findByCode($code);
    }
}
