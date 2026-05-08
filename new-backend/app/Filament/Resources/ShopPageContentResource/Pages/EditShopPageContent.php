<?php

namespace App\Filament\Resources\ShopPageContentResource\Pages;

use App\Filament\Resources\ShopPageContentResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditShopPageContent extends EditRecord
{
    protected static string $resource = ShopPageContentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('openFrontend')
                ->label('Open Frontend Page')
                ->url('/shop', shouldOpenInNewTab: true),
        ];
    }

    protected function getSaveFormAction(): Actions\Action
    {
        return parent::getSaveFormAction()
            ->label('Save Shop Page Content');
    }
}
