<?php

namespace CodeDelivery\Transformers;

use Illuminate\Database\Eloquent\Collection;
use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\Order;

/**
 * Class OrderTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class OrderTransformer extends TransformerAbstract
{
    protected $availableIncludes = ['cupom', 'items', 'client'];

    /**
     * Transform the \Order entity
     * @param \Order $model
     *
     * @return array
     */
    public function transform(Order $model)
    {
        return [
            'id' => (int)$model->id,
            'total' => (float)$model->total,
            'product_names' => $this->getArrayProductNames($model->orderItem),
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at,
            'status' => $model->status,
            'hash' => $model->hash
        ];
    }

    protected function getArrayProductNames(\Illuminate\Database\Eloquent\Collection $items)
    {
        $names = [];
        foreach ($items as $item) {
            $names[] = $item->product->name;
        }

        return $names;
    }

    // Many to one -> Cupom
    // One to many -> Item

    public function includeCupom(Order $model)
    {
        if (!$model->cupom)
            return null;

        return $this->item($model->cupom, new CupomTransformer());
    }

    public function includeItems(Order $model)
    {
        if (!$model->orderItem)
            return null;

        return $this->collection($model->orderItem, new OrderItemTransformer());
    }

    public function includeClient(Order $model)
    {
        return $this->item($model->client, new ClientTransformer());
    }
}
