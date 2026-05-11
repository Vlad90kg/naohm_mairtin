<?php

namespace App\Filament\Resources\CommitteeSectionResource\Pages;

use App\Filament\Resources\CommitteeSectionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCommitteeSections extends ListRecords
{
    protected static string $resource = CommitteeSectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
