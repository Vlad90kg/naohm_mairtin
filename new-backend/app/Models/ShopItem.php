<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_content_id',
        'name',
        'description',
        'detail',
        'url',
        'image',
        'is_logo',
        'cta',
        'is_placeholder',
        'order',
    ];

    protected $casts = [
        'is_logo' => 'boolean',
        'is_placeholder' => 'boolean',
        'order' => 'integer',
    ];
}
