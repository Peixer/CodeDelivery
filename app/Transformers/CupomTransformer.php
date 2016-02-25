<?php

namespace CodeDelivery\Transformers;

use CodeDelivery\Models\Cupom;
use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\Order;

/**
 * Class OrderTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class CupomTransformer extends TransformerAbstract
{

    /**
     * Transform the \Order entity
     * @param \Order $model
     *
     * @return array
     */
    public function transform(Cupom $model)
    {
        return [
            'id' => (int)$model->id,
            'code' => $model->code,
            'value' => (float)$model->value,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
