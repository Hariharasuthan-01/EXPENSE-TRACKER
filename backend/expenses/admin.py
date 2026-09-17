from django.contrib import admin
from .models import Expense


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'category', 'amount', 'payment_method', 'expense_date']
    list_filter = ['category', 'payment_method', 'expense_date']
    search_fields = ['title', 'description']
