from django.db import migrations, models


def move_history_json_to_rows(apps, schema_editor):
    HistoryPageContent = apps.get_model("core", "HistoryPageContent")
    HistoryTimelineItem = apps.get_model("core", "HistoryTimelineItem")
    HistoryFigureItem = apps.get_model("core", "HistoryFigureItem")

    for page in HistoryPageContent.objects.values("id", "timeline_items", "figures_items"):
        for index, item in enumerate(page.get("timeline_items") or []):
            HistoryTimelineItem.objects.create(
                page_id=page["id"],
                year=item.get("year", ""),
                title=item.get("title", ""),
                description=item.get("description", ""),
                icon=item.get("icon", "users"),
                order=index,
            )

        for index, item in enumerate(page.get("figures_items") or []):
            HistoryFigureItem.objects.create(
                page_id=page["id"],
                name=item.get("name", ""),
                role=item.get("role", ""),
                detail=item.get("detail", ""),
                order=index,
            )


def noop_reverse(apps, schema_editor):
    return None


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0010_historypagecontent"),
    ]

    operations = [
        migrations.CreateModel(
            name="HistoryFigureItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200)),
                ("role", models.CharField(max_length=200)),
                ("detail", models.TextField()),
                ("image", models.ImageField(blank=True, null=True, upload_to="history/figures/")),
                ("order", models.PositiveIntegerField(default=0)),
                (
                    "page",
                    models.ForeignKey(on_delete=models.deletion.CASCADE, related_name="figures_items", to="core.historypagecontent"),
                ),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="HistoryTimelineItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("year", models.CharField(max_length=40)),
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField()),
                (
                    "icon",
                    models.CharField(
                        choices=[("users", "Users"), ("shield", "Shield"), ("star", "Star"), ("trophy", "Trophy"), ("award", "Award")],
                        default="users",
                        max_length=20,
                    ),
                ),
                ("image", models.ImageField(blank=True, null=True, upload_to="history/timeline/")),
                ("order", models.PositiveIntegerField(default=0)),
                (
                    "page",
                    models.ForeignKey(on_delete=models.deletion.CASCADE, related_name="timeline_items", to="core.historypagecontent"),
                ),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.RunPython(move_history_json_to_rows, noop_reverse),
        migrations.RemoveField(model_name="historypagecontent", name="figures_items"),
        migrations.RemoveField(model_name="historypagecontent", name="timeline_items"),
    ]
