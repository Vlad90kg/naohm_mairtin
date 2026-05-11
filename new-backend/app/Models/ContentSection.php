<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ContentSection extends Model
{
    protected $fillable = [
        'content_page_id',
        'title',
        'body',
        'image',
        'image_position',
        'layout_type',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function page(): BelongsTo
    {
        return $this->belongsTo(ContentPage::class, 'content_page_id');
    }

    public function galleryImages(): HasMany
    {
        return $this->hasMany(ContentSectionImage::class)->orderBy('order');
    }
}
