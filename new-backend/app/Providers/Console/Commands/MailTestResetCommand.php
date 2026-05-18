<?php

namespace App\Console\Commands;

use App\Models\User;
use Filament\Facades\Filament;
use Illuminate\Console\Command;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class MailTestResetCommand extends Command
{
    protected $signature = 'mail:test-reset
        {email : Email address of an existing user}
        {--validate-token : Validate generated token with broker before output}';

    protected $description = 'Send a password reset email for local testing.';

    public function handle(): int
    {
        $email = (string) $this->argument('email');
        $panel = Filament::getDefaultPanel();
        $brokerName = $panel?->getAuthPasswordBroker() ?? config('auth.defaults.passwords', 'users');

        /** @var ?User $user */
        $user = User::query()->where('email', $email)->first();

        if (! $user) {
            $this->error("No user found for email: {$email}");

            return self::FAILURE;
        }

        $credentials = ['email' => $user->email];
        $token = null;
        $resetUrl = null;

        $status = Password::broker($brokerName)->sendResetLink(
            $credentials,
            function (CanResetPassword $canResetPassword, string $rawToken) use (&$token, &$resetUrl): void {
                $token = $rawToken;
                $resetUrl = Filament::getResetPasswordUrl($rawToken, $canResetPassword);

                if (! method_exists($canResetPassword, 'notify')) {
                    return;
                }

                $canResetPassword->sendPasswordResetNotification($rawToken);
            },
        );

        if ($status !== Password::RESET_LINK_SENT) {
            $this->error(__($status));

            return self::FAILURE;
        }

        if (! is_string($token) || ! is_string($resetUrl)) {
            $this->error('Failed to capture reset token/URL from password broker.');

            return self::FAILURE;
        }

        $mailer = (string) config('mail.default');
        $this->info("Password reset notification dispatched for {$email} using broker [{$brokerName}] and mailer [{$mailer}].");

        $tokenTable = (string) config('auth.passwords.' . $brokerName . '.table', 'password_reset_tokens');
        $tokenRow = DB::table($tokenTable)
            ->where('email', $user->email)
            ->first(['email', 'created_at']);

        $this->line("email={$user->email}");
        $this->line("broker={$brokerName}");
        $this->line('password_reset_row_exists=' . ($tokenRow ? 'true' : 'false'));
        $this->line('token_row_created_at=' . ($tokenRow?->created_at ?? 'null'));

        if ($this->option('validate-token')) {
            $tokenExists = Password::broker($brokerName)->tokenExists($user, $token);
            $this->line('tokenExists=' . ($tokenExists ? 'true' : 'false'));

            if (! $tokenExists) {
                $this->error('Generated token failed validation immediately. Aborting.');

                return self::FAILURE;
            }
        }

        $expectedPrefix = 'http://127.0.0.1:8000/admin/password-reset/reset?';
        if (! Str::startsWith($resetUrl, $expectedPrefix)) {
            $this->warn("Reset URL does not use expected localhost prefix: {$expectedPrefix}");
            $this->line("Generated URL: {$resetUrl}");

            return self::SUCCESS;
        }

        $this->line('Open this exact URL in your browser:');
        $this->line($resetUrl);

        if ($mailer === 'log') {
            $this->line('MAIL_MAILER=log is active. Email was also written to storage/logs/laravel.log.');
        }

        return self::SUCCESS;
    }
}
