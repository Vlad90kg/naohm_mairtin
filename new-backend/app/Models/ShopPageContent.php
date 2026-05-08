<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShopPageContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'hero_eyebrow',
        'hero_title',
        'hero_highlight',
        'hero_description',
        'info_title',
        'info_description',
        'info_button_text',
        'info_button_link',
    ];

    public function shops(): HasMany
    {
        return $this->hasMany(ShopItem::class, 'page_content_id')->orderBy('order')->orderBy('id');
    }
}
