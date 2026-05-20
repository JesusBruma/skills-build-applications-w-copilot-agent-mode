from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelSmokeTest(TestCase):
    def test_user_creation(self):
        user = User.objects.create(username='test', email='test@test.com', password='1234', team='Marvel')
        self.assertEqual(user.username, 'test')

    def test_team_creation(self):
        team = Team.objects.create(name='TestTeam', members=['test'])
        self.assertEqual(team.name, 'TestTeam')

    def test_activity_creation(self):
        Activity.objects.create(username='test', activity_type='run', duration=10, calories=100)
        self.assertEqual(Activity.objects.count(), 1)

    def test_leaderboard_creation(self):
        Leaderboard.objects.create(team='TestTeam', points=100)
        self.assertEqual(Leaderboard.objects.count(), 1)

    def test_workout_creation(self):
        Workout.objects.create(name='TestWorkout', description='desc', difficulty='easy')
        self.assertEqual(Workout.objects.count(), 1)
