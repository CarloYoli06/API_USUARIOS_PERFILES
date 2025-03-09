// controllers/UsersController.js
const db = require("../models/firebase.js");
const {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const docRef = await addDoc(collection(db, "users"), userData);
    res.status(201).send({ id: docRef.id, ...userData });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener un usuario por su ID
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      res.status(200).send({ id: userDoc.id, ...userDoc.data() });
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar un usuario por su ID
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    await updateDoc(doc(db, "users", userId), updateData);
    res.status(200).send({ id: userId, ...updateData });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Eliminar un usuario por su ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteDoc(doc(db, "users", userId));
    res.status(200).send({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getSharedInterests = async (req, res) => {
  try {
    // Retrieve all user documents from the "users" collection
    const snapshot = await getDocs(collection(db, "users"));
    const users = [];
    snapshot.forEach((doc) => {
      users.push(doc.data());
    });

    // Build a mapping from interest to an array of user identifiers (e.g., correo)
    const interestMap = {};
    users.forEach((user) => {
      if (user.intereses && Array.isArray(user.intereses)) {
        user.intereses.forEach((interest) => {
          if (!interestMap[interest]) {
            interestMap[interest] = [];
          }
          interestMap[interest].push(user.correo);
        });
      }
    });

    // Use a Set to avoid counting a user more than once.
    const sharedUsers = new Set();
    // For each interest, if more than one user has it, add all those users.
    for (const interest in interestMap) {
      if (interestMap[interest].length > 1) {
        interestMap[interest].forEach((email) => sharedUsers.add(email));
      }
    }

    // Respond with the count and optionally the list of users that share at least one interest.
    res.json({
      count: sharedUsers.size,
      sharedUsers: Array.from(sharedUsers),
    });
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getUserRecommendations = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "Falta el id" });
    }

    // Retrieve the target user document using the userId
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const targetUser = userDoc.data();

    // Retrieve all user documents from the "users" collection
    const snapshot = await getDocs(collection(db, "users"));
    const users = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    // Filter recommendations:
    // They must be a different user, share the same country, and either live in the same city or share at least one interest.
    const recomendaciones = users
      .filter((user) => {
        if (user.id === userId) return false; // Exclude the target user
        if (!user.direccion || !targetUser.direccion) return false;
        if (user.direccion.pais !== targetUser.direccion.pais) return false;

        const mismaCiudad =
          user.direccion.ciudad === targetUser.direccion.ciudad;
        const compartenIntereses =
          user.intereses &&
          targetUser.intereses &&
          user.intereses.some((interest) =>
            targetUser.intereses.includes(interest)
          );

        return mismaCiudad || compartenIntereses;
      })
      .map((user) => ({
        id: user.id,
        nombre: user.nombre,
        intereses: user.intereses,
      }));

    res.json({ recomendaciones });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getUserReputation = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "Falta el id" });
    }

    // Obtener el documento del usuario según el id
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const user = userDoc.data();

    let puntaje = 0;
    if (user.actividad && user.actividad.length > 0) {
      // Define los puntos asignados para cada tipo de acción
      const definirValores = {
        "Inició sesión": 5,
        "Actualizó su perfil": 3,
        "Registró un nuevo comentario": 4,
        "Comentó en un post": 4,
        "Subió un video": 6,
        "Publicó una foto": 6,
      };

      // Sumar puntos por cada actividad sin diferenciar por recencia
      user.actividad.forEach((act) => {
        const puntos = definirValores[act.accion] || 2;
        puntaje += puntos;
      });
    }

    const hoy = new Date();
    const ultimaActividad = new Date(
      user.actividad[user.actividad.length - 1].fecha
    );
    const diasSinActividad = (hoy - ultimaActividad) / (1000 * 60 * 60 * 24);
    if (diasSinActividad > 365) {
      puntaje -= 5;
    }
    // Evita que el puntaje sea negativo
    const reputacion = Math.max(puntaje, 0);

    res.json({
      user: {
        nombre: user.nombre,
        actividad: user.actividad,
      },
      reputacion,
      diasSinActividad,
    });
  } catch (error) {
    console.error("Error calculando la reputación:", error);
    res.status(500).send("Error Interno del Servidor");
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getSharedInterests,
  getUserRecommendations,
  getUserReputation,
};
