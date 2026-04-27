from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html

from .models import (
    ClubTeam,
    Event,
    EventsPageContent,
    Fixture,
    HistoryFigureItem,
    FixturesPageContent,
    HistoryPageContent,
    HistoryTimelineItem,
    JuvenileTeamsPageContent,
    LottoPageContent,
    LottoWinner,
    OpponentClub,
    Result,
    ShopItem,
    ShopPageContent,
    Sponsor,
    SponsorsPageContent,
    TeamsPageContent,
)


@admin.register(Sponsor)
class SponsorAdmin(admin.ModelAdmin):
    list_display = ("name", "tier", "is_active", "website_link", "logo_preview")
    list_filter = ("tier", "is_active")
    search_fields = ("name", "website")
    list_editable = ("is_active",)
    readonly_fields = ("logo_preview",)
    fieldsets = (
        (
            None,
            {
                "fields": ("name", "tier", "is_active"),
            },
        ),
        (
            "Links",
            {
                "fields": ("website", "logo", "logo_preview"),
            },
        ),
    )

    @admin.display(description="Website")
    def website_link(self, obj):
        if not obj.website:
            return "-"
        return format_html('<a href="{}" target="_blank" rel="noopener noreferrer">{}</a>', obj.website, obj.website)

    @admin.display(description="Logo")
    def logo_preview(self, obj):
        if not obj.logo_url:
            return "No logo uploaded"
        return format_html(
            '<img src="{}" alt="{}" style="max-height: 64px; max-width: 160px; object-fit: contain;" />',
            obj.logo_url,
            obj.name,
        )


@admin.register(SponsorsPageContent)
class SponsorsPageContentAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Hero", {"fields": ("hero_eyebrow", "hero_title", "hero_description")}),
        ("Directory Section", {"fields": ("section_eyebrow", "section_title", "section_description")}),
        ("Call To Action", {"fields": ("cta_title", "cta_description", "cta_button_text", "cta_button_link")}),
    )
    readonly_fields = ("updated_at",)

    def has_add_permission(self, request):
        if SponsorsPageContent.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(TeamsPageContent)
class TeamsPageContentAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Hero", {"fields": ("hero_title", "hero_subtitle")}),
        ("Hub Section", {"fields": ("hub_eyebrow", "hub_title", "hub_description")}),
        ("Adult Section", {"fields": ("adult_title", "adult_description")}),
        ("Juvenile Section", {"fields": ("juvenile_title", "juvenile_description")}),
        ("Social Section", {"fields": ("social_title", "social_description")}),
        ("Scór Section", {"fields": ("scor_title", "scor_description")}),
        ("Gallery Section", {"fields": ("gallery_eyebrow", "gallery_title", "gallery_description")}),
    )
    readonly_fields = ("updated_at",)

    def has_add_permission(self, request):
        if TeamsPageContent.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(FixturesPageContent)
class FixturesPageContentAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Hero", {"fields": ("hero_title", "hero_subtitle")}),
        ("Upcoming Section", {"fields": ("upcoming_title", "upcoming_subtitle")}),
        ("Results Section", {"fields": ("results_title", "results_subtitle")}),
        ("Archive CTA", {"fields": ("archive_cta_title", "archive_cta_description", "archive_cta_button_text")}),
    )
    readonly_fields = ("updated_at",)

    def has_add_permission(self, request):
        if FixturesPageContent.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(EventsPageContent)
class EventsPageContentAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Hero", {"fields": ("hero_title", "hero_subtitle")}),
    )
    readonly_fields = ("updated_at",)

    def has_add_permission(self, request):
        if EventsPageContent.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "date", "time", "category", "location")
    list_filter = ("category", "date")
    search_fields = ("title", "location", "description")
    date_hierarchy = "date"
    fieldsets = (
        (None, {"fields": ("title", "category")}),
        ("When & Where", {"fields": ("date", "time", "location")}),
        ("Details", {"fields": ("description", "image")}),
    )


class HistoryTimelineItemInline(admin.StackedInline):
    model = HistoryTimelineItem
    extra = 0
    fields = ("order", "year", "title", "description", "icon", "image")


class HistoryFigureItemInline(admin.StackedInline):
    model = HistoryFigureItem
    extra = 0
    fields = ("order", "name", "role", "detail", "image")


class ShopItemInline(admin.StackedInline):
    model = ShopItem
    extra = 0
    fields = ("order", "name", "description", "detail", "url", "image", "is_logo", "cta", "is_placeholder")


class LottoWinnerInline(admin.StackedInline):
    model = LottoWinner
    extra = 0
    fields = ("order", "prize", "winner", "amount")


@admin.register(HistoryPageContent)
class HistoryPageContentAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Hero", {"fields": ("hero_title", "hero_subtitle", "intro_text")}),
        ("Timeline Section", {"fields": ("milestones_eyebrow",)}),
        ("Figures Section", {"fields": ("figures_eyebrow",)}),
        ("Call To Action", {"fields": ("cta_title", "cta_button_text", "cta_button_link")}),
    )
    readonly_fields = ("updated_at",)
    inlines = [HistoryTimelineItemInline, HistoryFigureItemInline]

    def has_add_permission(self, request):
        if HistoryPageContent.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(ShopPageContent)
class ShopPageContentAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Hero", {"fields": ("hero_eyebrow", "hero_title", "hero_highlight", "hero_description")}),
        ("Info Box", {"fields": ("info_title", "info_description", "info_button_text", "info_button_link")}),
    )
    readonly_fields = ("updated_at",)
    inlines = [ShopItemInline]

    def has_add_permission(self, request):
        if ShopPageContent.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(LottoPageContent)
class LottoPageContentAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Hero", {"fields": ("hero_eyebrow", "hero_title", "hero_highlight", "hero_description")}),
        ("Jackpot", {"fields": ("jackpot_label", "jackpot_amount", "next_draw_label", "next_draw_date")}),
        ("Primary Links", {"fields": ("buy_tickets_text", "buy_tickets_url", "app_download_text", "app_download_url", "helper_text")}),
        ("Latest Results", {"fields": ("latest_results_title", "latest_draw_date", "winning_number_1", "winning_number_2", "winning_number_3", "winning_number_4", "jackpot_won", "latest_jackpot_amount", "winners_section_title")}),
        ("Lower Sections", {"fields": ("how_it_works_title", "bottom_cta_title", "bottom_cta_description")}),
    )
    readonly_fields = ("updated_at",)
    inlines = [LottoWinnerInline]

    def has_add_permission(self, request):
        if LottoPageContent.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(JuvenileTeamsPageContent)
class JuvenileTeamsPageContentAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Hero", {"fields": ("hero_title", "hero_subtitle")}),
        ("Intro", {"fields": ("intro_eyebrow", "intro_title", "intro_description")}),
        ("Card And Modal Labels", {"fields": ("card_cta_text", "modal_eyebrow", "coaches_title", "no_coaches_text", "contact_email_title", "training_times_title", "no_training_times_text")}),
    )
    readonly_fields = ("updated_at",)

    def has_add_permission(self, request):
        if JuvenileTeamsPageContent.objects.exists():
            return False
        return super().has_add_permission(request)


class ResultInline(admin.StackedInline):
    model = Result
    extra = 0
    max_num = 1


class BaseTeamAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "is_internal")
    list_filter = ("category", "is_internal")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}
    fieldsets = (
        (None, {"fields": ("name", "slug", "category", "is_internal")}),
        ("Team Info", {"fields": ("image", "contact_email")}),
        ("Content (JSON)", {"fields": ("managers", "training_times"), "description": "Managers and training times should be lists of objects or strings."}),
    )


@admin.register(ClubTeam)
class ClubTeamAdmin(BaseTeamAdmin):
    list_display = ("name", "category")
    list_filter = ("category",)
    fieldsets = (
        (None, {"fields": ("name", "slug", "category")}),
        ("Team Info", {"fields": ("image", "contact_email")}),
        ("Content (JSON)", {"fields": ("managers", "training_times"), "description": "Managers and training times should be lists of objects or strings."}),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).filter(is_internal=True)

    def save_model(self, request, obj, form, change):
        obj.is_internal = True
        super().save_model(request, obj, form, change)

    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context["team_management_links"] = [
          {"label": "Teams Hub Content (Adult, Juvenile, Social, Scor)", "url": reverse("admin:core_teamspagecontent_changelist")},
          {"label": "Juvenile Page Content", "url": reverse("admin:core_juvenileteamspagecontent_changelist")},
          {"label": "Opponent Clubs", "url": reverse("admin:core_opponentclub_changelist")},
        ]
        return super().changelist_view(request, extra_context=extra_context)


@admin.register(OpponentClub)
class OpponentClubAdmin(BaseTeamAdmin):
    list_display = ("name", "category")
    list_filter = ("category",)
    fieldsets = (
        (None, {"fields": ("name", "slug", "category")}),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).filter(is_internal=False)

    def save_model(self, request, obj, form, change):
        obj.is_internal = False
        super().save_model(request, obj, form, change)


@admin.register(Fixture)
class FixtureAdmin(admin.ModelAdmin):
    list_display = ("date", "competition", "home_team", "away_team", "location", "result_status")
    list_filter = ("competition", "home_team__category")
    search_fields = ("home_team__name", "away_team__name", "competition", "location")
    date_hierarchy = "date"
    inlines = [ResultInline]
    list_select_related = ("home_team", "away_team")

    @admin.display(description="Result Status")
    def result_status(self, obj):
        if hasattr(obj, "result"):
            return obj.result.get_status_display()
        return "No result"


@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = ("fixture", "home_score", "away_score", "status")
    list_filter = ("status", "fixture__home_team__category")
    search_fields = ("fixture__home_team__name", "fixture__away_team__name", "fixture__competition")
    list_select_related = ("fixture", "fixture__home_team", "fixture__away_team")
