from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0005_sponsorspagecontent"),
    ]

    operations = [
        migrations.CreateModel(
            name="Team",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120, unique=True)),
                ("category", models.CharField(choices=[("adult", "Adult"), ("juvenile", "Juvenile")], max_length=20)),
            ],
            options={
                "ordering": ["category", "name"],
            },
        ),
        migrations.CreateModel(
            name="Fixture",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("date", models.DateTimeField()),
                ("location", models.CharField(max_length=255)),
                ("competition", models.CharField(max_length=255)),
                (
                    "away_team",
                    models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="away_fixtures", to="core.team"),
                ),
                (
                    "home_team",
                    models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="home_fixtures", to="core.team"),
                ),
            ],
            options={
                "ordering": ["date", "id"],
            },
        ),
        migrations.CreateModel(
            name="Result",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("home_score", models.CharField(max_length=20)),
                ("away_score", models.CharField(max_length=20)),
                (
                    "status",
                    models.CharField(choices=[("final", "Final"), ("postponed", "Postponed"), ("abandoned", "Abandoned")], default="final", max_length=20),
                ),
                (
                    "fixture",
                    models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="result", to="core.fixture"),
                ),
            ],
            options={
                "ordering": ["-fixture__date", "-id"],
            },
        ),
    ]
