from django.urls import path
from .views import (
    events_api,
    events_page_content_api,
    fixtures_api,
    fixtures_page_content_api,
    history_page_content_api,
    juvenile_teams_page_content_api,
    lotto_page_content_api,
    results_api,
    shop_page_content_api,
    sponsors_collection_api,
    sponsors_page_content_api,
    team_detail_api,
    teams_api,
    teams_page_content_api,
)

urlpatterns = [
    path("events/", events_api),
    path("pages/events/", events_page_content_api),
    path("sponsors/", sponsors_collection_api),
    path("pages/sponsors/", sponsors_page_content_api),
    path("pages/lotto/", lotto_page_content_api),
    path("pages/juvenile-teams/", juvenile_teams_page_content_api),
    path("pages/shop/", shop_page_content_api),
    path("pages/teams/", teams_page_content_api),
    path("pages/fixtures/", fixtures_page_content_api),
    path("pages/history/", history_page_content_api),
    path("fixtures/", fixtures_api),
    path("results/", results_api),
    path("teams/", teams_api),
    path("teams/<int:pk>/", team_detail_api),
]
