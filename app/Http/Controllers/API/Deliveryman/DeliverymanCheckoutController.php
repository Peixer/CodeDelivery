<?php

namespace CodeDelivery\Http\Controllers\API\Deliveryman;

use CodeDelivery\Events\GetLocationDeliveryman;
use CodeDelivery\Models\Geo;
use CodeDelivery\Models\Order;
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
        OrderService $orderService)
    {
        $this->repository = $repository;
        $this->repository->skipPresenter(false);

        $this->userRepository = $userRepository;
        $this->orderService = $orderService;
    }

    public function index()
    {
        $id = Authorizer::getResourceOwnerId();
        $orders = $this->repository
            ->skipPresenter(false)
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
            ->getByDeliverymanAndId($id, $idUser, true);
    }

    public function updateStatus(Request $request, $id)
    {
        $idUser = Authorizer::getResourceOwnerId();

        return $this->orderService->updateStatus($id, $idUser, $request->get('status'));
    }

    public function geo(Request $request, Geo $geo, $id)
    {
        $idUser = Authorizer::getResourceOwnerId();
        $order = $this->repository->getByDeliverymanAndId($id, $idUser, false);

        $geo->lat = $request->get('lat');
        $geo->long = $request->get('long');

        event(new GetLocationDeliveryman($geo, $order));

        return $geo;
    }
}
