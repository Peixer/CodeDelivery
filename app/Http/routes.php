<?php
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('home', ['as' => 'home', function () {
    return view('app');
}]);

Route::group(['prefix' => 'admin', 'middleware' => 'auth.checkrole:admin', 'as' => 'admin.'], function () {
    Route::get('category', ['as' => 'category.index', 'uses' => 'CategoriesController@index']);
    Route::get('category/create', ['as' => 'category.create', 'uses' => 'CategoriesController@create']);
    Route::post('category/store', ['as' => 'category.store', 'uses' => 'CategoriesController@store']);
    Route::get('category/edit/{id}', ['as' => 'category.edit', 'uses' => 'CategoriesController@edit']);
    Route::post('category/update/{id}', ['as' => 'category.update', 'uses' => 'CategoriesController@update']);

    Route::get('products', ['as' => 'products.index', 'uses' => 'ProductsController@index']);
    Route::get('products/create', ['as' => 'products.create', 'uses' => 'ProductsController@create']);
    Route::post('products/store', ['as' => 'products.store', 'uses' => 'ProductsController@store']);
    Route::get('products/edit/{id}', ['as' => 'products.edit', 'uses' => 'ProductsController@edit']);
    Route::post('products/update/{id}', ['as' => 'products.update', 'uses' => 'ProductsController@update']);
    Route::get('products/destroy/{id}', ['as' => 'products.destroy', 'uses' => 'ProductsController@destroy']);

    Route::get('clients', ['as' => 'clients.index', 'uses' => 'ClientsController@index']);
    Route::get('clients/create', ['as' => 'clients.create', 'uses' => 'ClientsController@create']);
    Route::post('clients/store', ['as' => 'clients.store', 'uses' => 'ClientsController@store']);
    Route::get('clients/edit/{id}', ['as' => 'clients.edit', 'uses' => 'ClientsController@edit']);
    Route::post('clients/update/{id}', ['as' => 'clients.update', 'uses' => 'ClientsController@update']);
    Route::get('clients/destroy/{id}', ['as' => 'clients.destroy', 'uses' => 'ClientsController@destroy']);

    Route::get('orders', ['as' => 'orders.index', 'uses' => 'OrdersController@index']);
    Route::get('orders/create', ['as' => 'orders.create', 'uses' => 'OrdersController@create']);
    Route::post('orders/store', ['as' => 'orders.store', 'uses' => 'OrdersController@store']);
    Route::get('orders/edit/{id}', ['as' => 'orders.edit', 'uses' => 'OrdersController@edit']);
    Route::post('orders/update/{id}', ['as' => 'orders.update', 'uses' => 'OrdersController@update']);
    Route::get('orders/destroy/{id}', ['as' => 'orders.destroy', 'uses' => 'OrdersController@destroy']);

    Route::get('cupons', ['as' => 'cupons.index', 'uses' => 'CuponsController@index']);
    Route::get('cupons/create', ['as' => 'cupons.create', 'uses' => 'CuponsController@create']);
    Route::post('cupons/store', ['as' => 'cupons.store', 'uses' => 'CuponsController@store']);
    Route::get('cupons/edit/{id}', ['as' => 'cupons.edit', 'uses' => 'CuponsController@edit']);
    Route::post('cupons/update/{id}', ['as' => 'cupons.update', 'uses' => 'CuponsController@update']);
});

Route::group(['prefix' => 'customer', 'middleware' => 'auth.checkrole:client', 'as' => 'customer.'], function () {
    Route::get('order', ['as' => 'order.index', 'uses' => 'CheckoutController@index']);
    Route::get('order/create', ['as' => 'order.create', 'uses' => 'CheckoutController@create']);
    Route::post('order/store', ['as' => 'order.store', 'uses' => 'CheckoutController@store']);
});

Route::group(['middleware' => 'cors'], function () {

    Route::post('oauth/access_token', function () {
        return Response::json(Authorizer::issueAccessToken());
    });

    Route::group(['prefix' => 'api', 'middleware' => 'oauth', 'as' => 'api.'], function () {

        Route::get('authenticated', 'API\UserController@authenticated');
        Route::patch('device_token', 'API\UserController@updateDeviceToken');
        Route::get('cupom/{code}', 'API\CupomController@show');

        Route::group(['prefix' => 'client', 'middleware' => 'oauth.checkrole:client', 'as' => 'client.'], function () {
            Route::resource('order', 'API\Client\ClientCheckoutController', [
                'except' => ['create', 'edit', 'destroy']
            ]);

            Route::resource('products', 'API\Client\ClientProductController');
        });

        Route::group(['prefix' => 'deliveryman', 'middleware' => 'oauth.checkrole:delivery', 'as' => 'deliveryman.'], function () {
            Route::resource('order', 'API\Deliveryman\DeliverymanCheckoutController', [
                'except' => ['create', 'edit', 'destroy', 'store']
            ]);

            Route::patch('order/{id}/update-status', [
                'uses' => 'API\Deliveryman\DeliverymanCheckoutController@updateStatus',
                'as' => 'orders.update']);

            Route::post('order/{id}/geo', [
                'as' => 'orders.geo',
                'uses' => 'API\Deliveryman\DeliverymanCheckoutController@geo'
            ]);

        });
    });
});
