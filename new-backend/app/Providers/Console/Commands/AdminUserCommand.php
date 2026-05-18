<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class AdminUserCommand extends Command
{
    protected $signature = 'admin:user
        {--name= : Full name for the admin user}
        {--email= : Email address for the admin user}
        {--password= : Plain-text password to hash and store}
        {--super : Grant super-admin access}';

    protected $description = 'Create or update an admin user for emergency access.';

    public function handle(): int
    {
        $name = (string) $this->option('name');
        $email = (string) $this->option('email');
        $password = (string) $this->option('password');
        $isSuperAdmin = (bool) $this->option('super');

        if (($name === '') || ($email === '') || ($password === '')) {
            $this->error('The --name, --email, and --password options are required.');

            return self::FAILURE;
        }

        $user = User::query()->firstOrNew(['email' => $email]);
        $user->name = $name;
        $user->password = Hash::make($password);
        $user->is_admin = true;
        $user->is_super_admin = $isSuperAdmin;
        $user->is_active = true;
        $user->save();

        $this->info(sprintf(
            '%s admin user %s (%s).',
            $user->wasRecentlyCreated ? 'Created' : 'Updated',
            $user->email,
            $isSuperAdmin ? 'super-admin' : 'admin'
        ));

        return self::SUCCESS;
    }
}
