<?php

namespace App\Filament\Pages;

use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class TeamsPageContent extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationLabel = 'Teams Page Content';

    protected static string|\UnitEnum|null $navigationGroup = 'Content';

    protected static ?int $navigationSort = 14;

    protected static ?string $title = 'Teams Page Content';

    protected string $view = 'filament.pages.teams-page-content';

    public ?array $data = [];

    private const STORAGE_PATH = 'cms/page-content.json';

    public function mount(): void
    {
        $this->form->fill($this->loadPage());
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->statePath('data')
            ->components([
                Section::make('Hero')
                    ->description('Controls the top hero section on the public /teams page.')
                    ->schema([
                        TextInput::make('hero_title')
                            ->label('Hero title')
                            ->required()
                            ->maxLength(120),
                        Textarea::make('hero_subtitle')
                            ->label('Hero subtitle')
                            ->required()
                            ->rows(3),
                    ])
                    ->columns(2),
                Section::make('Page Intro')
                    ->description('Shown above the team navigation cards.')
                    ->schema([
                        TextInput::make('hub_eyebrow')
                            ->label('Eyebrow label')
                            ->required()
                            ->maxLength(80),
                        TextInput::make('hub_title')
                            ->label('Title')
                            ->required()
                            ->maxLength(160),
                        Textarea::make('hub_description')
                            ->label('Description')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
                Section::make('Team Section Cards')
                    ->description('Shown on the Teams landing page as navigation cards. Reorder them to change the display order.')
                    ->schema([
                        Repeater::make('cards')
                            ->label('Cards')
                            ->default([])
                            ->collapsible()
                            ->collapsed()
                            ->reorderableWithButtons()
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? 'Teams card')
                            ->addActionLabel('Add Card')
                            ->schema([
                                TextInput::make('eyebrow')
                                    ->label('Eyebrow label')
                                    ->required()
                                    ->maxLength(80),
                                TextInput::make('title')
                                    ->label('Card title')
                                    ->required()
                                    ->maxLength(160),
                                Textarea::make('description')
                                    ->label('Description')
                                    ->required()
                                    ->rows(3)
                                    ->columnSpanFull(),
                                TextInput::make('button_label')
                                    ->label('Button label')
                                    ->required()
                                    ->maxLength(80),
                                TextInput::make('button_url')
                                    ->label('Where this card links')
                                    ->required()
                                    ->helperText('Shown on the Teams landing page. Use an internal path like /teams/adult or a full URL.')
                                    ->rule('regex:/^(https?:\/\/|\/).+/')
                                    ->maxLength(255),
                                TextInput::make('order')
                                    ->label('Order')
                                    ->numeric()
                                    ->minValue(1)
                                    ->maxValue(fn (callable $get): int => max(1, count($get('../../cards') ?? [])))
                                    ->helperText(fn (callable $get): string => 'Use a unique value from 1 to ' . max(1, count($get('../../cards') ?? [])) . '.')
                                    ->required(),
                                Toggle::make('is_active')
                                    ->label('Active')
                                    ->default(true)
                                    ->helperText('Only active cards are shown on the Teams landing page.'),
                            ])
                            ->columns(2)
                            ->columnSpanFull(),
                    ]),
                Section::make('Gallery')
                    ->description('Gallery images shown below the team section cards.')
                    ->schema([
                        TextInput::make('gallery_eyebrow')
                            ->label('Gallery eyebrow')
                            ->required()
                            ->maxLength(80),
                        TextInput::make('gallery_title')
                            ->label('Gallery title')
                            ->required()
                            ->maxLength(160),
                        Textarea::make('gallery_description')
                            ->label('Gallery description')
                            ->required()
                            ->rows(3)
                            ->columnSpanFull(),
                        Repeater::make('gallery_images')
                            ->label('Gallery images')
                            ->default([])
                            ->collapsible()
                            ->collapsed()
                            ->reorderableWithButtons()
                            ->itemLabel(fn (array $state): ?string => $state['caption'] ?? 'Gallery image')
                            ->addActionLabel('Add Gallery Image')
                            ->schema([
                                FileUpload::make('image')
                                    ->label('Image')
                                    ->image()
                                    ->imageEditor()
                                    ->disk('public')
                                    ->directory('teams-page/gallery')
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'])
                                    ->maxSize(2048)
                                    ->required()
                                    ->helperText('Image formats only, maximum 2MB.'),
                                TextInput::make('caption')
                                    ->label('Caption')
                                    ->maxLength(255),
                                TextInput::make('order')
                                    ->label('Order')
                                    ->numeric()
                                    ->minValue(1)
                                    ->maxValue(fn (callable $get): int => max(1, count($get('../../gallery_images') ?? [])))
                                    ->helperText(fn (callable $get): string => 'Use a unique value from 1 to ' . max(1, count($get('../../gallery_images') ?? [])) . '.')
                                    ->required(),
                                Toggle::make('is_active')
                                    ->label('Active')
                                    ->default(true),
                            ])
                            ->columns(2)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('openFrontend')
                ->label('Open Frontend Page')
                ->url('/teams', shouldOpenInNewTab: true),
            Action::make('save')
                ->label('Save Teams Page Content')
                ->action('save'),
        ];
    }

    public function save(): void
    {
        $pages = $this->loadAllPages();
        $state = $this->form->getState();

        $this->validateOrderValues($state['cards'] ?? [], 'data.cards', 'card');
        $this->validateOrderValues($state['gallery_images'] ?? [], 'data.gallery_images', 'gallery image');

        $state['cards'] = $this->normalizeCards($state['cards'] ?? []);
        $state['gallery_images'] = $this->normalizeGalleryImages($state['gallery_images'] ?? []);
        $pages['teams'] = $state;

        Storage::disk('local')->put(
            self::STORAGE_PATH,
            json_encode($pages, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );

        Notification::make()
            ->title('Teams page content saved')
            ->success()
            ->send();
    }

    private function loadPage(): array
    {
        $pages = $this->loadAllPages();
        $page = $this->mergeWithDefaults($pages['teams'] ?? []);
        $normalizedCards = $this->normalizeCards($page['cards'] ?? []);
        $normalizedGalleryImages = $this->normalizeGalleryImages($page['gallery_images'] ?? []);

        if (
            ($page['cards'] ?? []) !== $normalizedCards
            || ($page['gallery_images'] ?? []) !== $normalizedGalleryImages
        ) {
            $page['cards'] = $normalizedCards;
            $page['gallery_images'] = $normalizedGalleryImages;
            $pages['teams'] = $page;

            Storage::disk('local')->put(
                self::STORAGE_PATH,
                json_encode($pages, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
            );
        }

        return [
            ...$page,
            'cards' => $normalizedCards,
            'gallery_images' => $normalizedGalleryImages,
        ];
    }

    private function loadAllPages(): array
    {
        if (! Storage::disk('local')->exists(self::STORAGE_PATH)) {
            return [];
        }

        $decoded = json_decode(Storage::disk('local')->get(self::STORAGE_PATH), true);

        return is_array($decoded) ? $decoded : [];
    }

    private function mergeWithDefaults(array $page): array
    {
        $defaults = $this->defaultPage();

        return [
            'hero_title' => $page['hero_title'] ?? $defaults['hero_title'],
            'hero_subtitle' => $page['hero_subtitle'] ?? $defaults['hero_subtitle'],
            'hub_eyebrow' => $page['hub_eyebrow'] ?? $defaults['hub_eyebrow'],
            'hub_title' => $page['hub_title'] ?? $defaults['hub_title'],
            'hub_description' => $page['hub_description'] ?? $defaults['hub_description'],
            'cards' => is_array($page['cards'] ?? null) && $page['cards'] !== [] ? $page['cards'] : $defaults['cards'],
            'gallery_eyebrow' => $page['gallery_eyebrow'] ?? $defaults['gallery_eyebrow'],
            'gallery_title' => $page['gallery_title'] ?? $defaults['gallery_title'],
            'gallery_description' => $page['gallery_description'] ?? $defaults['gallery_description'],
            'gallery_images' => is_array($page['gallery_images'] ?? null) ? $page['gallery_images'] : $defaults['gallery_images'],
        ];
    }

    private function normalizeCards(array $cards): array
    {
        return collect($cards)
            ->map(function (array $card, int $index): array {
                return [
                    'eyebrow' => (string) ($card['eyebrow'] ?? ''),
                    'title' => (string) ($card['title'] ?? ''),
                    'description' => (string) ($card['description'] ?? ''),
                    'button_label' => (string) ($card['button_label'] ?? 'Open Page'),
                    'button_url' => (string) ($card['button_url'] ?? ''),
                    'order' => max(1, (int) ($card['order'] ?? ($index + 1))),
                    'is_active' => (bool) ($card['is_active'] ?? false),
                ];
            })
            ->sortBy('order')
            ->values()
            ->all();
    }

    private function normalizeGalleryImages(array $images): array
    {
        return collect($images)
            ->map(function (array $image, int $index): array {
                return [
                    'image' => (string) ($this->persistUploadedImage($image['image'] ?? null) ?? ''),
                    'caption' => (string) ($image['caption'] ?? ''),
                    'order' => max(1, (int) ($image['order'] ?? ($index + 1))),
                    'is_active' => (bool) ($image['is_active'] ?? true),
                ];
            })
            ->filter(fn (array $image): bool => $image['image'] !== '')
            ->sortBy('order')
            ->values()
            ->all();
    }

    private function validateOrderValues(array $items, string $fieldPrefix, string $label): void
    {
        $count = count($items);

        if ($count === 0) {
            return;
        }

        $errors = [];
        $seen = [];

        foreach (array_values($items) as $index => $item) {
            $order = (int) ($item['order'] ?? 0);
            $field = "{$fieldPrefix}.{$index}.order";

            if ($order < 1 || $order > $count) {
                $errors[$field] = ucfirst($label) . " order must be between 1 and {$count}.";
                continue;
            }

            if (isset($seen[$order])) {
                $errors[$field] = ucfirst($label) . " order values must be unique.";
                $errors["{$fieldPrefix}.{$seen[$order]}.order"] = ucfirst($label) . " order values must be unique.";
                continue;
            }

            $seen[$order] = $index;
        }

        if ($errors !== []) {
            throw ValidationException::withMessages($errors);
        }
    }

    private function persistUploadedImage(mixed $image): ?string
    {
        try {
            if ($image instanceof TemporaryUploadedFile) {
                return $image->store('teams-page/gallery', 'public');
            }

            if (is_string($image) && TemporaryUploadedFile::canUnserialize($image)) {
                return TemporaryUploadedFile::unserializeFromLivewireRequest($image)
                    ->store('teams-page/gallery', 'public');
            }
        } catch (\Throwable) {
            return null;
        }

        if (is_string($image) && $image !== '') {
            return $image;
        }

        return null;
    }

    private function defaultPage(): array
    {
        return [
            'hero_title' => 'OUR TEAMS',
            'hero_subtitle' => 'Browse all sections of the club from adult football to juvenile pathways.',
            'hub_eyebrow' => 'Teams Hub',
            'hub_title' => 'Explore Team Sections',
            'hub_description' => 'Open the adult and juvenile pathways or follow the links to each team area.',
            'cards' => [
                [
                    'eyebrow' => 'Adult Teams',
                    'title' => 'Adult Teams',
                    'description' => 'Browse the adult football section, including links onward to the senior men, senior ladies, and social overview pages.',
                    'button_label' => 'Open Page',
                    'button_url' => '/teams/adult',
                    'order' => 1,
                    'is_active' => true,
                ],
                [
                    'eyebrow' => 'Juvenile Teams',
                    'title' => 'Juvenile Teams',
                    'description' => 'Open the juvenile pathway page to view the full structure of teams and the current placeholder team details layout.',
                    'button_label' => 'Open Page',
                    'button_url' => '/teams/juvenile',
                    'order' => 2,
                    'is_active' => true,
                ],
                [
                    'eyebrow' => 'Social',
                    'title' => 'Social',
                    'description' => 'Visit the social section for direct access to G4MO, G4DL, and Furious but not Fast.',
                    'button_label' => 'Open Page',
                    'button_url' => '/teams/social',
                    'order' => 3,
                    'is_active' => true,
                ],
                [
                    'eyebrow' => 'Scór',
                    'title' => 'Scór',
                    'description' => 'Explore the dedicated Scór page for the cultural side of the club, including music, performance, storytelling, and quiz activity.',
                    'button_label' => 'Open Page',
                    'button_url' => '/teams/scor',
                    'order' => 4,
                    'is_active' => true,
                ],
            ],
            'gallery_eyebrow' => 'Gallery',
            'gallery_title' => 'Gallery',
            'gallery_description' => 'Team photos and highlights will appear here as they are published.',
            'gallery_images' => [],
        ];
    }
}
