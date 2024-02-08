// ici je fait des tests unitaire: test de chaque validation 
import { validateName, validateEmail, validateAge, validatePostalCode } from "../../src/utils/validation";

describe('Tests for Validation Functions', () => {
  describe("validateName tests", () => {

    const mockValidNames = ['Takwa', 'Takwa Zay', 'TT'];

    mockValidNames.forEach((name) => {
      test(`validateName should return empty string for valid name "${name}"`, () => {
        const result = validateName(name);
        expect(result).toBe('');
      });
    });


    const mockInvalidNames = ['Tak123', 'Tak?', 'T?', 'ta#k'];

    mockInvalidNames.forEach((name) => {
      test(`validateName should return error message for invalid name "${name}"`, () => {
        const result = validateName(name);
        expect(result).toBe('Le nom ou prénom ne doit contenir que des lettres, espaces ou tirets');
      });
    });

    it('validateName should return error message for invalid length name', () => {
      const result = validateName('T');
      expect(result).toBe('Le nom ou prénom doit contenir au moins 2 caractères');
    });
  });
  describe("validateEmail tests", () => {

    // Emails valides
    const mockValidEmails = [
      'takwa@example.com',
      'takwa.zayene@example.com',
      'takwa123@example.com',
    ];

    mockValidEmails.forEach((email) => {
      test(`validateEmail should return empty string for valid email "${email}"`, () => {
        const result = validateEmail(email);
        expect(result).toBe('');
      });
    });

    // Emails invalides
    const mockInvalidEmails = [
      'takwaexample.com',
      'takwa@examplecom',
      'takwa@123',
    ];

    mockInvalidEmails.forEach((email) => {
      test(`validateEmail should return error message for invalid email "${email}"`, () => {
        const result = validateEmail(email);
        expect(result).toBe("L'adresse e-mail fournie n'est pas valide");
      });
    });

  });
  describe("validateAge tests", () => {

    it('validateAge should return empty string for age over 18', () => {
      const result = validateAge('2000-01-01'); // Assuming birthdate is on January 1, 2000
      expect(result).toBe('');
    });

    it('validateAge should return error message for age under 18', () => {
      const result = validateAge('2010-01-01'); // Assuming birthdate is on January 1, 2010
      expect(result).toBe('Doit avoir 18 ans ou plus');
    });
  });
  describe("validatePostalCode tests", () => {

    // Codes postaux valides
    const mockValidPostalCodes = [
      '12345',
      '67890',
      '00000',
    ];

    mockValidPostalCodes.forEach((postalCode) => {
      test(`validatePostalCode should return empty string for valid postal code "${postalCode}"`, () => {
        const result = validatePostalCode(postalCode);
        expect(result).toBe('');
      });
    });

    // Codes postaux invalides
    const mockInvalidPostalCodes = [
      '1234',
      '1234a',
      '123456',
      'abcde',
    ];

    mockInvalidPostalCodes.forEach((postalCode) => {
      test(`validatePostalCode should return error message for invalid postal code "${postalCode}"`, () => {
        const result = validatePostalCode(postalCode);
        expect(result).toBe('Le code postal doit être composé de cinq chiffres');
      });
    });

  });
});