<?php

namespace CodeDelivery\Transformers;

use CodeDelivery\Models\OrderItem;
use League\Fractal\TransformerAbstract;

/**
 * Class OrderTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class OrderItemTransformer extends TransformerAbstract
{
    protected $defaultIncludes = ['product'];

    /**
     * Transform the \Order entity
     * @param \Order $model
     *
     * @return array
     */
    public function transform(OrderItem $model)
    {
        return [
            'id' => (int)$model->id,
            'product_id' => (int)$model->product_id,
            'qtd' => (int)$model->qtd,
            'price' => (float)$model->price,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }

    public function includeProduct(OrderItem $model)
    {
        return $this->item($model->product, new ProductTransformer());
    }
}
