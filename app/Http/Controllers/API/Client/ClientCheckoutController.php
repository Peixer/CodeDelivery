<?php

namespace CodeDelivery\Http\Controllers\API\Client;

use CodeDelivery\Models\Order;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\ProductRepository;
use CodeDelivery\Repositories\UserRepository;
use CodeDelivery\Services\OrderService;
use Illuminate\Http\Request;
use CodeDelivery\Http\Controllers\Controller;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class ClientCheckoutController extends Controller
{

    private $repository;
    private $userRepository;
    /**
     * @var OrderService
     */
    private $orderService;

    /**
     * @param OrderRepository $repository
     * @param UserRepository $userRepository
     * @param ProductRepository $productRepository
     */
    public function __construct(
        OrderRepository $repository,
        UserRepository $userRepository,
        OrderService $orderService)
    {
        $this->repository = $repository;
        $this->userRepository = $userRepository;
        $this->orderService = $orderService;
    }

    public function index()
    {
        $id = Authorizer::getResourceOwnerId();
        $clientId = $this->userRepository->find($id)->client->id;
        $orders = $this->repository
            ->skipPresenter(false)
            ->scopeQuery(function ($query) use ($clientId) {
                return $query->where('client_id', '=', $clientId);
            })->paginate();

        return $orders;
    }

    public function show($id)
    {
        $userId = Authorizer::getResourceOwnerId();
        $clientId = $this->userRepository->find($userId)->client->id;

        return $this->repository
            ->skipPresenter(false)
            ->getByIdAndClient($id, $clientId, true);
    }

    public function store(Request $request)
    {
        $id = Authorizer::getResourceOwnerId();
        $data = $request->all();
        $clientId = $this->userRepository->find($id)->client->id;
        $data['client_id'] = $clientId;

        $order = $this->orderService->create($data);

        return $this->repository
            ->skipPresenter(false)
            ->find($order->id);
    }
}
