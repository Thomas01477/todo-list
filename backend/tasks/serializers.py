from rest_framework import serializers
from .models import Category, Task


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class TaskSerializer(serializers.ModelSerializer):
    # Champ en lecture seule pour afficher le nom de la catégorie
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Task
        fields = ["id", "description", "is_completed", "created_at", "category", "category_name"]
