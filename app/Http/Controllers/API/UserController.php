<?php

namespace CodeDelivery\Http\Controllers\API;

use CodeDelivery\Repositories\UserRepository;
use Illuminate\Http\Request;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;
use CodeDelivery\Http\Controllers\Controller;


class UserController extends Controller
{
    private $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function authenticated()
    {
        $id = Authorizer::getResourceOwnerId();

        return $this->repository->skipPresenter(false)->find($id);
    }

    public function updateDeviceToken(Request $request)
    {
        $id = Authorizer::getResourceOwnerId();
        $deviceToken = $request->get('device_token');

        return $this->repository->updateDeviceToken($id, $deviceToken);
    }
}
