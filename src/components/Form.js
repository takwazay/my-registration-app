import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importez vos fonctions de validation ici
import { validateName, validateEmail, validateAge, validatePostalCode } from '../utils/validation';

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        city: '',
        postalCode: '',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        postalCode: '',
    });


    const validateForm = () => {
        // Fonction de validation globale
        return {
            firstName: validateName(formData.firstName),
            lastName: validateName(formData.lastName),
            email: validateEmail(formData.email),
            dateOfBirth: validateAge(new Date(formData.dateOfBirth)),
            postalCode: validatePostalCode(formData.postalCode),
        };
    };

    const saveToLocalStorage = () => {
        try {
            // Récupère les données actuelles dans le local storage (s'il y en a)
            const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    
            // Ajoute les nouvelles données au tableau existant
            storedData.push(formData);
    
            // Sauvegarde le tableau mis à jour dans le local storage
            localStorage.setItem('formData', JSON.stringify(storedData));
    
            // Affiche un message de succès si la sauvegarde est réussie
            console.log('Données sauvegardées avec succès dans le local storage:', storedData);
        } catch (error) {
            // En cas d'erreur, affiche un message d'erreur
            console.error('Erreur lors de la sauvegarde dans le local storage:', error);
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateForm();

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error !== '')) {
            // Affiche le toast d'erreur
            toast.error('Le formulaire contient des erreurs. Veuillez les corriger.', { autoClose: 3000 });
        } else {
             // Sauvegarde dans le local storage
        saveToLocalStorage();

        
            // Affiche le toast de succès
            toast.success('Enregistrement réussi!', { autoClose: 3000 });

            // Réinitialise les champs du formulaire
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                dateOfBirth: Date,
                city: '',
                postalCode: '',
            });
        }
    };

    return (
        <Paper elevation={3} sx={{ width: '500px', margin: 'auto', padding: '20px', marginTop: '50px' }}>
            <Typography variant="h5" sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
                gutterBottom>
                Formulaire d'inscription
            </Typography>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Prénom"
                    variant="outlined"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    margin="normal"
                    error={errors.firstName !== ''}
                    helperText={errors.firstName}
                />
                <TextField
                    label="Nom de famille"
                    variant="outlined"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    margin="normal"
                    error={errors.lastName !== ''}
                    helperText={errors.lastName}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    margin="normal"
                    error={errors.email !== ''}
                    helperText={errors.email}
                />
                <TextField
                    label="Date de naissance"
                    variant="outlined"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    error={errors.dateOfBirth !== ''}
                    helperText={errors.dateOfBirth}
                />
                <TextField
                    label="Ville"
                    variant="outlined"
                    name="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    margin="normal"
                />
                <TextField
                    label="Code postal"
                    variant="outlined"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    margin="normal"
                    error={errors.postalCode !== ''}
                    helperText={errors.postalCode}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: '20px' }}
                    disabled={Object.values(formData).some((value) => value === '')}
                >
                    Enregistrer
                </Button>
            </Box>
            <ToastContainer />
        </Paper>
    );
};

export default Form;