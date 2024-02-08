import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import Form from "../components/Form";

describe('Form Component Tests', () => {

    test('Form displays correctly with all inputs, title, and button', () => {
        render(<Form />);
    
        // Check if the title is displayed
        const title = screen.getByText(/formulaire d'inscription/i);
        expect(title).toBeInTheDocument();
    
        // Check if all input fields are displayed
        const firstNameInput = screen.getByLabelText('Prénom');
        const lastNameInput = screen.getByLabelText('Nom de famille');
        const emailInput = screen.getByLabelText('Email');
        const dateOfBirthInput = screen.getByLabelText('Date de naissance');
        const cityInput = screen.getByLabelText('Ville');
        const postalCodeInput = screen.getByLabelText('Code postal');
        expect(firstNameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(dateOfBirthInput).toBeInTheDocument();
        expect(cityInput).toBeInTheDocument();
        expect(postalCodeInput).toBeInTheDocument();
    
        // Check if the submit button is displayed
        const submitButton = screen.getByRole('button', { name: /enregistrer/i });
        expect(submitButton).toBeInTheDocument();
      });

  test('Button is disabled when fields are not filled', () => {
    render(<Form />);
    const button = screen.getByRole('button', { name: /Enregistrer/i });
    expect(button).toBeDisabled();
  });

  test('Form submission saves data to local storage and displays success toast', () => {
    render(<Form />);
    const firstNameInput = screen.getByLabelText('Prénom');
    const lastNameInput = screen.getByLabelText('Nom de famille');
    const emailInput = screen.getByLabelText('Email');
    const dateOfBirthInput = screen.getByLabelText('Date de naissance');
    const cityInput = screen.getByLabelText('Ville');
    const postalCodeInput = screen.getByLabelText('Code postal');
    const saveButton = screen.getByRole('button', { name: /Enregistrer/i });

    fireEvent.change(firstNameInput, { target: { value: 'Takwa' } });
    fireEvent.change(lastNameInput, { target: { value: 'Zayene' } });
    fireEvent.change(emailInput, { target: { value: 'takwa.zayene@example.com' } });
    fireEvent.change(dateOfBirthInput, { target: { value: '1999-01-01' } });
    fireEvent.change(cityInput, { target: { value: 'Nice' } });
    fireEvent.change(postalCodeInput, { target: { value: '06000' } });

    fireEvent.click(saveButton);

    // Check if data is saved in local storage
    const savedData = JSON.parse(localStorage.getItem('formData'));
    expect(savedData).toEqual([
      {
        firstName: 'Takwa',
        lastName: 'Zayene',
        email: 'takwa.zayene@example.com',
        dateOfBirth: '1999-01-01',
        city: 'Nice',
        postalCode: '06000'
      }
    ]);

    // Check if success toast is displayed
    const successToast = screen.getByText(/Enregistrement réussi!/i);
    expect(successToast).toBeInTheDocument();

    // Check if fields are cleared after submission
    expect(firstNameInput).toHaveValue('');
    expect(lastNameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(dateOfBirthInput).toHaveValue('');
    expect(cityInput).toHaveValue('');
    expect(postalCodeInput).toHaveValue('');
  });

});
