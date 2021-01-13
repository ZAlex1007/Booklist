<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('main');
});

Auth::routes();

Route::get('/', 'HomeController@index');

// Lists routes
Route::resource('lists', 'ListController');
Route::get('lists/show/{id}', 'ListController@show');
Route::post('/lists/store', 'ListController@store');
Route::put('/lists/{id}/update', 'ListController@update');
Route::delete('lists/{id}/delete', 'ListController@destroy');


// Books routes
Route::get('books/{listId}', 'BookController@index');
Route::put('books/{id}/update', 'BookController@update');
Route::post('books/store', 'BookController@store');
Route::delete('books/{id}/delete', 'BookController@destroy');

