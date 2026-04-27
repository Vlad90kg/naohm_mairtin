from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_alter_sponsor_logo"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="sponsor",
            options={"ordering": ["tier", "name"]},
        ),
    ]
