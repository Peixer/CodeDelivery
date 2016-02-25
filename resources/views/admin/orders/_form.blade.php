<div class="form-group">
    {!! Form::label('Status','Status:') !!}
    {!! Form::select('status', $list_status, null,['class'=>'form-control']) !!}
</div>

<div class="form-group">
    {!! Form::label('Delivery','Entregador:') !!}
    {!! Form::select('user_deliveryman_id', $deliveries, null,['class'=>'form-control']) !!}
</div>
