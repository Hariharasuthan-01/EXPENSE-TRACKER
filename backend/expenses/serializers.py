from rest_framework import serializers
from .models import Expense


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = [
            'id',
            'title',
            'description',
            'amount',
            'category',
            'payment_method',
            'expense_date',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_title(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('Title cannot be empty.')
        return value.strip()

    def validate_amount(self, value):
        if value is None:
            raise serializers.ValidationError('Please enter an expense amount.')
        if value <= 0:
            raise serializers.ValidationError('Amount must be greater than 0.')
        return value

    def validate_category(self, value):
        if not value:
            raise serializers.ValidationError('Please select a category.')
        return value

    def validate_payment_method(self, value):
        if not value:
            raise serializers.ValidationError('Please select a payment method.')
        return value

    def validate_expense_date(self, value):
        if value is None:
            raise serializers.ValidationError('Please enter an expense date.')
        return value
