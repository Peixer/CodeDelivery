<?php

namespace CodeDelivery\Repositories;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use CodeDelivery\Models\Cupom;

/**
 * Class CupomRepositoryEloquent
 * @package namespace CodeDelivery\Repositories;
 */
class CupomRepositoryEloquent extends BaseRepository implements CupomRepository
{
    protected $skipPresenter = true;

    public function presenter()
    {
        return \CodeDelivery\Presenters\CupomPresenter::class;
    }

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Cupom::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function findByCode($code)
    {
        $result = $this->model->where('code', $code)->where('used', 0)->first();

        if ($result)
            return $this->parserResult($result);

        throw (new ModelNotFoundException)->setModel(get_class($this->model));
    }
}
