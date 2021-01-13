<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ListModel extends Model
{
    protected $guarded = [];    // For axios to work
    protected $table = 'Lists';

    public function books(){
        return $this.hasMany('App\Book');
    }
}
