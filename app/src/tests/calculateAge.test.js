import { calculateAge } from '../utils/calculateAge';

describe('Tests for calculateAge function', () => {

    const mockValidDates = [
        { birthDate: new Date(1990, 0, 1), expectedAge: 34 },
        { birthDate: new Date(1985, 5, 15), expectedAge: 38 },
        { birthDate: new Date(2000, 11, 31), expectedAge: 23 },
    ];

    mockValidDates.forEach(({ birthDate, expectedAge }) => {
        it(`should return the correct age for a birth date of ${birthDate.toDateString()}`, () => {
            const age = calculateAge(birthDate);
            expect(age).toBe(expectedAge);
        });
    });

    it('should throw an error if birth date is missing', () => {
        expect(() => calculateAge()).toThrow("Paramètre p manquant");
    });

    it('should throw an error if birth property is not an instance of date', () => {
        const mockInvalidBirthDate1 = 'invalid date';
        expect(() => calculateAge(mockInvalidBirthDate1)).toThrow("Le paramètre de naissance fourni doit être un objet Date");
        const mockInvalidBirthDate2 = '05/22/1989';
        expect(() => calculateAge(mockInvalidBirthDate2)).toThrow("Le paramètre de naissance fourni doit être un objet Date");
    });

    it('should throw an error if birth date is in the future', () => {
        const mockFutureDate = new Date(Date.now() + (365 * 24 * 60 * 60 * 1000));
        expect(() => calculateAge(mockFutureDate)).toThrow("La date de naissance indiquée ne peut pas être dans le future");
    });
});
