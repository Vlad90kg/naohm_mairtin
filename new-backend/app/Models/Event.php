<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'date',
        'time',
        'end_time',
        'location',
        'description',
        'image',
        'is_featured',
    ];

    protected $casts = [
        'date' => 'date',
        'is_featured' => 'boolean',
    ];
}
