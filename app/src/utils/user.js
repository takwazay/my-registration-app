import axios from 'axios';

const addUser = async (userData) => {
  try {
    // Faites une requête POST vers votre serveur Node.js avec les données de l'utilisateur
    const response = await axios.post('http://localhost:8000/users', userData);
    return response.data; // Retourne les données renvoyées par le serveur en cas de succès
  } catch (error) {
    // Si une erreur se produit (par exemple, si le serveur n'est pas accessible), elle est capturée ici
    console.error('Error:', error);
    throw new Error('Failed to add user'); // Lève une exception pour indiquer qu'il y a eu un problème
  }
};

export default addUser;
