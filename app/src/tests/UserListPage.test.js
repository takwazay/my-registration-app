import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserListPage from '../components/UserListPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Mock the fetch function
global.fetch = jest.fn();

describe('UserListPage', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders user list', async () => {
    const mockUsers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        dateOfBirth: '1990-01-01',
        city: 'New York',
        postalCode: '10001',
      },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockUsers),
    });

    render(
      <Router>
        <UserListPage />
        <ToastContainer />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('01/01/1990')).toBeInTheDocument();
      expect(screen.getByText('New York')).toBeInTheDocument();
      expect(screen.getByText('10001')).toBeInTheDocument();
    });
  });

  test('deletes a user', async () => {
    const mockUsers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        dateOfBirth: '1990-01-01',
        city: 'New York',
        postalCode: '10001',
      },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockUsers),
    });

    render(
      <Router>
        <UserListPage />
        <ToastContainer />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    fetch.mockResolvedValueOnce({});

    const deleteButton = screen.getByRole('button', { name: /Supprimer/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `http://127.0.0.1:${process.env.REACT_APP_SERVER_PORT}/users/1`,
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'api-key': 'delete',
          }),
        })
      );
      expect(screen.queryByText('John')).not.toBeInTheDocument();
    });
  });

  test('displays an error message when fetching users fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <Router>
        <UserListPage />
        <ToastContainer />
      </Router>
    );

    await waitFor(() => {
      const errorToast = screen.getByText(/Erreur lors de la récupération des utilisateurs/i);
      expect(errorToast).toBeInTheDocument();
    });
  });

  test('displays an error message when deleting a user fails', async () => {
    const mockUsers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        dateOfBirth: '1990-01-01',
        city: 'New York',
        postalCode: '10001',
      },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockUsers),
    });

    render(
      <Router>
        <UserListPage />
        <ToastContainer />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    fetch.mockRejectedValueOnce(new Error('Failed to delete'));

    const deleteButton = screen.getByRole('button', { name: /Supprimer/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const errorToast = screen.getByText(/Erreur lors de la suppression de l'utilisateur/i);
      expect(errorToast).toBeInTheDocument();
    });
  });
});
