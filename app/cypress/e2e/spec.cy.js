describe('Registration Form', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it('should  submit button is disabled if any input is empty', () => {
    // Fill out all the fields except one
    cy.get('input[name="firstName"]').type('Takwa');
    cy.get('input[name="lastName"]').type('Zayene');
    cy.get('input[name="email"]').type('takwazayene@example.com');
    cy.get('input[name="dateOfBirth"]').type('2000-01-01');
    cy.get('input[name="city"]').type('Nice');

    // Assert that the submit button is disabled
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should display an error if the postal code is not valid', () => {
    // Fill out the form fields
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('johndoe@example.com');
    cy.get('input[name="dateOfBirth"]').type('2000-01-01');
    cy.get('input[name="city"]').type('New York');
    
    // Enter an invalid postal code
    cy.get('input[name="postalCode"]').type('123');

    // Click the submit button
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed
    cy.contains('Le code postal doit être composé de cinq chiffres').should('exist');
  });

  it('should display an error if the user is under 18 years old', () => {
    // Fill out the form fields
    cy.get('input[name="firstName"]').type('Takwa');
    cy.get('input[name="lastName"]').type('zayene');
    cy.get('input[name="email"]').type('takwazayene@example.com');

    // Enter a date of birth for someone under 18
    cy.get('input[name="dateOfBirth"]').type('2010-01-01');

    cy.get('input[name="city"]').type('New York');
    cy.get('input[name="postalCode"]').type('10001');

    // Click the submit button
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed
    cy.contains('Doit avoir 18 ans ou plus').should('exist');
  });

  
    it('should display an error if the first name contains invalid characters', () => {
      // Fill out the form fields with invalid characters in the first name
      cy.get('input[name="firstName"]').type('John123');
  
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('input[name="email"]').type('johndoe@example.com');
      cy.get('input[name="dateOfBirth"]').type('1990-01-01');
      cy.get('input[name="city"]').type('New York');
      cy.get('input[name="postalCode"]').type('10001');
  
      // Click the submit button
      cy.get('button[type="submit"]').click();
  
      // Assert that an error message is displayed for the first name
      cy.contains('Le nom ou prénom ne doit contenir que des lettres, espaces ou tirets').should('exist');
    });
  
    it('should display an error if the last name contains invalid characters', () => {
      // Fill out the form fields with invalid characters in the last name
      cy.get('input[name="firstName"]').type('tawka');
      cy.get('input[name="lastName"]').type('zayene99');
  
      cy.get('input[name="email"]').type('takwazayene@example.com');
      cy.get('input[name="dateOfBirth"]').type('1999-01-01');
      cy.get('input[name="city"]').type('New York');
      cy.get('input[name="postalCode"]').type('10001');
  
      // Click the submit button
      cy.get('button[type="submit"]').click();
  
      // Assert that an error message is displayed for the last name
      cy.contains('Le nom ou prénom ne doit contenir que des lettres, espaces ou tirets').should('exist');
    });


  it("displays success toast on successful form submission", () => {
    // Fill out the form fields with valid input
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('johndoe@example.com');
    cy.get('input[name="dateOfBirth"]').type('1990-01-01');
    cy.get('input[name="city"]').type('New York');
    cy.get('input[name="postalCode"]').type('10001');

    // Intercept the toast.success() call and ensure it is called with the correct message
    cy.intercept('POST', '**/users', (req) => {
      req.reply(() => {
        cy.contains('Utilisateur ajouté avec succès').should('be.visible');
        return { status: 200 };
      });
    }).as('addUser');

    // Click the submit button
    cy.get('button[type="submit"]').click();

    // Wait for the success toast to be displayed
    cy.contains('Utilisateur ajouté avec succès').should('be.visible');
    
    // Assert that the user is navigated to the "/utilisateurs" route
    cy.url().should('include', '/utilisateurs');
  });
  

});


describe('User List Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/utilisateurs');
  });

  it('should display the user list with correct columns', () => {
    cy.get('th').contains('Prénom').should('be.visible');
    cy.get('th').contains('Nom de famille').should('be.visible');
    cy.get('th').contains('Email').should('be.visible');
    cy.get('th').contains('Date de naissance').should('be.visible');
    cy.get('th').contains('Ville').should('be.visible');
    cy.get('th').contains('Code postal').should('be.visible');
    cy.get('th').contains('Actions').should('be.visible');
  });

  it('should call deleteUser function when delete button is clicked', () => {
    // Mocking users data
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

    cy.intercept('GET', '**/users', {
      statusCode: 200,
      body: mockUsers,
    }).as('getUsers');

    cy.intercept('DELETE', '**/users/1', {
      statusCode: 200,
    }).as('deleteUser');

    cy.visit('http://localhost:3000/utilisateurs');

    cy.wait('@getUsers');

    cy.contains('Supprimer').click();

    cy.wait('@deleteUser').its('response.statusCode').should('eq', 200);

    cy.contains('Utilisateur supprimé avec succès').should('be.visible');
  });

  it('should fetch users and display them correctly', () => {
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
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        dateOfBirth: '1992-02-02',
        city: 'Los Angeles',
        postalCode: '90001',
      },
    ];

    cy.intercept('GET', '**/users', {
      statusCode: 200,
      body: mockUsers,
    }).as('getUsers');

    cy.visit('http://localhost:3000/utilisateurs');

    cy.wait('@getUsers');

    cy.get('td').contains('John').should('be.visible');
    cy.get('td').contains('Jane').should('be.visible');
  });

  it('should handle error correctly when fetching users fails', () => {
    cy.intercept('GET', '**/users', {
      statusCode: 500,
    }).as('getUsers');

    cy.visit('http://localhost:3000/utilisateurs');

    cy.wait('@getUsers');

    cy.contains('Erreur lors de la récupération des utilisateurs').should('be.visible');
  });
});
