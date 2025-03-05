import express from "express";
import UsersRoutes from "./routes/UsersRoutes.js";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.use(express.json()); // Permitir JSON en las peticiones
app.use("/apiV1/users", UsersRoutes);

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Pagina principal:  http://localhost:${PORT}`);
});
