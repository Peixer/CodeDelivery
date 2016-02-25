<?php

namespace CodeDelivery\Transformers;

use CodeDelivery\Models\Client;
use CodeDelivery\Models\Cupom;
use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\Order;

/**
 * Class OrderTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class ClientTransformer extends TransformerAbstract
{

    /**
     * Transform the \Order entity
     * @param \Order $model
     *
     * @return array
     */
    public function transform(Client $model)
    {
        return [
            'id' => (int)$model->id,
            'address' => $model->address,
            'city' => $model->city,
            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
