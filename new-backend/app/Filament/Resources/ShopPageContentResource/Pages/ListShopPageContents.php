<?php

namespace App\Filament\Resources\ShopPageContentResource\Pages;

use App\Filament\Resources\ShopPageContentResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListShopPageContents extends ListRecords
{
    protected static string $resource = ShopPageContentResource::class;

    protected function getHeaderActions(): array
    {
        return ShopPageContentResource::canCreate()
            ? [Actions\CreateAction::make()]
            : [];
    }
}
