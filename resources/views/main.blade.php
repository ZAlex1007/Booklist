@extends('layouts.app')

@section('content')
    <main-app user_id={{Auth::user()->id}}></main-app>
@endsection

