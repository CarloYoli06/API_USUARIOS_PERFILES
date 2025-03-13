# API de Usuarios

Esta es una API diseñada para gestionar usuarios y sus actividades. Proporciona endpoints para crear, leer, actualizar y eliminar usuarios, así como para gestionar sus actividades y obtener recomendaciones basadas en su comportamiento.

La API está hosteada en: [https://api-usuarios-perfiles.onrender.com/](https://api-usuarios-perfiles.onrender.com/)

## Endpoints

### Obtener todos los usuarios

**GET** `/apiV1/users`

Devuelve una lista de todos los usuarios.

**Ejemplo de respuesta:**
```json
[
    {
        "id": 1,
        "nombre": "Juan Pérez",
        "correo": "juan@example.com",
        "edad": 25,
        "esAdministrador": false,
        "intereses": ["Programación", "IA", "Seguridad Informática"],
        "direccion": {
            "calle": "Av. Principal 123",
            "ciudad": "Tepic",
            "pais": "México"
        },
        "actividad": []
    }
]
```
Obtener un usuario por ID
GET /apiV1/users/{id}

Devuelve un usuario específico por su ID.

Ejemplo de respuesta:
```json
{
    "id": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@example.com",
    "edad": 25,
    "esAdministrador": false,
    "intereses": ["Programación", "IA", "Seguridad Informática"],
    "direccion": {
        "calle": "Av. Principal 123",
        "ciudad": "Tepic",
        "pais": "México"
    },
    "actividad": []
}
```
Crear un nuevo usuario
POST /apiV1/users

Crea un nuevo usuario. El cuerpo de la solicitud debe ser un JSON con los campos nombre y correo.

Ejemplo de solicitud:
```json
{
    "nombre": "Juan Pérez",
    "correo": "juan@example.com",
    "edad": 25,
    "esAdministrador": false,
    "intereses": ["Programación", "IA", "Seguridad Informática"],
    "direccion": {
        "calle": "Av. Principal 123",
        "ciudad": "Tepic",
        "pais": "México"
    },
    "actividad": []
}
```
Ejemplo de respuesta:
```json
{
    "id": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@example.com",
    "edad": 25,
    "esAdministrador": false,
    "intereses": ["Programación", "IA", "Seguridad Informática"],
    "direccion": {
        "calle": "Av. Principal 123",
        "ciudad": "Tepic",
        "pais": "México"
    },
    "actividad": []
}
```
Actualizar un usuario
PUT /apiV1/users/{id}

Actualiza un usuario existente. El cuerpo de la solicitud debe ser un JSON con los campos nombre y correo.

Ejemplo de solicitud:
```json
{
    "nombre": "Nombre actualizado",
    "correo": "email_actualizado@example.com"
}
```
Ejemplo de respuesta:
```json
{
    "id": 1,
    "nombre": "Nombre actualizado",
    "correo": "email_actualizado@example.com",
    "edad": 25,
    "esAdministrador": false,
    "intereses": ["Programación", "IA", "Seguridad Informática"],
    "direccion": {
        "calle": "Av. Principal 123",
        "ciudad": "Tepic",
        "pais": "México"
    },
    "actividad": []
}
```
Eliminar un usuario
DELETE /apiV1/users/{id}

Elimina un usuario existente por su ID.

Ejemplo de respuesta:

```json
{
    "message": "Usuario eliminado correctamente"
}
```
Agregar una Actividad a un Usuario
POST /apiV1/users/{id}/activity

Agrega una nueva actividad a un usuario específico. El cuerpo de la solicitud debe ser un JSON con el campo accion, que debe ser una de las siguientes acciones permitidas:

Inició sesión

Actualizó su perfil

Registró un nuevo comentario

Comentó en un post

Subió un video

Publicó una foto

Ejemplo de solicitud:
```json
{
    "accion": "Inició sesión"
}
```
Ejemplo de respuesta:
```json
{
    "message": "Actividad agregada correctamente",
    "actividad": {
        "fecha": "2023-10-05T12:34:56.789Z",
        "accion": "Inició sesión"
    }
}
```
Obtener Recomendaciones
POST /apiV1/users/{id}/recommendations

Obtiene recomendaciones basadas en el comportamiento del usuario.

Ejemplo de respuesta:
```json
{
    "recomendaciones": [
        "Ver tutoriales de IA",
        "Unirse a grupos de programación"
    ]
}
```
Obtener Reputación
POST /apiV1/users/{id}/reputation

Obtiene la reputación de un usuario basada en sus actividades.

Ejemplo de respuesta:
```json
{
    "reputacion": "Alta"
}
```
Visualizar Actividades de un Usuario
POST /apiV1/users/{id}/activities

Obtiene las actividades de un usuario específico.

Ejemplo de respuesta:
```json
[
    {
        "fecha": "2023-10-05T12:34:56.789Z",
        "accion": "Inició sesión"
    },
    {
        "fecha": "2023-10-06T14:22:11.123Z",
        "accion": "Actualizó su perfil"
    }
]
```