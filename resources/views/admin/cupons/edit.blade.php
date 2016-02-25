@extends('app')

@section('content')
    <div class="container">
        <h3>Editando Cupom: {{$cupom->code}}</h3>

        @include('errors._check')

        {!! Form::model($cupom, ['route'=>['admin.cupons.update',$cupom->id]]) !!}

        @include('admin.cupons._form')

        <div class="form-group">
            {!! Form::submit('Alterar cupom',['class'=>'btn btn-primary']) !!}
        </div>

        {!! Form::close() !!}
    </div>

@endsection()