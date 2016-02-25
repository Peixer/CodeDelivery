<?php

use Illuminate\Database\Seeder;

class OrderTableSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(CodeDelivery\Models\Order::class, 10)->create()->each(function ($o) {
            for ($i = 0; $i <= 2; $i++) {
                $o->orderItem()->save(factory(CodeDelivery\Models\OrderItem::class)->make(
                    ['product_id' => rand(1, 5), 'qtd' => 2, 'price' => rand(1, 50)]));
            }
        });
    }
}
