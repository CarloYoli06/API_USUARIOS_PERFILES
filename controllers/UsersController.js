// controllers/UsersController.js
import db from '../models/firebase.js';
import { collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const docRef = await addDoc(collection(db, 'users'), userData);
    res.status(201).send({ id: docRef.id, ...userData });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener un usuario por su ID
export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      res.status(200).send({ id: userDoc.id, ...userDoc.data() });
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar un usuario por su ID
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    await updateDoc(doc(db, 'users', userId), updateData);
    res.status(200).send({ id: userId, ...updateData });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Eliminar un usuario por su ID
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteDoc(doc(db, 'users', userId));
    res.status(200).send({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};