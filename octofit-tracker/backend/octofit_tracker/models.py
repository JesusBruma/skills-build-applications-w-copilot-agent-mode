from djongo import models


class User(models.Model):
    _id = models.ObjectIdField()
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    team = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.username


class Team(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100, unique=True)
    members = models.JSONField(default=list)

    def __str__(self):
        return self.name


class Activity(models.Model):
    _id = models.ObjectIdField()
    username = models.CharField(max_length=150)
    activity_type = models.CharField(max_length=50)
    duration = models.IntegerField()  # minutos
    calories = models.IntegerField()

    def __str__(self):
        return f"{self.username} - {self.activity_type}"


class Leaderboard(models.Model):
    _id = models.ObjectIdField()
    team = models.CharField(max_length=100)
    points = models.IntegerField()

    def __str__(self):
        return f"{self.team} - {self.points}"


class Workout(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(max_length=20)

    def __str__(self):
        return self.name
