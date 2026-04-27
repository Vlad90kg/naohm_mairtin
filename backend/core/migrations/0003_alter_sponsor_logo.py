from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0002_sponsor_logo"),
    ]

    operations = [
        migrations.AlterField(
            model_name="sponsor",
            name="logo",
            field=models.FileField(blank=True, upload_to="sponsors/"),
        ),
    ]
