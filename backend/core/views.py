from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .models import (
    Event,
    EventsPageContent,
    Fixture,
    FixturesPageContent,
    HistoryPageContent,
    JuvenileTeamsPageContent,
    LottoPageContent,
    Result,
    ShopPageContent,
    Sponsor,
    SponsorsPageContent,
    Team,
    TeamsPageContent,
)


def add_cors_headers(response):
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS, POST, PUT, PATCH, DELETE"
    response["Access-Control-Allow-Headers"] = "Content-Type"
    return response


def json_response(payload, status=200, safe=True):
    response = JsonResponse(payload, status=status, safe=safe)
    return add_cors_headers(response)


def options_response():
    return add_cors_headers(HttpResponse(status=204))


def team_to_dict(request, team):
    image_url = ""
    if team.image:
        image_url = request.build_absolute_uri(team.image.url)

    return {
        "id": team.id,
        "slug": team.slug,
        "name": team.name,
        "category": team.category,
        "category_display": team.get_category_display(),
        "image": image_url,
        "managers": team.managers,
        "training_times": team.training_times,
        "contact_email": team.contact_email,
        "is_internal": team.is_internal,
    }


def event_to_dict(request, event):
    image_url = media_url(request, event.image)
    return {
        "id": event.id,
        "title": event.title,
        "date": event.date.isoformat(),
        "time": event.time,
        "location": event.location,
        "category": event.category,
        "description": event.description,
        "image": image_url,
    }


def result_summary_to_dict(result):
    return {
        "id": result.id,
        "home_score": result.home_score,
        "away_score": result.away_score,
        "status": result.status,
        "status_display": result.get_status_display(),
    }


def fixture_to_dict(request, fixture):
    return {
        "id": fixture.id,
        "date": fixture.date.isoformat(),
        "location": fixture.location,
        "competition": fixture.competition,
        "home_team": team_to_dict(request, fixture.home_team),
        "away_team": team_to_dict(request, fixture.away_team),
        "result": result_summary_to_dict(fixture.result) if hasattr(fixture, "result") else None,
    }


def result_to_dict(request, result):
    fixture = result.fixture
    return {
        "id": result.id,
        "fixture_id": fixture.id,
        "date": fixture.date.isoformat(),
        "location": fixture.location,
        "competition": fixture.competition,
        "home_team": team_to_dict(request, fixture.home_team),
        "away_team": team_to_dict(request, fixture.away_team),
        "home_score": result.home_score,
        "away_score": result.away_score,
        "status": result.status,
        "status_display": result.get_status_display(),
    }


def sponsor_to_dict(request, sponsor):
    logo_url = sponsor.logo_url
    if logo_url.startswith("http://") or logo_url.startswith("https://"):
        absolute_logo_url = logo_url
    elif logo_url:
        absolute_logo_url = request.build_absolute_uri(logo_url)
    else:
        absolute_logo_url = ""

    return {
        "id": sponsor.id,
        "name": sponsor.name,
        "website": sponsor.website,
        "url": sponsor.website,
        "logo": absolute_logo_url,
        "tier": sponsor.tier,
        "is_active": sponsor.is_active,
    }


def media_url(request, file_field):
    if not file_field:
        return ""
    return request.build_absolute_uri(file_field.url)


def ensure_history_page_defaults(content):
    if not content.timeline_items.exists():
        content.timeline_items.bulk_create(
            [
                content.timeline_items.model(
                    page=content,
                    year="1957",
                    title="Club Foundation",
                    description="Established in Monasterboice, based at Pairc Naomh Mairtin, Silloge. The beginning of 'The Jocks'.",
                    icon="users",
                    order=0,
                ),
                content.timeline_items.model(
                    page=content,
                    year="1980",
                    title="Junior Clean Sweep",
                    description="A landmark unbeaten year winning the Junior Shield, League, and Championship.",
                    icon="shield",
                    order=1,
                ),
                content.timeline_items.model(
                    page=content,
                    year="2018-19",
                    title="Senior Contenders",
                    description="Reached consecutive Senior Championship finals, establishing the club as a top-tier force.",
                    icon="star",
                    order=2,
                ),
                content.timeline_items.model(
                    page=content,
                    year="2020",
                    title="First Senior Title",
                    description="Won the first-ever Louth Senior Football Championship (Joe Ward Cup) defeating St Mary's.",
                    icon="trophy",
                    order=3,
                ),
                content.timeline_items.model(
                    page=content,
                    year="2021",
                    title="Back-to-Back Champions",
                    description="Secured consecutive county titles with victory over St Mochta's.",
                    icon="award",
                    order=4,
                ),
                content.timeline_items.model(
                    page=content,
                    year="2025",
                    title="Third Joe Ward Cup",
                    description="Defeated Newtown Blues to claim a third Senior Title, cementing dominance in Louth.",
                    icon="trophy",
                    order=5,
                ),
            ]
        )

    if not content.figures_items.exists():
        content.figures_items.bulk_create(
            [
                content.figures_items.model(
                    page=content,
                    name="Sam Mulroy",
                    role="Louth Captain & All-Star Nominee",
                    detail="Captained Louth since 2021 and 2024 All-Star nominee. A prolific scorer for club and county.",
                    order=0,
                ),
                content.figures_items.model(
                    page=content,
                    name="Eoghan Callaghan",
                    role="2025 Championship Captain",
                    detail="Led the team to our third Senior Championship title in 2025.",
                    order=1,
                ),
                content.figures_items.model(
                    page=content,
                    name="Jim Mooney",
                    role="Club Legend",
                    detail="Prominent member of the 1966 Louth Leinster Junior Championship winning squad.",
                    order=2,
                ),
            ]
        )


def ensure_shop_page_defaults(content):
    if content.shops.exists():
        return

    content.shops.bulk_create(
        [
            content.shops.model(
                page=content,
                name="O'Neills",
                description="Official Club Gear & Leisurewear",
                detail="Browse and order official Naomh Mairtin CPG jerseys, training gear, and leisurewear directly from O'Neills - the GAA's trusted kit supplier.",
                url="https://www.oneills.com/catalogsearch/result/?q=naomh+mairtin",
                cta="Shop O'Neills",
                order=0,
            ),
            content.shops.model(
                page=content,
                name="Clear Cut Marketing",
                description="Official Club Merchandise & Apparel",
                detail="Personalised club merchandise, custom apparel, and supporter gear from our local marketing and print partner, Clear Cut Marketing.",
                url="https://clearcutmarketing.ie/",
                cta="Shop Clear Cut",
                is_logo=True,
                order=1,
            ),
            content.shops.model(
                page=content,
                name="Future Supplier",
                description="Coming Soon",
                detail="We are always looking to expand our range of official club gear. Stay tuned for new partnerships and exciting new merchandise options.",
                url="",
                cta="Coming Soon",
                is_placeholder=True,
                order=2,
            ),
        ]
    )


def ensure_lotto_page_defaults(content):
    if content.winners.exists():
        return

    content.winners.bulk_create(
        [
            content.winners.model(
                page=content,
                prize="3 Numbers - Match Prize",
                winner="P. Murphy, Monasterboice",
                amount="EUR50",
                order=0,
            ),
            content.winners.model(
                page=content,
                prize="3 Numbers - Match Prize",
                winner="S. O'Brien, Drogheda",
                amount="EUR50",
                order=1,
            ),
            content.winners.model(
                page=content,
                prize="Lucky Dip",
                winner="T. Brennan, Clogherhead",
                amount="EUR25",
                order=2,
            ),
        ]
    )


def sponsors_page_content_to_dict(content):
    return {
        "hero_eyebrow": content.hero_eyebrow,
        "hero_title": content.hero_title,
        "hero_description": content.hero_description,
        "section_eyebrow": content.section_eyebrow,
        "section_title": content.section_title,
        "section_description": content.section_description,
        "cta_title": content.cta_title,
        "cta_description": content.cta_description,
        "cta_button_text": content.cta_button_text,
        "cta_button_link": content.cta_button_link,
    }


def teams_page_content_to_dict(content):
    return {
        "hero_title": content.hero_title,
        "hero_subtitle": content.hero_subtitle,
        "hub_eyebrow": content.hub_eyebrow,
        "hub_title": content.hub_title,
        "hub_description": content.hub_description,
        "adult_title": content.adult_title,
        "adult_description": content.adult_description,
        "juvenile_title": content.juvenile_title,
        "juvenile_description": content.juvenile_description,
        "social_title": content.social_title,
        "social_description": content.social_description,
        "scor_title": content.scor_title,
        "scor_description": content.scor_description,
        "gallery_eyebrow": content.gallery_eyebrow,
        "gallery_title": content.gallery_title,
        "gallery_description": content.gallery_description,
    }


def fixtures_page_content_to_dict(content):
    return {
        "hero_title": content.hero_title,
        "hero_subtitle": content.hero_subtitle,
        "upcoming_title": content.upcoming_title,
        "upcoming_subtitle": content.upcoming_subtitle,
        "results_title": content.results_title,
        "results_subtitle": content.results_subtitle,
        "archive_cta_title": content.archive_cta_title,
        "archive_cta_description": content.archive_cta_description,
        "archive_cta_button_text": content.archive_cta_button_text,
    }


def history_page_content_to_dict(request, content):
    timeline_items = []
    for item in content.timeline_items.all():
        timeline_items.append(
            {
                "id": str(item.id),
                "year": item.year,
                "title": item.title,
                "description": item.description,
                "icon": item.icon,
                "image": media_url(request, item.image),
            }
        )

    figures_items = []
    for item in content.figures_items.all():
        figures_items.append(
            {
                "id": str(item.id),
                "name": item.name,
                "role": item.role,
                "detail": item.detail,
                "image": media_url(request, item.image),
            }
        )

    return {
        "hero_title": content.hero_title,
        "hero_subtitle": content.hero_subtitle,
        "intro_text": content.intro_text,
        "milestones_eyebrow": content.milestones_eyebrow,
        "timeline_items": timeline_items,
        "figures_eyebrow": content.figures_eyebrow,
        "figures_items": figures_items,
        "cta_title": content.cta_title,
        "cta_button_text": content.cta_button_text,
        "cta_button_link": content.cta_button_link,
    }


def shop_page_content_to_dict(request, content):
    return {
        "hero_eyebrow": content.hero_eyebrow,
        "hero_title": content.hero_title,
        "hero_highlight": content.hero_highlight,
        "hero_description": content.hero_description,
        "info_title": content.info_title,
        "info_description": content.info_description,
        "info_button_text": content.info_button_text,
        "info_button_link": content.info_button_link,
        "shops": [
            {
                "id": str(shop.id),
                "name": shop.name,
                "description": shop.description,
                "detail": shop.detail,
                "url": shop.url,
                "image": media_url(request, shop.image),
                "isLogo": shop.is_logo,
                "cta": shop.cta,
                "isPlaceholder": shop.is_placeholder,
            }
            for shop in content.shops.all()
        ],
    }


def lotto_page_content_to_dict(content):
    return {
        "hero_eyebrow": content.hero_eyebrow,
        "hero_title": content.hero_title,
        "hero_highlight": content.hero_highlight,
        "hero_description": content.hero_description,
        "jackpot_label": content.jackpot_label,
        "jackpot_amount": content.jackpot_amount,
        "next_draw_label": content.next_draw_label,
        "next_draw_date": content.next_draw_date,
        "buy_tickets_url": content.buy_tickets_url,
        "buy_tickets_text": content.buy_tickets_text,
        "app_download_url": content.app_download_url,
        "app_download_text": content.app_download_text,
        "helper_text": content.helper_text,
        "latest_results_title": content.latest_results_title,
        "latest_draw_date": content.latest_draw_date,
        "winning_numbers": [
            content.winning_number_1,
            content.winning_number_2,
            content.winning_number_3,
            content.winning_number_4,
        ],
        "jackpot_won": content.jackpot_won,
        "latest_jackpot_amount": content.latest_jackpot_amount,
        "winners_section_title": content.winners_section_title,
        "winners": [
            {
                "id": str(winner.id),
                "prize": winner.prize,
                "winner": winner.winner,
                "amount": winner.amount,
            }
            for winner in content.winners.all()
        ],
        "how_it_works_title": content.how_it_works_title,
        "bottom_cta_title": content.bottom_cta_title,
        "bottom_cta_description": content.bottom_cta_description,
    }


def juvenile_teams_page_content_to_dict(content):
    return {
        "hero_title": content.hero_title,
        "hero_subtitle": content.hero_subtitle,
        "intro_eyebrow": content.intro_eyebrow,
        "intro_title": content.intro_title,
        "intro_description": content.intro_description,
        "card_cta_text": content.card_cta_text,
        "modal_eyebrow": content.modal_eyebrow,
        "coaches_title": content.coaches_title,
        "no_coaches_text": content.no_coaches_text,
        "contact_email_title": content.contact_email_title,
        "training_times_title": content.training_times_title,
        "no_training_times_text": content.no_training_times_text,
    }


def events_page_content_to_dict(content):
    return {
        "hero_title": content.hero_title,
        "hero_subtitle": content.hero_subtitle,
    }


def apply_team_filters(queryset, team_filter, category_filter, prefix=""):
    if team_filter:
        queryset = queryset.filter(
            Q(**{f"{prefix}home_team__name__icontains": team_filter})
            | Q(**{f"{prefix}away_team__name__icontains": team_filter})
        )

    if category_filter:
        queryset = queryset.filter(
            Q(**{f"{prefix}home_team__category__iexact": category_filter})
            | Q(**{f"{prefix}away_team__category__iexact": category_filter})
        )

    return queryset


def sponsors_collection_api(request):
    if request.method == "OPTIONS":
        return options_response()

    if request.method == "GET":
        sponsors = [sponsor_to_dict(request, s) for s in Sponsor.objects.filter(is_active=True)]
        return json_response(sponsors, safe=False)

    return json_response({"error": "Method not allowed."}, status=405)


def sponsors_page_content_api(request):
    if request.method == "OPTIONS":
        return options_response()

    if request.method == "GET":
        content, _ = SponsorsPageContent.objects.get_or_create(pk=1)
        return json_response(sponsors_page_content_to_dict(content))

    return json_response({"error": "Method not allowed."}, status=405)


def shop_page_content_api(request):
    if request.method == "OPTIONS":
        return options_response()

    if request.method == "GET":
        content, _ = ShopPageContent.objects.get_or_create(pk=1)
        ensure_shop_page_defaults(content)
        return json_response(shop_page_content_to_dict(request, content))

    return json_response({"error": "Method not allowed."}, status=405)


def lotto_page_content_api(request):
    if request.method == "OPTIONS":
        return options_response()

    if request.method == "GET":
        content, _ = LottoPageContent.objects.get_or_create(pk=1)
        ensure_lotto_page_defaults(content)
        return json_response(lotto_page_content_to_dict(content))

    return json_response({"error": "Method not allowed."}, status=405)


def juvenile_teams_page_content_api(request):
    if request.method == "OPTIONS":
        return options_response()

    if request.method == "GET":
        content, _ = JuvenileTeamsPageContent.objects.get_or_create(pk=1)
        return json_response(juvenile_teams_page_content_to_dict(content))

    return json_response({"error": "Method not allowed."}, status=405)


def events_api(request):
    if request.method == "OPTIONS":
        return options_response()

    if request.method == "GET":
        category_filter = request.GET.get("category", "").strip()
        queryset = Event.objects.all()
        if category_filter:
            queryset = queryset.filter(category=category_filter)

        events = [event_to_dict(request, event) for event in queryset.order_by("date", "time")]
        return json_response(events, safe=False)

    return json_response({"error": "Method not allowed."}, status=405)


def events_page_content_api(request):
    if request.method == "OPTIONS":
        return options_response()

    if request.method == "GET":
        content, _ = EventsPageContent.objects.get_or_create(pk=1)
        return json_response(events_page_content_to_dict(content))

    return json_response({"error": "Method not allowed."}, status=405)


@csrf_exempt
def teams_page_content_api(request):
    if request.method == "OPTIONS":
        return options_response()

    if request.method == "GET":
        content, _ = TeamsPageContent.objects.get_or_create(pk=1)
        return json_response(teams_page_content_to_dict(content))

    if request.method == "PUT" or request.method == "PATCH":
        try:
            data = json.loads(request.body)
            content, _ = TeamsPageContent.objects.get_or_create(pk=1)
            fields = [
                "hero_title", "hero_subtitle", "hub_eyebrow", "hub_title", "hub_description",
                "adult_title", "adult_description", "juvenile_title", "juvenile_description",
                "social_title", "social_description", "scor_title", "scor_description",
                "gallery_eyebrow", "gallery_title", "gallery_description"
            ]
            for field in fields:
                if field in data:
                    setattr(content, field, data[field])
            content.save()
            return json_response(teams_page_content_to_dict(content))
        except Exception as e:
            return json_response({"error": str(e)}, status=400)

    return json_response({"error": "Method not allowed."}, status=405)


@csrf_exempt
def fixtures_page_content_api(request):
    if request.method == "OPTIONS":
        return options_response()

    if request.method == "GET":
        content, _ = FixturesPageContent.objects.get_or_create(pk=1)
        return json_response(fixtures_page_content_to_dict(content))

    if request.method == "PUT" or request.method == "PATCH":
        try:
            data = json.loads(request.body)
            content, _ = FixturesPageContent.objects.get_or_create(pk=1)
            fields = [
                "hero_title", "hero_subtitle", "upcoming_title", "upcoming_subtitle",
                "results_title", "results_subtitle", "archive_cta_title",
                "archive_cta_description", "archive_cta_button_text"
            ]
            for field in fields:
                if field in data:
                    setattr(content, field, data[field])
            content.save()
            return json_response(fixtures_page_content_to_dict(content))
        except Exception as e:
            return json_response({"error": str(e)}, status=400)

    return json_response({"error": "Method not allowed."}, status=405)


@csrf_exempt
def history_page_content_api(request):
    if request.method == "OPTIONS":
        return options_response()

    if request.method == "GET":
        content, _ = HistoryPageContent.objects.get_or_create(pk=1)
        ensure_history_page_defaults(content)
        return json_response(history_page_content_to_dict(request, content))

    return json_response({"error": "Method not allowed."}, status=405)


def fixtures_api(request):
    if request.method == "OPTIONS":
        return options_response()

    if request.method == "GET":
        team_filter = request.GET.get("team", "").strip()
        category_filter = request.GET.get("category", "").strip().lower()
        queryset = Fixture.objects.select_related("home_team", "away_team", "result")
        queryset = apply_team_filters(queryset, team_filter, category_filter)
        fixtures = [fixture_to_dict(request, fixture) for fixture in queryset.order_by("date", "id")]
        return json_response(fixtures, safe=False)

    return json_response({"error": "Method not allowed."}, status=405)


def results_api(request):
    if request.method == "OPTIONS":
        return options_response()

    if request.method == "GET":
        team_filter = request.GET.get("team", "").strip()
        category_filter = request.GET.get("category", "").strip().lower()
        queryset = Result.objects.select_related("fixture", "fixture__home_team", "fixture__away_team")
        queryset = apply_team_filters(queryset, team_filter, category_filter, prefix="fixture__")
        results = [result_to_dict(request, result) for result in queryset.order_by("-fixture__date", "-id")]
        return json_response(results, safe=False)

    return json_response({"error": "Method not allowed."}, status=405)


@csrf_exempt
def teams_api(request):
    if request.method == "OPTIONS":
        return options_response()

    if request.method == "GET":
        category_filter = request.GET.get("category", "").strip().lower()
        internal_filter = request.GET.get("internal", "").strip().lower()

        queryset = Team.objects.all()

        if category_filter:
            queryset = queryset.filter(category=category_filter)

        if internal_filter == "true":
            queryset = queryset.filter(is_internal=True)
        elif internal_filter == "false":
            queryset = queryset.filter(is_internal=False)

        teams = [team_to_dict(request, team) for team in queryset]
        return json_response(teams, safe=False)

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            team = Team.objects.create(
                name=data.get("name"),
                slug=data.get("slug"),
                category=data.get("category", "adult"),
                contact_email=data.get("contact_email"),
                is_internal=data.get("is_internal", True),
                managers=data.get("managers", []),
                training_times=data.get("training_times", []),
            )
            return json_response(team_to_dict(request, team), status=201)
        except Exception as e:
            return json_response({"error": str(e)}, status=400)

    return json_response({"error": "Method not allowed."}, status=405)


@csrf_exempt
def team_detail_api(request, pk):
    if request.method == "OPTIONS":
        return options_response()

    try:
        team = Team.objects.get(pk=pk)
    except Team.DoesNotExist:
        return json_response({"error": "Team not found."}, status=404)

    if request.method == "GET":
        return json_response(team_to_dict(request, team))

    if request.method == "PUT" or request.method == "PATCH":
        try:
            data = json.loads(request.body)
            if "name" in data: team.name = data["name"]
            if "slug" in data: team.slug = data["slug"]
            if "category" in data: team.category = data["category"]
            if "contact_email" in data: team.contact_email = data["contact_email"]
            if "is_internal" in data: team.is_internal = data["is_internal"]
            if "managers" in data: team.managers = data["managers"]
            if "training_times" in data: team.training_times = data["training_times"]
            
            team.save()
            return json_response(team_to_dict(request, team))
        except Exception as e:
            return json_response({"error": str(e)}, status=400)

    if request.method == "DELETE":
        team.delete()
        return json_response({"message": "Team deleted successfully."}, status=204)

    return json_response({"error": "Method not allowed."}, status=405)
