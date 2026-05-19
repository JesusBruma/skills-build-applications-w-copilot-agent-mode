from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Eliminar datos existentes
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Crear equipos
        Team.objects.create(name='Marvel', members=['ironman', 'spiderman', 'thor', 'blackwidow', 'hulk'])
        Team.objects.create(name='DC', members=['batman', 'superman', 'wonderwoman', 'flash', 'aquaman'])

        # Crear usuarios superhéroes
        superheroes = [
            {'username': 'ironman', 'email': 'ironman@marvel.com', 'password': 'avengers1234', 'team': 'Marvel'},
            {'username': 'spiderman', 'email': 'spiderman@marvel.com', 'password': 'webshooter1234', 'team': 'Marvel'},
            {'username': 'thor', 'email': 'thor@marvel.com', 'password': 'mjolnir1234', 'team': 'Marvel'},
            {'username': 'blackwidow', 'email': 'blackwidow@marvel.com', 'password': 'widow1234', 'team': 'Marvel'},
            {'username': 'hulk', 'email': 'hulk@marvel.com', 'password': 'smash1234', 'team': 'Marvel'},
            {'username': 'batman', 'email': 'batman@dc.com', 'password': 'gotham1234', 'team': 'DC'},
            {'username': 'superman', 'email': 'superman@dc.com', 'password': 'krypton1234', 'team': 'DC'},
            {'username': 'wonderwoman', 'email': 'wonderwoman@dc.com', 'password': 'amazon1234', 'team': 'DC'},
            {'username': 'flash', 'email': 'flash@dc.com', 'password': 'speedforce1234', 'team': 'DC'},
            {'username': 'aquaman', 'email': 'aquaman@dc.com', 'password': 'atlantis1234', 'team': 'DC'},
        ]
        for hero in superheroes:
            User.objects.create(
                username=hero['username'],
                email=hero['email'],
                password=hero['password'],
                team=hero['team'],
            )

        # Crear actividades
        activities = [
            {'username': 'ironman', 'activity_type': 'flight training', 'duration': 60, 'calories': 800},
            {'username': 'spiderman', 'activity_type': 'web swinging', 'duration': 45, 'calories': 600},
            {'username': 'thor', 'activity_type': 'hammer throw', 'duration': 30, 'calories': 500},
            {'username': 'blackwidow', 'activity_type': 'martial arts', 'duration': 60, 'calories': 700},
            {'username': 'hulk', 'activity_type': 'smashing', 'duration': 20, 'calories': 1200},
            {'username': 'batman', 'activity_type': 'combat training', 'duration': 90, 'calories': 900},
            {'username': 'superman', 'activity_type': 'flying', 'duration': 60, 'calories': 500},
            {'username': 'wonderwoman', 'activity_type': 'lasso training', 'duration': 45, 'calories': 650},
            {'username': 'flash', 'activity_type': 'running', 'duration': 10, 'calories': 1000},
            {'username': 'aquaman', 'activity_type': 'swimming', 'duration': 60, 'calories': 700},
        ]
        for act in activities:
            Activity.objects.create(**act)

        # Crear leaderboard
        Leaderboard.objects.create(team='Marvel', points=4800)
        Leaderboard.objects.create(team='DC', points=4750)

        # Crear workouts
        workouts = [
            {'name': 'Superhero Strength', 'description': 'Entrenamiento de fuerza para superhéroes', 'difficulty': 'hard'},
            {'name': 'Speed Force Run', 'description': 'Carrera de velocidad extrema', 'difficulty': 'extreme'},
            {'name': 'Aerial Combat', 'description': 'Combate aéreo y vuelo', 'difficulty': 'hard'},
            {'name': 'Stealth Training', 'description': 'Entrenamiento de sigilo y agilidad', 'difficulty': 'medium'},
            {'name': 'Aquatic Endurance', 'description': 'Resistencia acuática bajo presión', 'difficulty': 'medium'},
        ]
        for workout in workouts:
            Workout.objects.create(**workout)

        self.stdout.write(self.style.SUCCESS('La base de datos octofit_db ha sido poblada con datos de prueba de superhéroes.'))
