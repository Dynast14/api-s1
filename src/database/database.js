const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
    constructor() {
        const dbPath = path.join(__dirname, 'medical.db');
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error al conectar con la base de datos:', err.message);
            } else {
                console.log('Conectado a la base de datos SQLite:', dbPath);
                this.initializeTables();
            }
        });
    }

    initializeTables() {
        // Tabla de doctores
        const createDoctorsTable = `
            CREATE TABLE IF NOT EXISTS doctors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                genre TEXT,
                sede TEXT NOT NULL,
                hospital TEXT NOT NULL,
                especializacion TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;

        // Tabla de pacientes (se corrige el nombre de columna a sede_de_atencion)
        const createPatientsTable = `
            CREATE TABLE IF NOT EXISTS patients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sede_de_atencion TEXT NOT NULL,
                numero TEXT NOT NULL,
                edad INTEGER NOT NULL,
                genre TEXT NOT NULL,
                enfermedad TEXT NOT NULL,
                estado TEXT NOT NULL,
                doctor_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (doctor_id) REFERENCES doctors (id)
            )
        `;

        this.db.run(createDoctorsTable, (err) => {
            if (err) {
                console.error('Error creando tabla doctors:', err.message);
            } else {
                console.log('Tabla doctors creada/verificada');
            }
        });

        this.db.run(createPatientsTable, (err) => {
            if (err) {
                console.error('Error creando tabla patients:', err.message);
            } else {
                console.log('Tabla patients creada/verificada');
            }
        });
    }

    getDatabase() {
        return this.db;
    }

    close() {
        this.db.close((err) => {
            if (err) {
                console.error('Error cerrando la base de datos:', err.message);
            } else {
                console.log('Base de datos cerrada');
            }
        });
    }
}

module.exports = Database;