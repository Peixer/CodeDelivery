<?php

use Illuminate\Database\Seeder;

class CategoryTableSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(CodeDelivery\Models\Category::class, 10)->create()->each(function ($c) {
            for ($i = 0; $i <= 5; $i++) {
                $c->products()->save(factory(CodeDelivery\Models\Product::class)->make());
            }
        });
    }
}
