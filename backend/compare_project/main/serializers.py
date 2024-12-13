from rest_framework import serializers
from main.models import Country, CountryCriteria

class CountryCriteriaSerializer(serializers.ModelSerializer):
    criteria_name = serializers.CharField(source='criteria.name')

    class Meta:
        model = CountryCriteria
        fields = ['criteria_name', 'score']

class CountrySerializer(serializers.ModelSerializer):
    criteria = serializers.SerializerMethodField()

    class Meta:
        model = Country
        fields = ['name', 'description', 'criteria']

    def get_criteria(self, obj):
        criteria_scores = CountryCriteria.objects.filter(country=obj)
        return CountryCriteriaSerializer(criteria_scores, many=True).data