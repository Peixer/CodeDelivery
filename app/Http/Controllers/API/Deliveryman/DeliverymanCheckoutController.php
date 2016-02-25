<?php

namespace CodeDelivery\Http\Controllers\API\Deliveryman;

use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\ProductRepository;
use CodeDelivery\Repositories\UserRepository;
use CodeDelivery\Services\OrderService;
use CodeDelivery\Http\Controllers\Controller;
use Illuminate\Http\Request;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class DeliverymanCheckoutController extends Controller
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
        ProductRepository $productRepository,
        OrderService $orderService)
    {
        $this->repository = $repository;
        $this->repository->skipPresenter(false);
        $this->userRepository = $userRepository;
        $this->orderService = $orderService;
    }

    private $with = ['client', 'cupom', 'orderItem'];

    public function index()
    {
        $id = Authorizer::getResourceOwnerId();
        $orders = $this->repository
            ->skipPresenter(false)
            ->with($this->with)
            ->scopeQuery(function ($query) use ($id) {
                return $query->where('user_deliveryman_id', '=', $id);
            })->paginate();

        return $orders;
    }

    public function show($id)
    {
        $idUser = Authorizer::getResourceOwnerId();
        return $this->repository
            ->skipPresenter(false)
            ->getByDeliverymanAndId($id, $idUser);
    }

    public function updateStatus(Request $request, $id)
    {
        $idUser = Authorizer::getResourceOwnerId();
        $order = $this->orderService->updateStatus($id, $idUser, $request->get('status'));

        if ($order)
            return $order->repository->find($order->id);

        abort(400, "Order não encontrado");
    }
}
