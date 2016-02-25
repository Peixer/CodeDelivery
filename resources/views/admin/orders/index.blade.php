@extends('app')

@section('content')
    <div class="container">
        <h3>Pedidos</h3>

        <a href="{{route('admin.orders.create')}}" class="btn btn-default">Novo Pedido</a>
        <br><br>

        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Id</th>
                <th>Cliente</th>
                <th>Data</th>
                <th>Total</th>
                <th>Itens</th>
                <th>Entregador</th>
                <th>Status</th>
                <th>Ação</th>
            </tr>
            </thead>
            <tbody>
            @foreach($orders as $order)
                <tr>
                    <td>{{$order->id}}</td>
                    <td>
                        @if($order->client){{$order->client->user->name}}
                        @else
                            --
                        @endif
                    </td>
                    <td>{{$order->created_at}}</td>
                    <td>R$ {{$order->total}}</td>
                    <td>
                        <ul>
                            @foreach($order->orderItem as $item)
                                <li>{{$item->product->name}}</li>
                            @endforeach
                        </ul>
                    </td>
                    <td>

                        @if($order->deliveryman)
                            {{$order->deliveryman->name}}
                        @else
                            --
                        @endif
                    </td>
                    <td>{{$order->status}}</td>
                    <td>
                        <a href="{{ route('admin.orders.edit',['id' =>$order->id]) }}"
                           class="btn btn-default btn-sm">Editar</a>

                        <a href="{{ route('admin.orders.destroy',['id' =>$order->id]) }}"
                           class="btn btn-warning btn-sm">Destroy</a>
                    </td>
                </tr>
            @endforeach()
            </tbody>

        </table>

        {!!  $orders->render() !!}
    </div>

@endsection()