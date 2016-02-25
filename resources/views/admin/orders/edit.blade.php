@extends('app')

@section('content')
    <div class="container">
        <h2>Pedido #{{$order->id}} - R$ {{$order->total}}</h2>

        <h3>Cliente: {{$order->client->user->name}}</h3>
        <h4>Data: {{$order->created_at}}</h4>

        <p><b>Entregar Em: </b><br>
            {{$order->client->address}} - {{$order->client->city}} -{{$order->client->state}} </p>

        {!! Form::model($order, ['route'=>['admin.orders.update', $order->id]]) !!}

        @include('admin.orders._form')

        <div class="form-group">
            {!! Form::submit('Salvar',['class'=>'btn btn-primary']) !!}
        </div>

        {!! Form::close() !!}
    </div>

@endsection()