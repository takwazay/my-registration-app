export const validateName = (value) => {
    return /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/.test(value) ? '' : 'Le nom ou prénom ne doit contenir que des lettres, espaces ou tirets';
  };
  
  export const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : "L'adresse e-mail fournie n'est pas valide";
  };
  
  export const validateAge = (value) => {
    return calculateAge(new Date(value)) > 18 ? '' : 'Doit avoir 18 ans ou plus';
  };
  
  export const validatePostalCode = (value) => {
    return /^[0-9]{5}$/.test(value) ? '' : ' Le code postal doit être composé de cinq chiffres';
  };
  
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
  
    return age;
  };
  