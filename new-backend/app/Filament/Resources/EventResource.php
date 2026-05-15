<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Models\Event;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Schema as SchemaFacade;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-calendar-days';
    protected static string|\UnitEnum|null $navigationGroup = 'Club';

    public static function form(Schema $schema): Schema
    {
        $hasEndTime = SchemaFacade::hasColumn('events', 'end_time');

        return $schema
            ->components([
                Section::make()
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required(),
                        Grid::make(2)
                            ->schema([
                                Forms\Components\DatePicker::make('date')
                                    ->required(),
                                Forms\Components\TimePicker::make('time'),
                                Forms\Components\TimePicker::make('end_time')
                                    ->visible($hasEndTime)
                                    ->label('End time'),
                            ]),
                        Forms\Components\TextInput::make('location'),
                        Forms\Components\RichEditor::make('description')
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('image')
                            ->image()
                            ->disk('public')
                            ->directory('events'),
                        Forms\Components\Toggle::make('is_featured')
                            ->label('Featured announcement')
                            ->helperText('Show this event in the homepage Featured Announcement card.')
                            ->default(false),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        $hasEndTime = SchemaFacade::hasColumn('events', 'end_time');

        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->square(),
                Tables\Columns\TextColumn::make('title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('time')
                    ->label('Start')
                    ->toggleable(),
                Tables\Columns\TextColumn::make('end_time')
                    ->visible($hasEndTime)
                    ->label('End')
                    ->toggleable(),
                Tables\Columns\TextColumn::make('location'),
                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Featured announcement'),
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }
}
