<?php

namespace CodeDelivery\Http\Controllers\API\Client;

use CodeDelivery\Repositories\ProductRepository;
use CodeDelivery\Http\Controllers\Controller;

class ClientProductController extends Controller
{
    private $repository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->repository = $productRepository;
    }

    public function index()
    {
        return $this->repository->skipPresenter(false)->all();
    }
}
