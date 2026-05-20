from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout

class UserSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='_id', read_only=True)
    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'team']

class TeamSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='_id', read_only=True)
    class Meta:
        model = Team
        fields = ['_id', 'name', 'members']

class ActivitySerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='_id', read_only=True)
    class Meta:
        model = Activity
        fields = ['_id', 'username', 'activity_type', 'duration', 'calories']

class LeaderboardSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='_id', read_only=True)
    class Meta:
        model = Leaderboard
        fields = ['_id', 'team', 'points']

class WorkoutSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='_id', read_only=True)
    class Meta:
        model = Workout
        fields = ['_id', 'name', 'description', 'difficulty']
