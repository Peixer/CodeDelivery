<?php

namespace CodeDelivery\Http\Controllers;

use CodeDelivery\Repositories\ClientRepository;
use CodeDelivery\Repositories\UserRepository;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Http\Requests\AdminOrderRequest;

class OrdersController extends Controller
{

    private $repository;
    private $userRepository;
    private $clientRepository;

    public function __construct(OrderRepository $repository,
                                UserRepository $userRepository,
                                ClientRepository $clientRepository)
    {
        $this->repository = $repository;
        $this->userRepository = $userRepository;
        $this->clientRepository = $clientRepository;
    }

    public function index()
    {
        $orders = $this->repository->paginate();

        return view('admin.orders.index', compact('orders'));
    }

    public function create()
    {
        $list_status = [0 => 'Pendente', 1 => 'A caminho', 2 => 'Entregue', 3 => 'Cancelado'];
        $deliveries = $this->userRepository->listsDelivery();
        $clients = $this->userRepository->listsClient();

        return view('admin.orders.create', compact('list_status', 'deliveries', 'clients'));
    }

    public function update(AdminOrderRequest $request, $id)
    {
        $data = $request->all();
        $this->repository->update($data, $id);

        return redirect()->route('admin.orders.index');
    }

    public function edit($id)
    {
        $order = $this->repository->find($id);

        $list_status = [0 => 'Pendente', 1 => 'A caminho', 2 => 'Entregue', 3 => 'Cancelado'];
        $deliveries = $this->userRepository->listsDelivery();

        return view('admin.orders.edit', compact('order', 'list_status', 'deliveries'));
    }

    public function store(AdminOrderRequest $request)
    {
        $data = $request->all();
        $this->repository->create($data);

        return redirect()->route('admin.orders.index');
    }

    public function destroy($id)
    {
        $this->repository->delete($id);

        return redirect()->route('admin.orders.index');
    }
}
