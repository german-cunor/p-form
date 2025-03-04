const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const sequelize = require("./db");
const Section = require("./Section");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;
const QUESTIONS_DIR = path.join(__dirname, "questions");

app.get("/api/questions/:section", (req, res) => {
    const section = req.params.section;
    const filePath = path.join(QUESTIONS_DIR, `section${section}.json`);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(404).json({ error: "Sección no encontrada" });
        }

        try {
            res.json(JSON.parse(data));
        } catch (parseError) {
            res.status(500).json({ error: "Error al procesar el archivo JSON" });
        }
    });
});

app.get("/api/history", async (req, res) => {
    try {
        const history = await sequelize.query(
            "SELECT section FROM SectionH;",
            {
                type: sequelize.QueryTypes.SELECT
            }
        );

        res.status(200).json(history);
    } catch (error) {
        console.error("Error al obtener el historial de secciones:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.get("/api/section/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const register = await Section.findByPk(id);

        if (!register) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }

        res.json(register);
    } catch (error) {
        console.error("Error al obtener el registro:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.post("/api/startform", async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        await sequelize.query(
            "INSERT INTO Users (name, description) VALUES (:name, :description);",
            {
                replacements: { name, description },
                type: sequelize.QueryTypes.INSERT
            }
        );

        await sequelize.query(
            "UPDATE data SET current = 1 WHERE id = 1;",
            {
                type: sequelize.QueryTypes.UPDATE
            }
        );

        await sequelize.query(
            `INSERT INTO SectionH (section) VALUES (1) ON CONFLICT (section) DO NOTHING;`,
            {
                type: sequelize.QueryTypes.INSERT
            }
        );

        res.status(201).json({ message: "Datos guardados con éxito" });
    } catch (error) {
        console.error("Error al insertar datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.post("/api/next", async (req, res) => {
    const answers = req.body;

    try {
        const currentResult = await sequelize.query(
            "SELECT current FROM data WHERE id = 1;",
            {
                type: sequelize.QueryTypes.SELECT
            }
        );

        const current = currentResult[0].current;
        const sectionTable = `Section${current}`;

        const tableExistsResult = await sequelize.query(
            `SELECT to_regclass('${sectionTable}');`,
            {
                type: sequelize.QueryTypes.SELECT
            }
        );

        const tableExists = tableExistsResult[0]?.to_regclass !== null;

        if (tableExists) {
            await sequelize.query(
                `TRUNCATE TABLE ${sectionTable};`,
                {
                    type: sequelize.QueryTypes.TRUNCATE
                }
            );
        } else {
            await sequelize.query(
                `CREATE TABLE ${sectionTable} (
                    id SERIAL PRIMARY KEY,
                    question_id TEXT NOT NULL,
                    answer_value INT NOT NULL
                );`,
                {
                    type: sequelize.QueryTypes.CREATE
                }
            );
        }

        for (const [questionId, answer] of Object.entries(answers)) {
            await sequelize.query(
                `INSERT INTO ${sectionTable} (question_id, answer_value) VALUES (:questionId, :answer);`,
                {
                    replacements: { questionId, answer },
                    type: sequelize.QueryTypes.INSERT
                }
            );
        }

        await sequelize.query(
            `INSERT INTO SectionH (section) VALUES (:current) ON CONFLICT (section) DO NOTHING;`,
            {
                replacements: { "current": current + 1 },
                type: sequelize.QueryTypes.INSERT
            }
        );

        await sequelize.query(
            "UPDATE data SET current = current + 1 WHERE id = 1;",
            {
                type: sequelize.QueryTypes.UPDATE
            }
        );

        res.status(200).json({ message: "Valor de current incrementado y respuestas guardadas con éxito" });
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


app.post("/api/prev", async (req, res) => {
    try {
        await sequelize.query(
            "UPDATE data SET current = current - 1 WHERE id = 1;",
            {
                type: sequelize.QueryTypes.UPDATE
            }
        );

        res.status(200).json({ message: "Valor de current incrementado con éxito" });
    } catch (error) {
        console.error("Error al actualizar current:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.post("/api/goto", async (req, res) => {
    const { section } = req.body;

    if (!Number.isInteger(section) || section < 1) {
        return res.status(400).json({ error: "El valor de 'section' debe ser un número entero positivo." });
    }

    try {
        await sequelize.query(
            "UPDATE data SET current = :section WHERE id = 1;",
            {
                replacements: { section },
                type: sequelize.QueryTypes.UPDATE
            }
        );

        res.status(200).json({ message: `Sección actualizada a ${section}` });
    } catch (error) {
        console.error("Error al actualizar la sección:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


app.get("/api/answers/:id", async (req, res) => {
    const { id } = req.params;
    const sectionTable = `Section${id}`;

    try {
        const tableExistsResult = await sequelize.query(
            `SELECT to_regclass('${sectionTable}');`,
            {
                type: sequelize.QueryTypes.SELECT
            }
        );

        const tableExists = tableExistsResult[0]?.to_regclass !== null;

        if (!tableExists) {
            return res.status(404).json({ message: `La tabla ${sectionTable} no existe` });
        }

        const [data] = await sequelize.query(`
            SELECT * FROM ${sectionTable};
        `);

        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los datos de la sección:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


app.get("/api/current", async (req, res) => {
    try {
        const [results, metadata] = await sequelize.query(
            'SELECT * FROM data;',
            {
                type: sequelize.QueryTypes.SELECT
            }
        );

        res.json(results);
    } catch (error) {
        console.error("Error al obtener el registro:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

sequelize.sync().then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
