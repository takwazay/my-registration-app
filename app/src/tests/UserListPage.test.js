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

  test('renders user list with correct columns', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce([]),
    });

    render(
      <Router>
        <UserListPage />
        <ToastContainer />
      </Router>
    );

    // Check if all columns are rendered
    expect(screen.getByText('Prénom')).toBeInTheDocument();
    expect(screen.getByText('Nom de famille')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Date de naissance')).toBeInTheDocument();
    expect(screen.getByText('Ville')).toBeInTheDocument();
    expect(screen.getByText('Code postal')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  test('calls deleteUser function when delete button is clicked', async () => {
    const mockUsers = [
      {
        id: 1,
        firstName: 'Takwa',
        lastName: 'Zayene',
        email: 'Takwa.doe@example.com',
        dateOfBirth: '1990-01-01',
        city: 'New York',
        postalCode: '10001',
      },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockUsers),
    });

    render(
      <Router>
        <UserListPage />
        <ToastContainer />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Takwa')).toBeInTheDocument();
    });

    fetch.mockResolvedValueOnce({ ok: true });

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
    });
  });

  test('fetchUsers is called and sets users correctly', async () => {
    const mockUsers = [
      {
        id: 1,
        firstName: 'Takwa',
        lastName: 'Zayene',
        email: 'Takwa.doe@example.com',
        dateOfBirth: '1990-01-01',
        city: 'New York',
        postalCode: '10001',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Zayene',
        email: 'jane.doe@example.com',
        dateOfBirth: '1992-02-02',
        city: 'Los Angeles',
        postalCode: '90001',
      },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockUsers),
    });

    render(
      <Router>
        <UserListPage />
        <ToastContainer />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Takwa')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith(`http://127.0.0.1:${process.env.REACT_APP_SERVER_PORT}/users`);
  });

  test('fetchUsers handles error correctly', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <Router>
        <UserListPage />
        <ToastContainer />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Erreur lors de la récupération des utilisateurs')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith(`http://127.0.0.1:${process.env.REACT_APP_SERVER_PORT}/users`);
  });
});
