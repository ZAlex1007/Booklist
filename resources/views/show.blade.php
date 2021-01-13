@extends('layouts.app')

@section('content')
    <main-books user_id={{Auth::user()->id}} list_s={{ $list }} ref="booksRef" source="blade"></main-books>
@endsection