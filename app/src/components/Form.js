/**
 * Formulaire de saisie des informations d'inscription.
 * @module Form
 * @requires React
 * @requires useState
 * @requires TextField
 * @requires Button
 * @requires Box
 * @requires Paper
 * @requires Typography
 * @requires react-toastify
 * @requires validateName
 * @requires validateEmail
 * @requires validateAge
 * @requires validatePostalCode
 */
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateName, validateEmail, validateAge, validatePostalCode } from '../utils/validation';
import { useNavigate } from 'react-router-dom';

/**
 * Composant fonctionnel représentant le formulaire d'inscription.
 * @returns {JSX.Element} Composant de formulaire d'inscription.
 */
const Form = () => {
    const navigate = useNavigate();

    const defaultDate = "2005-01-01";

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: defaultDate,
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


    const clearFields = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: defaultDate,
            city: '',
            postalCode: '',
        });
        setErrors({
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: '',
            postalCode: '',
        });
    };

    /**
    * Fonction de validation du formulaire.
    * @returns {Object} Erreurs de validation du formulaire.
    */
    const validateForm = () => {
        return {
            firstName: validateName(formData.firstName),
            lastName: validateName(formData.lastName),
            email: validateEmail(formData.email),
            dateOfBirth: validateAge(formData.dateOfBirth),
            postalCode: validatePostalCode(formData.postalCode),
        };
    };

    /**
     * Fonction pour sauvegarder les données dans le local storage.
     * @returns {void}
     */
    const addUser = async () => {
        const formattedDateOfBirth = formatDate(formData.dateOfBirth);

        console.log("formData", formData)
        try {
            await fetch(
                `http://127.0.0.1:${process.env.REACT_APP_SERVER_PORT}/users`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Accept-Language": "en-US",
                        "Cache-Control": "no-cache",
                    },
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        dateOfBirth: formattedDateOfBirth,
                        city: formData.city,
                        postalCode: formData.postalCode,
                    }),



                }
            );
        } catch (e) {
            console.error(e)
            toast.error('Erreur lors de la sauvegarde des données', e, { autoClose: 3000 });

        }
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };


    /**
    * Fonction de soumission du formulaire.
    * @param {Object} e - Événement de soumission du formulaire.
    */
    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateForm();

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error !== '')) {
            // Affiche le toast d'erreur
            toast.error('Le formulaire contient des erreurs. Veuillez les corriger.', { autoClose: 3000 });
        } else {
            // Sauvegarde dans la BD
            addUser();
            clearFields();
            navigate("/utilisateurs"); // Navigate to the "/utilisateurs" route
            toast.success('Utilisateur ajouté avec succès');


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
                    label="Prenom"
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
