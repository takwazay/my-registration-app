import { calculateAge } from './calculateAge';


export const validateName = (value) => {
  return /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]{2,}$/.test(value) ? '' : value.length < 2 ? 'Le nom ou prénom doit contenir au moins 2 caractères' : 'Le nom ou prénom ne doit contenir que des lettres, espaces ou tirets';
};


export const validateEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : "L'adresse e-mail fournie n'est pas valide";
};

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


export const validatePostalCode = (value) => {
  return /^[0-9]{5}$/.test(value) ? '' : 'Le code postal doit être composé de cinq chiffres';
};
