<?php

namespace App\Filament\Pages;

use Filament\Actions\Action;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;

class ContactPageContent extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-envelope';
    protected static ?string $navigationLabel = 'Contact Page Content';
    protected static string|\UnitEnum|null $navigationGroup = 'Content';
    protected static ?int $navigationSort = 12;
    protected static ?string $title = 'Contact Page Content';
    protected string $view = 'filament.pages.contact-page-content';
    public ?array $data = [];
    private const STORAGE_PATH = 'cms/page-content.json';

    public function mount(): void
    {
        $this->form->fill($this->loadPage());
    }

    public function form(Schema $schema): Schema
    {
        return $schema->statePath('data')->components([
            Section::make('Hero')->schema([
                TextInput::make('hero.title')->required(),
                TextInput::make('hero.subtitle')->required(),
            ])->columns(2),
            Section::make('Form')->schema([
                TextInput::make('form.title')->required(),
                TextInput::make('form.endpoint')->url()->required(),
                TextInput::make('form.successMessage')->required(),
            ])->columns(2),
            Section::make('Contact Info')->schema([
                TextInput::make('contactInfo.clubGroundsTitle')->required(),
                Textarea::make('contactInfo.clubGroundsAddress')->rows(4)->required(),
                TextInput::make('contactInfo.emailTitle')->required(),
                TextInput::make('contactInfo.email')->email()->required(),
                TextInput::make('contactInfo.facebookUrl')->url()->required(),
                TextInput::make('contactInfo.instagramUrl')->url()->required(),
            ])->columns(2),
            Section::make('Map')->schema([
                TextInput::make('mapQuery')
                    ->label('Google Maps Location or Embed URL')
                    ->helperText('Use a location query like "Naomh Mairtin CPG, Sillogue Lane, Newtown Monasterboice, Co. Louth" or a full Google Maps embed URL.')
                    ->required(),
            ]),
        ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('openFrontend')->label('Open Frontend Page')->url('/contact', shouldOpenInNewTab: true),
            Action::make('save')->label('Save Contact Page Content')->submit('save'),
        ];
    }

    public function save(): void
    {
        $pages = $this->loadAllPages();
        $pages['contact'] = $this->form->getState();
        Storage::disk('local')->put(self::STORAGE_PATH, json_encode($pages, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        Notification::make()->title('Contact page content saved')->success()->send();
    }

    private function loadPage(): array
    {
        $pages = $this->loadAllPages();
        return $pages['contact'] ?? [];
    }

    private function loadAllPages(): array
    {
        if (! Storage::disk('local')->exists(self::STORAGE_PATH)) return [];
        $decoded = json_decode(Storage::disk('local')->get(self::STORAGE_PATH), true);
        return is_array($decoded) ? $decoded : [];
    }
}
