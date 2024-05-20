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
