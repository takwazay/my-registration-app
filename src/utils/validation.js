import { calculateAge } from './calculateAge';

/**
 * Valide un nom ou un prénom.
 * 
 * @param {string} value - Le nom ou prénom à valider.
 * @returns {string} Retourne une chaîne vide si le nom ou prénom est valide. 
 *                   Sinon, retourne un message d'erreur décrivant les règles de validation non respectées.
 * @example
 * // Retourne une chaîne vide car le nom est valide
 * validateName('takwa-zayene');
 * 
 * // Retourne un message d'erreur car le nom est trop court
 * validateName('T');
 * 
 * // Retourne un message d'erreur car le nom contient des caractères non autorisés
 * validateName('Tak123');
 */
export const validateName = (value) => {
  return /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]{2,}$/.test(value) ? '' : value.length < 2 ? 'Le nom ou prénom doit contenir au moins 2 caractères' : 'Le nom ou prénom ne doit contenir que des lettres, espaces ou tirets';
};

/**
 * Valide une adresse e-mail.
 * 
 * @param {string} value - L'adresse e-mail à valider.
 * @returns {string} Retourne une chaîne vide si l'adresse e-mail est valide. 
 *                   Sinon, retourne un message d'erreur indiquant que l'adresse e-mail fournie n'est pas valide.
 * @example
 * // Retourne une chaîne vide car l'adresse e-mail est valide
 * validateEmail('takwa.zayene@example.com');
 * 
 * // Retourne un message d'erreur car l'adresse e-mail ne contient pas de domaine
 * validateEmail('takwa.zayene@');
 * 
 * // Retourne un message d'erreur car l'adresse e-mail ne contient pas d'arobase
 * validateEmail('takwazay.example.com');
 */
export const validateEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : "L'adresse e-mail fournie n'est pas valide";
};

/**
 * Valide l'âge.
 * 
 * @param {string} value - La date de naissance sous forme de chaîne de caractères.
 * @returns {string} Retourne une chaîne vide si l'âge est supérieur à 18 ans. 
 *                   Retourne 'Doit avoir 18 ans ou plus' si l'âge est inférieur à 18 ans.
 *                   Si une erreur se produit lors du calcul de l'âge, retourne le message d'erreur correspondant.
 * @example
 * // Retourne une chaîne vide car l'âge est valide (supérieur à 18 ans)
 * validateAge('2000-01-01');
 * 
 * // Retourne 'Doit avoir 18 ans ou plus' car l'âge est inférieur à 18 ans
 * validateAge('2010-01-01');
 * 
 * // Retourne le message d'erreur spécifique si une erreur se produit lors du calcul de l'âge
 * validateAge('invalid-date-string');
 */
export const validateAge = (value) => {
  try {
    const age = calculateAge(new Date(value));
    if (age > 18) {
      return ''; // L'âge est valide
    } else {
      return 'Doit avoir 18 ans ou plus';
    }
  } catch (error) {
    return error.message;
  }
};

/**
 * Valide un code postal.
 * 
 * @param {string} value - Le code postal à valider.
 * @returns {string} Retourne une chaîne vide si le code postal est composé de cinq chiffres.
 *                   Retourne 'Le code postal doit être composé de cinq chiffres' si le code postal est invalide.
 * @example
 * // Retourne une chaîne vide car le code postal est valide
 * validatePostalCode('12345');
 * 
 * // Retourne 'Le code postal doit être composé de cinq chiffres' car le code postal est invalide
 * validatePostalCode('123');
 */
export const validatePostalCode = (value) => {
  return /^[0-9]{5}$/.test(value) ? '' : 'Le code postal doit être composé de cinq chiffres';
};
