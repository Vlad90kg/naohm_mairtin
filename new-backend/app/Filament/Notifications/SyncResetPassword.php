<?php

namespace App\Filament\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as BaseNotification;

class SyncResetPassword extends BaseNotification
{
    public string $url;

    protected function resetUrl($notifiable): string
    {
        return $this->url;
    }
}
