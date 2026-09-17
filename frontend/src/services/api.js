const API_BASE_URL = 'http://localhost:8000/api';

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = 'Something went wrong while contacting the server.';
    try {
      const data = await response.json();
      if (data && typeof data === 'object') {
        const firstError = Object.values(data).flat().find(Boolean);
        if (firstError) {
          message = firstError;
        }
      }
    } catch (error) {
      // Ignore parsing errors for non-JSON responses.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const fetchDashboard = () => request('/expenses/dashboard/');

export const fetchExpenses = (queryParams = '') => {
  const url = queryParams ? `/expenses/search/?${queryParams}` : '/expenses/';
  return request(url);
};

export const fetchExpenseById = (id) => request(`/expenses/${id}/`);

export const createExpense = (payload) =>
  request('/expenses/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateExpense = (id, payload) =>
  request(`/expenses/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteExpense = (id) =>
  request(`/expenses/${id}/`, {
    method: 'DELETE',
  });
