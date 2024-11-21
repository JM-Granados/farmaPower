/**
 * @fileoverview Rutas relacionadas con la autenticación de usuarios.
 * 
 * Este archivo define rutas para la autenticación de usuarios utilizando Express.js.
 * Las rutas están diseñadas para ser integradas en una aplicación Express principal.
 * 
 * Se utiliza un controlador específico importado desde `../controllers/users.controller`
 * para manejar la lógica de negocio específica de cada ruta. La ruta definida incluye:
 * 
 * - POST /login: Maneja la autenticación de usuarios, verificando credenciales y devolviendo
 *   información del usuario autenticado.
 * 
 * Este archivo es esencial para la gestión de sesiones de usuario y la seguridad de la aplicación,
 * asegurando que solo usuarios autenticados puedan acceder a ciertas áreas del sistema.
 */



// Importa el módulo Express y específicamente el objeto Router desde el módulo express.
import express, { Router } from 'express';

// Crea una instancia de Router. Esto permite definir rutas en este objeto que luego pueden ser integradas en una aplicación Express principal.
const router = Router();

// Importa todo desde el archivo 'users.controller.js' ubicado en el directorio 'controllers' y lo asigna al objeto 'userCtrl'.
// Esto generalmente incluye funciones que actúan como controladores de solicitudes HTTP para las rutas relacionadas con usuarios.
import * as userCtrl from '../controllers/users.controller'
import * as pharmacyCtrl from '../controllers/pharmacyUser.controller'

import { upload } from '../multerConfig';

// Define una ruta POST en el path '/login'. Esto maneja las solicitudes POST enviadas a 'http://dominio.com/login'.
// 'userCtrl.loginUser' es una función controladora importada que se encarga de autenticar a un usuario.
// La función loginUser asume responsabilidades como verificar la existencia del usuario y validar la contraseña,
// y después devolver información del usuario si la autenticación es exitosa.
router.post('/login', userCtrl.loginUser);

router.post('/signup', upload.single('image'), userCtrl.signupUser);

router.post('/passRecovery', userCtrl.passRecovery);

router.get('/getUsers', userCtrl.getAllUsers);

router.get('/clients', userCtrl.getAllUsers); //aqui modificar a solo clientes

router.get('/getUsersSearched', userCtrl.getUsersSearched);

router.patch('/modifyUser', upload.single('image'), userCtrl.modifyUser);

// Exporta el objeto 'router'. Esto permite que las rutas definidas en este archivo sean usadas en otras partes de la aplicación Express,
// típicamente mediante el uso de app.use() en el archivo principal de la aplicación.
export default router;
