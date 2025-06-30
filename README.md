# 📘 Sistema de Gestión Universitaria - Módulo Alumnos

Este proyecto es parte de la **Actividad V** del curso de desarrollo web, cuyo objetivo es complementar el módulo de **alumnos** en una aplicación universitaria moderna, segura y funcional.

Repositorios oficiales: [https://github.com/Matt2130/BackRaul] [https://github.com/geo1605/ProyectoRaul/tree/master]

---

## Características

- 🔐 Inicio de sesión por:
  - Matricula/contraseña
  - Google (OAuth 2.0)
- Autenticación segura con JWT 
- Google reCAPTCHA para validación humana
- Contraseñas encriptadas con `bcryptjs`
- Sistema de mensajería entre alumnos (no chat)
- Bandeja de mensajes por usuario
- Validación de datos en frontend y backend
- Diseño responsive y accesible
- Filtros y buscador para alumnos
- Breadcrumbs y navegación persistente
- Página 404 y 500 personalizadas

---

## Tecnologías utilizadas
_____________________________________________________________________________
| Categoría        | Tecnologías                                            |
|------------------|--------------------------------------------------------|
| Frontend         | React, React Router DOM, Ant Design, Context API       |
| Backend          | Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt       |
| Seguridad        | reCAPTCHA, Express Validator, Helmet, JWT, Bcrypt      |
| Autenticación    | JWT, Google OAuth2                                     |
| Otros            | Vite, Nodemon, dotenv                                  |
_____________________________________________________________________________

## 🛠️ Instalación y ejecución local back

### 1. Clona el repositorio
```bash
git clone https://github.com/Matt2130/BackRaul.git
cd BackRaul
```

### 2. Configuración del entorno

Los archivos `.env` ya están configurados en el entorno de desarrollo, por lo que **no es necesario crear nuevos**. El proyecto ya está conectado a MongoDB Atlas y otros servicios necesarios.

### 3. Ejecutar la aplicación

Abre una terminal:

#### Terminal 1: servidor
```bash
npm install
npm run dev
```
## Instalación y ejecución local front

### 1. Clona el repositorio
```bash
git clone https://github.com/geo1605/ProyectoRaul.git
cd ProyectoUnidad
```

### 2. Configuración del entorno

Los archivos `.env` ya están configurados en el entorno de desarrollo, por lo que **no es necesario crear nuevos**. El proyecto ya está conectado a MongoDB Atlas y otros servicios necesarios.

### 3. Ejecutar la aplicación

Abre una terminal:

#### Terminal 1: servidor
```bash
npm install
npm run dev
```

### 4. Abrir en navegador

Por defecto, la app estará disponible en:  
[http://localhost:5173](http://localhost:5173)

---

## Roles y funciones

- **Alumno**:
  - Inicia sesión (usuario o Google)
  - Consulta listado de alumnos, usa filtros y buscador
  - Envía y recibe mensajes de otros alumnos

---

## Validaciones implementadas

- **Frontend:**
  - Campos vacíos
  - Email válido
  - Matricula completa 
  - ReCAPTCHA obligatorio
- **Backend:**
  - Express-validator en rutas
  - Revisión de tokens en rutas protegidas
  - Encriptación de contraseñas

---

## Seguridad

- JWT para mantener sesiones seguras
- Contraseñas encriptadas con `bcryptjs`
- Tokens en `localStorage`
- reCAPTCHA integrado en login

---

## Navegación

- Menú persistente
- Breadcrumbs para saber la ruta exacta
- Páginas personalizadas para errores:
  - 404: Página no encontrada
  - 500: Error interno del servidor

---

## Sistema de búsqueda y filtros

- Barra de búsqueda por nombre y matrícula
- Consulta eficiente a través del backend

---

## Capturas de pantalla (ver manual técnico)

- Login con reCAPTCHA
- Mensajes enviados y recibidos
- Validaciones visibles en formularios
- Búsqueda y filtros en acción
- Página 404 personalizada

---

## Video demostrativo

https://drive.google.com/file/d/1NT54VwsThfJQRaV23elPd5lQNiawUKCM/view?usp=drive_link

---

##  Estructura del proyecto

```
Actividad 5

├── ProyectoUnidad/	# Frontend (React)

│  └── src/                     # Lógica de rutas

│       └── api/	 # apis necesarias 

│	└── components/ # Componentes UI

│	└── contexts/	  # Contexto de autenticación

│	└── modules/	  # Páginas principales

│       └── App.tsx/	# Funcionamiento

├── BackRaul/	# Backend (Node + Express)

│  └── src/	# Lógica de rutas

│        └── config/	# Conexión a DB

│        └── controller/	# Lógica de rutas

│        └── models/	# Modelos Mongoose

│        └── routes/	# Rutas protegidas

│        └── utils/ 


---

##  Funcionalidades cumplidas

| Funcionalidad                                       | Estado |
|-----------------------------------------------------|--------|
| Login matricula/contraseña                          | ✅     |
| Login con Google                                    | ✅     |
| Validación reCAPTCHA                                | ✅     |
| Autenticación con JWT                               | ✅     |
| Encriptación de contraseñas                         | ✅     |
| Validación frontend/backend                         | ✅     |
| Sistema de mensajería (no chat)                     | ✅     |
| Búsqueda y filtros de alumnos                       | ✅     |
| Navegación clara con menú persistente               | ✅     |
| Páginas de error personalizadas (404 y 500)         | ✅     |
| Responsive + Accesibilidad básica                   | ✅     |
| Documentación técnica                               | ✅     |
| Video de presentación                               | ✅     |

---

## Contacto

Desarrollado por:
             ● Ortega Adame Ernesto
		         ● Arenas Reta Angel Geovany
		         ● Hernandez Rubio Manuel Alejandro
		         ● Antuna Leyva Marco Yahmir 
  
 Repositorio:[https://github.com/Matt2130/BackRaul] [https://github.com/geo1605/ProyectoRaul/tree/master]