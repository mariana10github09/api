import express from "express";
import fs from "fs";

const app = express();
app.use(express.json()); // Middleware para parsear JSON

const readData = () => {
    const data = fs.readFileSync("./db.json", "utf-8");
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2), "utf-8");
};

// Endpoint para actualizar datos
app.put("/update/:id", (req, res) => {
    const id = parseInt(req.params.id33); // Suponiendo que el ID es un número
    const newData = req.body;

    const data = readData();
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).send("Elemento no encontrado");
    }

    data[index] = { ...data[index], ...newData }; // Actualiza los datos
    writeData(data);

    res.send(`Elemento con ID ${id} actualizado correctamente`);
});

// Endpoint para mostrar todos los datos
app.get("/show", (req, res) => {
    const data = readData();
    res.json(data); // Devuelve todos los datos en formato JSON
});

// Endpoint para mostrar un dato específico por ID
app.get("/show/:id", (req, res) => {
    const id = parseInt(req.params.id); // Suponiendo que el ID es un número
    const data = readData();
    const item = data.find((item) => item.id === id);

    if (!item) {
        return res.status(404).send("Elemento no encontrado");
    }

    res.json(item); // Devuelve el elemento encontrado
});


// Endpoint para borrar datos
app.delete("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id); // Suponiendo que el ID es un número

    const data = readData();
    const filteredData = data.filter((item) => item.id !== id);

    if (data.length === filteredData.length) {
        return res.status(404).send("Elemento no encontrado");
    }

    writeData(filteredData);

    res.send(`Elemento con ID ${id} eliminado correctamente`);
});

app.get("/", (req, res) => {
    res.send("Hola Mundo desde Express");
});

app.listen(3000, () => {
    console.log("El servidor está escuchando en el puerto 3000");
});