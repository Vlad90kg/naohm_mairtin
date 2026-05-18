<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $this->isSuperAdmin($user);
    }

    public function view(User $user, User $record): bool
    {
        return $this->isSuperAdmin($user);
    }

    public function create(User $user): bool
    {
        return $this->isSuperAdmin($user);
    }

    public function update(User $user, User $record): bool
    {
        return $this->isSuperAdmin($user);
    }

    public function delete(User $user, User $record): bool
    {
        return $this->isSuperAdmin($user) && ($user->getKey() !== $record->getKey());
    }

    public function deleteAny(User $user): bool
    {
        return $this->isSuperAdmin($user);
    }

    private function isSuperAdmin(User $user): bool
    {
        return $user->is_admin && $user->is_super_admin && $user->is_active;
    }
}
