<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use App\Models\User;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Auth;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->before(function (Actions\DeleteAction $action): void {
                    /** @var User $record */
                    $record = $this->getRecord();

                    if (Auth::id() !== $record->getKey()) {
                        return;
                    }

                    Notification::make()
                        ->title('You cannot delete your own account.')
                        ->danger()
                        ->send();

                    $action->cancel();
                }),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        /** @var User $record */
        $record = $this->getRecord();

        if ($data['is_super_admin'] ?? false) {
            $data['is_admin'] = true;
        }

        if ((Auth::id() === $record->getKey()) && array_key_exists('is_active', $data) && ! $data['is_active']) {
            Notification::make()
                ->title('You cannot deactivate your own account.')
                ->danger()
                ->send();

            $this->halt();
        }

        return $data;
    }
}
