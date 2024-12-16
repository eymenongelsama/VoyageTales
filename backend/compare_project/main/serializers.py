from rest_framework import serializers
from main.models import Country, CountryCriteria, CountryFeature

class CountryFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryFeature
        fields = ['id', 'feature']

class CountryCriteriaSerializer(serializers.ModelSerializer):
    criteria_name = serializers.CharField(source='criteria.name', read_only=True)

    class Meta:
        model = CountryCriteria
        fields = ['id', 'country', 'criteria', 'score', 'criteria_name']  # Include 'criteria_name' here
        
        
class CountrySerializer(serializers.ModelSerializer):
    criteria = CountryCriteriaSerializer(many=True, read_only=True, source='countrycriteria_set')
    features = CountryFeatureSerializer(many=True, read_only=True)  # Yeni eklenen özellikler

    class Meta:
        model = Country
        fields = ['id',
                  'name',
                  'description',
                  'match_percentage',
                  'image_url',
                  'criteria',
                  'overall_score',
                  'features'
                  ]

    def get_criteria(self, obj):
        criteria_scores = CountryCriteria.objects.filter(country=obj)
        return CountryCriteriaSerializer(criteria_scores, many=True).data
    
    
    
class CountryListSerializer(serializers.ModelSerializer):
    features = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='feature'
    )

    class Meta:
        model = Country
        fields = [
            'id', 
            'name', 
            'description', 
            'match_percentage', 
            'image_url', 
            'features',
            'overall_score'
        ]