from django.db.models import Sum, Avg, Max, Count, Q
from django.utils import timezone
from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Expense
from .serializers import ExpenseSerializer


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        expense = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def dashboard(self, request):
        expenses = Expense.objects.all()
        total_expenses = expenses.aggregate(total=Sum('amount'))['total'] or 0
        transaction_count = expenses.count()
        average_expense = expenses.aggregate(avg=Avg('amount'))['avg'] or 0
        highest_expense = expenses.aggregate(highest=Max('amount'))['highest'] or 0

        recent_expenses = ExpenseSerializer(expenses.order_by('-created_at')[:5], many=True).data
        category_summary = list(
            expenses.values('category').annotate(total=Sum('amount'), count=Count('id')).order_by('-total')
        )
        monthly_summary = list(
            expenses.extra({'month': "strftime('%%Y-%%m', expense_date)"})
            .values('month')
            .annotate(total=Sum('amount'), count=Count('id'))
            .order_by('month')
        )

        return Response({
            'total_expenses': float(total_expenses),
            'transaction_count': transaction_count,
            'average_expense': float(average_expense),
            'highest_expense': float(highest_expense),
            'recent_expenses': recent_expenses,
            'category_summary': category_summary,
            'monthly_summary': monthly_summary,
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def search(self, request):
        queryset = Expense.objects.all()
        search_term = request.query_params.get('q', '').strip()
        category = request.query_params.get('category', '')
        payment_method = request.query_params.get('payment_method', '')
        date_from = request.query_params.get('date_from', '')
        date_to = request.query_params.get('date_to', '')
        sort_by = request.query_params.get('sort_by', 'newest')

        if search_term:
            queryset = queryset.filter(Q(title__icontains=search_term) | Q(description__icontains=search_term))

        if category:
            queryset = queryset.filter(category=category)

        if payment_method:
            queryset = queryset.filter(payment_method=payment_method)

        if date_from:
            queryset = queryset.filter(expense_date__gte=date_from)

        if date_to:
            queryset = queryset.filter(expense_date__lte=date_to)

        if sort_by == 'oldest':
            queryset = queryset.order_by('expense_date', 'created_at')
        elif sort_by == 'highest':
            queryset = queryset.order_by('-amount', '-expense_date')
        elif sort_by == 'lowest':
            queryset = queryset.order_by('amount', 'expense_date')
        else:
            queryset = queryset.order_by('-expense_date', '-created_at')

        serializer = ExpenseSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
