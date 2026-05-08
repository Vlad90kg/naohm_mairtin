<?php

namespace App\Models;

use App\Enums\EventCategory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'date',
        'time',
        'location',
        'category',
        'description',
        'image',
    ];

    protected $casts = [
        'date' => 'date',
        'category' => EventCategory::class,
    ];
}
