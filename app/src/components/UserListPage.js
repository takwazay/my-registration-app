import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:${process.env.REACT_APP_SERVER_PORT}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    console.log("userId",userId)
    try {
      await fetch(`http://127.0.0.1:${process.env.REACT_APP_SERVER_PORT}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'api-key': 'delete' // Assurez-vous que la valeur correspond à celle attendue par le serveur
        }
      });
      fetchUsers();
      toast.success('Utilisateur supprimé avec succès');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Erreur lors de la suppression de l\'utilisateur');
    }
  };

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prénom</TableCell>
              <TableCell>Nom de famille</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date de naissance</TableCell>
              <TableCell>Ville</TableCell>
              <TableCell>Code postal</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{format(new Date(user.dateOfBirth), 'dd/MM/yyyy')}</TableCell>   
                <TableCell>{user.city}</TableCell>
                <TableCell>{user.postalCode}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteUser(user.id)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button component={Link} to="/inscription">Retour au formulaire</Button>
      <ToastContainer />
    </div>
  );
};

export default UserListPage;
