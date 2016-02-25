@extends('app')

@section('content')
    <div class="container">
        <h3>Novo Pedido</h3>

        @include('errors._check')

        {!! Form::open(['route'=>'admin.orders.store']) !!}

        @include('admin.orders._form')

        <div class="form-group">
            {!! Form::label('Client','Cliente:') !!}
            {!! Form::select('client_id', $clients, null,['class'=>'form-control']) !!}
        </div>

        <div class="form-group">
            {!! Form::label('Total','Total:') !!}
            {!! Form::text('total', null,['class'=>'form-control']) !!}
        </div>

        <div class="form-group">
            {!! Form::submit('Criar pedido',['class'=>'btn btn-primary']) !!}
        </div>

        {!! Form::close() !!}
    </div>

@endsection()