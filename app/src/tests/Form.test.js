import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import Form from "../components/Form";

describe('Form Component Tests', () => {
  beforeEach(() => {
    render(<Form />);
  });

  afterEach(() => {
    const firstNameInput = screen.getByLabelText('Prenom');
    const lastNameInput = screen.getByLabelText('Nom de famille');
    const emailInput = screen.getByLabelText('Email');
    const dateOfBirthInput = screen.getByLabelText('Date de naissance');
    const cityInput = screen.getByLabelText('Ville');
    const postalCodeInput = screen.getByLabelText('Code postal');

    fireEvent.change(firstNameInput, { target: { value: '' } });
    fireEvent.change(lastNameInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(dateOfBirthInput, { target: { value: '' } });
    fireEvent.change(cityInput, { target: { value: '' } });
    fireEvent.change(postalCodeInput, { target: { value: '' } });

    // Clear any existing toasts
    jest.clearAllMocks();
  });

  test('Form displays correctly with all inputs, title, and button', () => {
    // Check if the title is displayed
    const title = screen.getByText(/formulaire d'inscription/i);
    expect(title).toBeInTheDocument();

    // Check if all input fields are displayed
    const firstNameInput = screen.getByLabelText('Prenom');
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
    const button = screen.getByRole('button', { name: /Enregistrer/i });
    expect(button).toBeDisabled();
  });

  test('Form submission saves data  and displays success toast', () => {
    const firstNameInput = screen.getByLabelText('Prenom');
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
    // const savedData = JSON.parse(localStorage.getItem('formData'));
    // expect(savedData).toEqual([
    //   {
    //     firstName: 'Takwa',
    //     lastName: 'Zayene',
    //     email: 'takwa.zayene@example.com',
    //     dateOfBirth: '1999-01-01',
    //     city: 'Nice',
    //     postalCode: '06000'
    //   }
    // ]);

    // Check if success toast is displayed
    const successToast = screen.getByText(/Utilisateur ajouté avec succès/i);
    expect(successToast).toBeInTheDocument();

    // Check if fields are cleared after submission
    expect(firstNameInput).toHaveValue('');
    expect(lastNameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(dateOfBirthInput).toHaveValue('');
    expect(cityInput).toHaveValue('');
    expect(postalCodeInput).toHaveValue('');
  });

  test(' should display Toaster d’erreur et les erreurs correspondantes en rouge', async () => {

    // Fill the form with invalid data
    const firstNameInput = screen.getByLabelText('Prenom');
    const lastNameInput = screen.getByLabelText('Nom de famille');
    const emailInput = screen.getByLabelText('Email');
    const dateOfBirthInput = screen.getByLabelText('Date de naissance');
    const cityInput = screen.getByLabelText('Ville');
    const postalCodeInput = screen.getByLabelText('Code postal');

    fireEvent.change(firstNameInput, { target: { value: 'T?' } });
    fireEvent.change(lastNameInput, { target: { value: 'Z' } });
    fireEvent.change(emailInput, { target: { value: 'takwa.zayene.com' } });
    fireEvent.change(dateOfBirthInput, { target: { value: '2006-01-01' } });
    fireEvent.change(cityInput, { target: { value: 'Nice' } });
    fireEvent.change(postalCodeInput, { target: { value: '0600' } });

    const saveButton = screen.getByRole('button', { name: /Enregistrer/i });

    fireEvent.click(saveButton);

    const toastMessage = screen.getByText(/Le formulaire contient des erreurs\. Veuillez les corriger\./i);
    expect(toastMessage).toBeInTheDocument();


    // Check if error messages are displayed in red
    const firstNameError = screen.getByText(/Le nom ou prénom ne doit contenir que des lettres, espaces ou tirets/i);
    const lastNameError = screen.getByText(/Le nom ou prénom ne doit contenir que des lettres, espaces ou tirets/i);
    const emailError = screen.getByText(/L'adresse e-mail fournie n'est pas valide/i);
    const dateOfBirthError = screen.getByText(/Doit avoir 18 ans ou plus/i);
    const postalCodeError = screen.getByText(/Le code postal doit être composé de cinq chiffres/i);

    expect(firstNameError).toHaveStyle('color: rgb(211, 47, 47)');
    expect(lastNameError).toHaveStyle('color: rgb(211, 47, 47)');
    expect(emailError).toHaveStyle('color: rgb(211, 47, 47)');
    expect(dateOfBirthError).toHaveStyle('color: rgb(211, 47, 47)');
    expect(postalCodeError).toHaveStyle('color: rgb(211, 47, 47)');

  });


  // test('should display error message when save data fails', () => {
  //   // Récupérer les éléments d'entrée
  //   const firstNameInput = screen.getByLabelText('Prenom');
  //   const lastNameInput = screen.getByLabelText('Nom de famille');
  //   const emailInput = screen.getByLabelText('Email');
  //   const dateOfBirthInput = screen.getByLabelText('Date de naissance');
  //   const cityInput = screen.getByLabelText('Ville');
  //   const postalCodeInput = screen.getByLabelText('Code postal');
  //   const saveButton = screen.getByRole('button', { name: /Enregistrer/i });

  //   // Simuler la saisie dans les champs d'entrée
  //   fireEvent.change(firstNameInput, { target: { value: 'Takwa' } });
  //   fireEvent.change(lastNameInput, { target: { value: 'Zayene' } });
  //   fireEvent.change(emailInput, { target: { value: 'takwa.zayene@example.com' } });
  //   fireEvent.change(dateOfBirthInput, { target: { value: '1999-01-01' } });
  //   fireEvent.change(cityInput, { target: { value: 'Nice' } });
  //   fireEvent.change(postalCodeInput, { target: { value: '06000' } });

  //   // Simuler l'échec de la récupération des données du localStorage
  //   // jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Mock localStorage error'); });

  //   // Cliquer sur le bouton d'enregistrement
  //   fireEvent.click(saveButton);

  //   // S'assurer que le message d'erreur est affiché
  //   const errorToast = screen.getByText(/Erreur lors de la sauvegarde des donnée:/i);
  //   expect(errorToast).toBeInTheDocument();
  // });
});
