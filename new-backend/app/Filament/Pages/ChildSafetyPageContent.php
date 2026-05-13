<?php

namespace App\Filament\Pages;

use Filament\Actions\Action;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Throwable;
use Illuminate\Support\Facades\Storage;

class ChildSafetyPageContent extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-shield-check';
    protected static ?string $navigationLabel = 'Child Safety Page Content';
    protected static string|\UnitEnum|null $navigationGroup = 'Content';
    protected static ?int $navigationSort = 11;
    protected static ?string $title = 'Child Safety Page Content';
    protected string $view = 'filament.pages.child-safety-page-content';
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
            Section::make('Commitment')->schema([
                Textarea::make('commitment')->required()->rows(4),
            ]),
            Section::make('Contacts')->schema([
                Repeater::make('contacts')->schema([
                    TextInput::make('id')->required(),
                    TextInput::make('name')->required(),
                    TextInput::make('role')->required(),
                    TextInput::make('description')->required(),
                    TextInput::make('email')->email(),
                    TextInput::make('phone'),
                ])->columns(2)->reorderable(false),
            ]),
            Section::make('Documents')->schema([
                Repeater::make('documents')->schema([
                    TextInput::make('id')->required(),
                    TextInput::make('title')->required(),
                    TextInput::make('fileUrl')->required(),
                    TextInput::make('date')->required(),
                ])->columns(2)->reorderable(false),
            ]),
            Section::make('Steps')->schema([
                Repeater::make('steps')->schema([
                    TextInput::make('title')->required(),
                    TextInput::make('description')->required(),
                ])->reorderable(false),
            ]),
            Section::make('Helplines')->schema([
                Repeater::make('helplines')->schema([
                    TextInput::make('name')->required(),
                    TextInput::make('phone')->required(),
                ])->columns(2)->reorderable(false),
            ]),
            Section::make('CTA')->schema([
                TextInput::make('cta.title')->required(),
                TextInput::make('cta.description')->required(),
                TextInput::make('cta.buttonText')->required(),
                TextInput::make('cta.buttonLink')->required(),
            ])->columns(2),
        ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('openFrontend')->label('Open Frontend Page')->url('/child-safety', shouldOpenInNewTab: true),
            Action::make('save')->label('Save Child Safety Page Content')->action('save'),
        ];
    }

    public function save(): void
    {
        try {
            $pages = $this->loadAllPages();
            $pages['child-safety'] = $this->form->getState();

            Storage::disk('local')->put(
                self::STORAGE_PATH,
                json_encode($pages, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
            );

            Notification::make()->title('Child safety page content saved')->success()->send();
        } catch (Throwable $exception) {
            report($exception);

            Notification::make()
                ->title('Failed to save Child Safety page content')
                ->body($exception->getMessage())
                ->danger()
                ->send();
        }
    }

    private function loadPage(): array
    {
        $pages = $this->loadAllPages();
        return $pages['child-safety'] ?? [];
    }

    private function loadAllPages(): array
    {
        if (! Storage::disk('local')->exists(self::STORAGE_PATH)) return [];
        $decoded = json_decode(Storage::disk('local')->get(self::STORAGE_PATH), true);
        return is_array($decoded) ? $decoded : [];
    }
}
