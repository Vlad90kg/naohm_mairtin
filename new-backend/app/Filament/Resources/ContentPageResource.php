<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContentPageResource\Pages;
use App\Models\ContentPage;
use Illuminate\Support\Str;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class ContentPageResource extends Resource
{
    protected static ?string $model = ContentPage::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-document-text';
    protected static string|\UnitEnum|null $navigationGroup = 'Content';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Page Settings')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->helperText('Main page heading shown at the top of the page.'),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->helperText('Used in the page URL and API slug, for example `health-wellbeing`.'),
                        Forms\Components\TextInput::make('subtitle')
                            ->maxLength(255)
                            ->helperText('Optional short line below the main heading.'),
                        Forms\Components\Textarea::make('intro_text')
                            ->rows(4)
                            ->helperText('Optional intro paragraph shown before the first section.'),
                        Forms\Components\FileUpload::make('hero_image')
                            ->image()
                            ->disk('public')
                            ->directory('content-pages/hero')
                            ->formatStateUsing(fn ($state) => self::normalizeUploadState($state))
                            ->fetchFileInformation(false)
                            ->imagePreviewHeight('220')
                            ->openable()
                            ->downloadable()
                            ->helperText('Optional top image for the page header.'),
                        Forms\Components\Toggle::make('is_published')
                            ->default(false)
                            ->helperText('Only published pages are returned by the frontend API.'),
                    ])
                    ->columns(2),
                Section::make('Content Sections')
                    ->description('Add simple content blocks. Reorder them to control how the page reads from top to bottom.')
                    ->schema([
                        Forms\Components\Repeater::make('sections')
                            ->relationship()
                            ->orderColumn('order')
                            ->collapsible()
                            ->collapsed()
                            ->reorderableWithButtons()
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? $state['layout_type'] ?? 'Section')
                            ->addActionLabel('Add Section')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->maxLength(255)
                                    ->helperText('Optional section heading.'),
                                Forms\Components\Select::make('layout_type')
                                    ->options([
                                        'text_only' => 'Text only',
                                        'image_text' => 'Image + text',
                                        'gallery' => 'Gallery / multiple images',
                                    ])
                                    ->default('text_only')
                                    ->required()
                                    ->live()
                                    ->helperText('Text only: no image. Image + text: single image with left/right position. Gallery: multiple images.'),
                                Forms\Components\Select::make('image_position')
                                    ->options([
                                        'none' => 'No image',
                                        'left' => 'Image left',
                                        'right' => 'Image right',
                                    ])
                                    ->default('none')
                                    ->visible(fn (Get $get): bool => $get('layout_type') === 'image_text')
                                    ->helperText('For Image + text sections only.'),
                                Forms\Components\Toggle::make('is_active')
                                    ->default(true)
                                    ->helperText('Inactive sections stay in CMS but do not appear on the website.'),
                                Forms\Components\Textarea::make('body')
                                    ->rows(6)
                                    ->columnSpanFull()
                                    ->helperText('Main section text shown on the page. Leave empty if section is image-only gallery.'),
                                Forms\Components\FileUpload::make('image')
                                    ->image()
                                    ->disk('public')
                                    ->directory('content-pages/sections')
                                    ->formatStateUsing(fn ($state) => self::normalizeUploadState($state))
                                    ->fetchFileInformation(false)
                                    ->imagePreviewHeight('180')
                                    ->openable()
                                    ->downloadable()
                                    ->visible(fn (Get $get): bool => $get('layout_type') === 'image_text')
                                    ->helperText('Upload the section image used beside the text.'),
                                Forms\Components\Repeater::make('galleryImages')
                                    ->relationship('galleryImages')
                                    ->orderColumn('order')
                                    ->collapsible()
                                    ->collapsed()
                                    ->reorderableWithButtons()
                                    ->visible(fn (Get $get): bool => $get('layout_type') === 'gallery')
                                    ->helperText('Add and reorder multiple images for gallery sections.')
                                    ->addActionLabel('Add Gallery Image')
                                    ->schema([
                                        Forms\Components\FileUpload::make('image')
                                            ->image()
                                            ->disk('public')
                                            ->directory('content-pages/gallery')
                                            ->formatStateUsing(fn ($state) => self::normalizeUploadState($state))
                                            ->fetchFileInformation(false)
                                            ->imagePreviewHeight('140')
                                            ->openable()
                                            ->downloadable()
                                            ->required()
                                            ->helperText('Gallery image shown in the frontend grid.'),
                                        Forms\Components\TextInput::make('caption')
                                            ->maxLength(255)
                                            ->helperText('Optional caption displayed below the image if needed later.'),
                                    ])
                                    ->columns(2)
                                    ->columnSpanFull(),
                            ])
                            ->columns(2)
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('slug')
                    ->searchable()
                    ->copyable(),
                Tables\Columns\TextColumn::make('sections_count')
                    ->counts('sections')
                    ->label('Sections'),
                Tables\Columns\IconColumn::make('is_published')
                    ->boolean()
                    ->label('Published')
                    ->sortable(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContentPages::route('/'),
            'create' => Pages\CreateContentPage::route('/create'),
            'edit' => Pages\EditContentPage::route('/{record}/edit'),
        ];
    }

    private static function normalizeUploadState(mixed $state): mixed
    {
        if (! is_string($state)) {
            return $state;
        }

        return Str::startsWith($state, ['http://', 'https://', 'data:', 'blob:']) ? null : $state;
    }
}
