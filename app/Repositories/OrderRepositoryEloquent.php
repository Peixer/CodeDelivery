<?php

namespace CodeDelivery\Repositories;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use CodeDelivery\Models\Order;

/**
 * Class OrderRepositoryEloquent
 * @package namespace CodeDelivery\Repositories;
 */
class OrderRepositoryEloquent extends BaseRepository implements OrderRepository
{
    protected $skipPresenter = true;

    public function getByDeliverymanAndId($id, $idDeliveryman, $deveTerParserResult)
    {
        $result = $this->model
            ->where('id', $id)
            ->where('user_deliveryman_id', $idDeliveryman)
            ->first();

        if ($result && $deveTerParserResult)
            return $this->parserResult($result);
        else if ($result)
            return $result;

        throw (new ModelNotFoundException())->setModel($this->model());
    }

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Order::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function presenter()
    {
        return \CodeDelivery\Presenters\OrderPresenter::class;
    }

    public function getByIdAndClient($id, $idClient, $deveTerParserResult)
    {
        $result = $this->model
            ->where('id', $id)
            ->where('client_id', $idClient)
            ->first();

        if ($result && $deveTerParserResult)
            return $this->parserResult($result);
        else if ($result)
            return $result;

        throw (new ModelNotFoundException())->setModel($this->model());
    }
}
