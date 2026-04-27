from django.db import migrations, models


def default_history_timeline_items():
    return [
        {
            "id": "timeline-1",
            "year": "1957",
            "title": "Club Foundation",
            "description": "Established in Monasterboice, based at Pairc Naomh Mairtin, Silloge. The beginning of 'The Jocks'.",
            "icon": "users",
            "image": "",
        },
        {
            "id": "timeline-2",
            "year": "1980",
            "title": "Junior Clean Sweep",
            "description": "A landmark unbeaten year winning the Junior Shield, League, and Championship.",
            "icon": "shield",
            "image": "",
        },
        {
            "id": "timeline-3",
            "year": "2018-19",
            "title": "Senior Contenders",
            "description": "Reached consecutive Senior Championship finals, establishing the club as a top-tier force.",
            "icon": "star",
            "image": "",
        },
        {
            "id": "timeline-4",
            "year": "2020",
            "title": "First Senior Title",
            "description": "Won the first-ever Louth Senior Football Championship (Joe Ward Cup) defeating St Mary's.",
            "icon": "trophy",
            "image": "",
        },
        {
            "id": "timeline-5",
            "year": "2021",
            "title": "Back-to-Back Champions",
            "description": "Secured consecutive county titles with victory over St Mochta's.",
            "icon": "award",
            "image": "",
        },
        {
            "id": "timeline-6",
            "year": "2025",
            "title": "Third Joe Ward Cup",
            "description": "Defeated Newtown Blues to claim a third Senior Title, cementing dominance in Louth.",
            "icon": "trophy",
            "image": "",
        },
    ]


def default_history_figures_items():
    return [
        {
            "id": "figure-1",
            "name": "Sam Mulroy",
            "role": "Louth Captain & All-Star Nominee",
            "detail": "Captained Louth since 2021 and 2024 All-Star nominee. A prolific scorer for club and county.",
            "image": "",
        },
        {
            "id": "figure-2",
            "name": "Eoghan Callaghan",
            "role": "2025 Championship Captain",
            "detail": "Led the team to our third Senior Championship title in 2025.",
            "image": "",
        },
        {
            "id": "figure-3",
            "name": "Jim Mooney",
            "role": "Club Legend",
            "detail": "Prominent member of the 1966 Louth Leinster Junior Championship winning squad.",
            "image": "",
        },
    ]


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0009_fixturespagecontent_archive_cta_button_text_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="HistoryPageContent",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("hero_title", models.CharField(default="Club History", max_length=200)),
                ("hero_subtitle", models.CharField(default='Naomh Mairtin GAA - "The Jocks"', max_length=200)),
                (
                    "intro_text",
                    models.TextField(
                        default="Founded in 1957 in Monasterboice, Co. Louth, Naomh Mairtin GFC has risen to become a dominant force in Louth football, achieving historic success with three Senior Championship titles in the 2020s."
                    ),
                ),
                ("milestones_eyebrow", models.CharField(default="Key Milestones", max_length=80)),
                ("timeline_items", models.JSONField(blank=True, default=default_history_timeline_items)),
                ("figures_eyebrow", models.CharField(default="Notable Figures", max_length=80)),
                ("figures_items", models.JSONField(blank=True, default=default_history_figures_items)),
                ("cta_title", models.CharField(default="Be part of our future", max_length=200)),
                ("cta_button_text", models.CharField(default="Join the Club", max_length=80)),
                (
                    "cta_button_link",
                    models.CharField(
                        default="https://play.google.com/store/apps/details?id=app.clubspot.naomh.mairtin.gfc",
                        max_length=255,
                    ),
                ),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "History page content",
                "verbose_name_plural": "History page content",
            },
        ),
    ]
