<?php

namespace App\Filament\Resources\ShopPageContentResource\RelationManagers;

use Filament\Actions;
use Filament\Forms;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class ShopItemsRelationManager extends RelationManager
{
    protected static string $relationship = 'shops';

    protected static ?string $title = 'Shops';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()
                    ->description('Each row controls one shop card shown on the public Shop page.')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Forms\Components\TextInput::make('order')
                                    ->label('Display Order')
                                    ->helperText('Lower numbers appear first on the frontend.')
                                    ->numeric()
                                    ->required()
                                    ->default(0),
                                Forms\Components\Toggle::make('is_placeholder')
                                    ->label('Placeholder Card')
                                    ->helperText('Enable if this is a coming-soon card, not a real partner yet.')
                                    ->default(false),
                            ]),
                        Forms\Components\TextInput::make('name')
                            ->label('Shop Name')
                            ->placeholder('O\'Neills')
                            ->required()
                            ->maxLength(200),
                        Forms\Components\TextInput::make('description')
                            ->label('Short Description')
                            ->placeholder('Official Club Gear & Leisurewear')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Textarea::make('detail')
                            ->label('Detail Text')
                            ->helperText('Longer description shown on the card.')
                            ->rows(4)
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('url')
                            ->label('Shop URL')
                            ->helperText('Public link when users click through to this partner.')
                            ->url()
                            ->maxLength(255),
                        Forms\Components\FileUpload::make('image')
                            ->label('Shop Image / Logo')
                            ->helperText('Shown on the frontend shop card. Publicly visible.')
                            ->image()
                            ->disk('public')
                            ->directory('shops'),
                        Grid::make(3)
                            ->schema([
                                Forms\Components\Toggle::make('is_logo')
                                    ->label('Treat As Logo')
                                    ->default(false),
                                Forms\Components\TextInput::make('cta')
                                    ->label('Button Text')
                                    ->placeholder('Visit Shop')
                                    ->maxLength(80)
                                    ->default('Visit Shop'),
                            ]),
                    ]),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->square(),
                Tables\Columns\TextColumn::make('order')
                    ->sortable(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('description')
                    ->limit(50),
                Tables\Columns\IconColumn::make('is_logo')
                    ->boolean(),
                Tables\Columns\IconColumn::make('is_placeholder')
                    ->boolean(),
            ])
            ->headerActions([
                Actions\CreateAction::make(),
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ]);
    }
}
