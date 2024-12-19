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
        fields = [
            'id',
            'name',
            'criteria',
            'match_percentage',
            'overall_score',
            'image',
            'latitude',
            'longitude',
            'capital',
            'population',
            'currency',
            'language',
            'long_description',
            'last_updated',
            'flag',
            'features',
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
            'image', 
            'features',
            'overall_score'
        ]
        
    def get_image_url(self, obj):
        request = self.context.get('request')  # Tam URL oluşturmak için isteği alın
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return request.build_absolute_uri('/media/defaults/default_world_image.jpg')