@extends('app')

@section('content')
    <div class="container">
        <h3>Cupons</h3>

        <a href="{{route('admin.cupons.create')}}" class="btn btn-default">Novo Cupom</a>
        <br><br>

        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Id</th>
                <th>Código</th>
                <th>Valor</th>
                <th>Ação</th>
            </tr>
            </thead>
            <tbody>
            @foreach($cupons as $cupom)
                <tr>
                    <td>{{$cupom->id}}</td>
                    <td>{{$cupom->code}}</td>
                    <td>{{$cupom->value}}</td>
                    <td>
                        -
                    </td>
                </tr>
            @endforeach()
            </tbody>

        </table>

        {!!  $cupons->render() !!}
    </div>

@endsection()