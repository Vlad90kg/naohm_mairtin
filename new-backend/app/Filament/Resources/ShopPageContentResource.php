<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ShopPageContentResource\Pages;
use App\Filament\Resources\ShopPageContentResource\RelationManagers\ShopItemsRelationManager;
use App\Models\ShopPageContent;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Schema as DatabaseSchema;

class ShopPageContentResource extends Resource
{
    protected static ?string $model = ShopPageContent::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-shopping-bag';
    protected static string|\UnitEnum|null $navigationGroup = 'Content';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Hero')
                    ->description('Controls the top hero section on the public Shop page.')
                    ->schema([
                        Forms\Components\TextInput::make('hero_eyebrow')
                            ->label('Hero Eyebrow')
                            ->helperText('Small text above the main Shop title.')
                            ->placeholder('Official Club Stores')
                            ->required()
                            ->maxLength(80),
                        Forms\Components\TextInput::make('hero_title')
                            ->label('Hero Title')
                            ->helperText('Main title text shown in large font.')
                            ->placeholder('Club Shop')
                            ->required()
                            ->maxLength(200),
                        Forms\Components\TextInput::make('hero_highlight')
                            ->label('Hero Highlight')
                            ->helperText('Highlighted word next to the hero title.')
                            ->placeholder('Shop')
                            ->required()
                            ->maxLength(80),
                        Forms\Components\Textarea::make('hero_description')
                            ->label('Hero Description')
                            ->helperText('Short introduction shown below the shop heading.')
                            ->placeholder('Support Naomh Mairtin CPG by purchasing official gear...')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),
                    ]),
                Section::make('Info Panel')
                    ->description('Controls the support/info card below the hero section.')
                    ->schema([
                        Forms\Components\TextInput::make('info_title')
                            ->label('Info Card Title')
                            ->helperText('Heading shown in the help card.')
                            ->placeholder('Need Help with an Order?')
                            ->required()
                            ->maxLength(200),
                        Forms\Components\Textarea::make('info_description')
                            ->label('Info Card Description')
                            ->helperText('Support text shown in the info card.')
                            ->placeholder('For queries about club orders, sizes, or custom printing...')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('info_button_text')
                            ->label('Info Button Text')
                            ->helperText('Text for the help button.')
                            ->placeholder('Contact the Club')
                            ->required()
                            ->maxLength(80),
                        Forms\Components\TextInput::make('info_button_link')
                            ->label('Info Button Link')
                            ->helperText('Public URL or internal path for the help button. This is publicly visible.')
                            ->placeholder('/contact')
                            ->required()
                            ->rule('regex:/^(https?:\/\/|\/).+/')
                            ->maxLength(255),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('hero_title')
                    ->label('Title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('info_button_text')
                    ->label('Info CTA'),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->actions([
                Actions\EditAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            ShopItemsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListShopPageContents::route('/'),
            'create' => Pages\CreateShopPageContent::route('/create'),
            'edit' => Pages\EditShopPageContent::route('/{record}/edit'),
        ];
    }

    public static function canCreate(): bool
    {
        if (! DatabaseSchema::hasTable((new ShopPageContent())->getTable())) {
            return true;
        }

        return ! static::getModel()::query()->exists();
    }
}
