@extends('app')

@section('content')
    <div class="container">
        <h3>Nova Categoria</h3>

        @include('errors._check')

        {!! Form::open(['route'=>'admin.category.store']) !!}

        @include('admin.categories._form')

        <div class="form-group">
            {!! Form::submit('Criar categoria',['class'=>'btn btn-primary']) !!}
        </div>

        {!! Form::close() !!}
    </div>

@endsection()