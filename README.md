# API de Usuarios

Esta es una API diseñada para gestionar usuarios y sus actividades. Proporciona endpoints para crear, leer, actualizar y eliminar usuarios, así como para gestionar sus actividades, obtener recomendaciones basadas en su comportamiento y calcular su reputación.

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

### Obtener un usuario por ID

**GET** `/apiV1/users/{id}`

Devuelve un usuario específico por su ID.

**Ejemplo de respuesta:**
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

### Crear un nuevo usuario

**POST** `/apiV1/users`

Crea un nuevo usuario. El cuerpo de la solicitud debe ser un JSON con los campos `nombre`, `correo`, `edad`, `esAdministrador`, `intereses`, `direccion` y `actividad`.

**Ejemplo de solicitud:**
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

**Ejemplo de respuesta:**
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

### Actualizar un usuario

**PUT** `/apiV1/users/{id}`

Actualiza un usuario existente. El cuerpo de la solicitud debe ser un JSON con los campos `nombre` y `correo`.

**Ejemplo de solicitud:**
```json
{
    "nombre": "Nombre actualizado",
    "correo": "email_actualizado@example.com"
}
```

**Ejemplo de respuesta:**
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

### Actualizar datos específicos de un usuario

**PATCH** `/apiV1/users/{id}`

Actualiza datos específicos de un usuario utilizando su ID.

**Ejemplo de solicitud:**
```json
{
    "edad": 26,
    "intereses": ["Programación", "IA", "Seguridad Informática", "Desarrollo Web"]
}
```

### Eliminar un usuario

**DELETE** `/apiV1/users/{id}`

Elimina un usuario existente por su ID.

**Ejemplo de respuesta:**
```json
{
    "message": "Usuario eliminado correctamente"
}
```

### Agregar una Actividad a un Usuario

**POST** `/apiV1/users/{id}/activity`

Agrega una nueva actividad a un usuario específico. El cuerpo de la solicitud debe ser un JSON con el campo `accion`, que debe ser una de las siguientes acciones permitidas:

- `Inició sesión`
- `Actualizó su perfil`
- `Registró un nuevo comentario`
- `Comentó en un post`
- `Subió un video`
- `Publicó una foto`

**Ejemplo de solicitud:**
```json
{
    "accion": "Inició sesión"
}
```

**Ejemplo de respuesta:**
```json
{
    "message": "Actividad agregada correctamente",
    "actividad": {
        "fecha": "2023-10-05T12:34:56.789Z",
        "accion": "Inició sesión"
    }
}
```

### Obtener la reputación de un usuario

**GET** `/apiV1/users/reputation/{id}`

Obtiene la reputación de un usuario basada en su registro de actividad.

**Ejemplo de respuesta:**
```json
{
    "user": {
        "nombre": "María González",
        "actividad": [
            {
                "accion": "Registró un nuevo comentario",
                "fecha": "2024-02-16T11:00:00Z"
            },
            {
                "fecha": "2024-02-16T12:00:00Z",
                "accion": "Actualizó su perfil"
            }
        ]
    },
    "reputacion": 2,
    "diasSinActividad": 395.3436221180556
}
```

### Obtener recomendaciones de contactos por usuario

**GET** `/apiV1/users/recommend/{id}`

Obtiene una lista de contactos de interés basada en intereses y ubicación.

**Ejemplo de respuesta:**
```json
{
    "recomendaciones": [
        {
            "id": "XMTf2wGi3rxMvfLBsZdh",
            "nombre": "Carlos López",
            "intereses": [
                "Programación",
                "Seguridad Informática",
                "Deportes"
            ]
        },
        {
            "id": "avHe9hjKXcH5mB9UxwDt",
            "nombre": "Ricardo Hernández",
            "intereses": [
                "Lectura",
                "Programación",
                "Cocina"
            ]
        }
    ]
}
```

### Visualizar actividades de un usuario

**GET** `/apiV1/users/{id}/activities`

Obtiene las actividades de un usuario específico.

**Ejemplo de respuesta:**
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

