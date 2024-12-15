from rest_framework import serializers
from main.models import Country, CountryCriteria

class CountryCriteriaSerializer(serializers.ModelSerializer):
    criteria_name = serializers.CharField(source='criteria.name', read_only=True)

    class Meta:
        model = CountryCriteria
        fields = ['id', 'country', 'criteria', 'score', 'criteria_name']  # Include 'criteria_name' here
        
        
class CountrySerializer(serializers.ModelSerializer):
    criteria = serializers.SerializerMethodField()

    class Meta:
        model = Country
        fields = ['id', 'name', 'description', 'match_percentage', 'image_url', 'criteria', 'overall_score']

    def get_criteria(self, obj):
        criteria_scores = CountryCriteria.objects.filter(country=obj)
        return CountryCriteriaSerializer(criteria_scores, many=True).data