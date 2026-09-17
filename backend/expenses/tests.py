from decimal import Decimal

from django.core.exceptions import ValidationError
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Expense


class ExpenseModelTestCase(APITestCase):
    def test_expense_amount_must_be_positive(self):
        expense = Expense(
            title='Milk',
            description='Groceries',
            amount=Decimal('0.00'),
            category='Food',
            payment_method='Cash',
            expense_date='2026-09-01',
        )

        with self.assertRaises(ValidationError):
            expense.full_clean()

    def test_list_expenses_endpoint_returns_records(self):
        Expense.objects.create(
            title='Bus fare',
            description='Office commute',
            amount=Decimal('120.00'),
            category='Travel',
            payment_method='UPI',
            expense_date='2026-09-05',
        )

        response = self.client.get(reverse('expense-list'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)
        self.assertEqual(response.data[0]['title'], 'Bus fare')

    def test_create_expense_endpoint_creates_record(self):
        payload = {
            'title': 'Lunch',
            'description': 'Team lunch',
            'amount': '250.50',
            'category': 'Food',
            'payment_method': 'Debit Card',
            'expense_date': '2026-09-10',
        }

        response = self.client.post(reverse('expense-list'), payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Expense.objects.count(), 1)
        self.assertEqual(Expense.objects.first().title, 'Lunch')

    def test_create_expense_endpoint_rejects_zero_amount(self):
        payload = {
            'title': 'Invalid Entry',
            'description': 'Zero amount should fail',
            'amount': '0.00',
            'category': 'Bills',
            'payment_method': 'Bank Transfer',
            'expense_date': '2026-09-12',
        }

        response = self.client.post(reverse('expense-list'), payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('amount', response.data)

    def test_dashboard_endpoint_returns_summary_values(self):
        Expense.objects.create(
            title='Internet bill',
            description='Monthly internet',
            amount=Decimal('999.00'),
            category='Bills',
            payment_method='Credit Card',
            expense_date='2026-09-01',
        )
        Expense.objects.create(
            title='Movie tickets',
            description='Weekend outing',
            amount=Decimal('400.00'),
            category='Entertainment',
            payment_method='UPI',
            expense_date='2026-09-08',
        )

        response = self.client.get(reverse('expense-dashboard'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['transaction_count'], 2)
        self.assertEqual(float(response.data['total_expenses']), 1399.0)
        self.assertEqual(float(response.data['highest_expense']), 999.0)

    def test_search_endpoint_filters_by_term(self):
        Expense.objects.create(
            title='Coffee',
            description='Morning brew',
            amount=Decimal('40.00'),
            category='Food',
            payment_method='Cash',
            expense_date='2026-09-03',
        )
        Expense.objects.create(
            title='Train pass',
            description='Weekly travel',
            amount=Decimal('180.00'),
            category='Travel',
            payment_method='UPI',
            expense_date='2026-09-09',
        )

        response = self.client.get(reverse('expense-search'), {'q': 'coffee'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Coffee')
