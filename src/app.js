const express = require('express');
const Doctor = require('./database/doctor');
const Paciente = require('./database/paciente');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas para Doctores
app.route('/doctors')
    .get((req, res) => {
        const doctor = new Doctor();
        doctor.findAll((err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        });
    })
    .post((req, res) => {
        const { name, genre, sede, hospital, especializacion } = req.body;
        const doctor = new Doctor();
        
        doctor.create(name, genre, sede, hospital, especializacion, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'Doctor creado exitosamente', id: result.id });
        });
    });

app.route('/doctors/:id')
    .get((req, res) => {
        const doctor = new Doctor();
        doctor.findById(req.params.id, (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (!row) {
                res.status(404).json({ error: 'Doctor no encontrado' });
                return;
            }
            res.json(row);
        });
    })
    .put((req, res) => {
        const { name, genre, sede, hospital, especializacion } = req.body;
        const doctor = new Doctor();
        
        doctor.update(req.params.id, name, genre, sede, hospital, especializacion, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.changes === 0) {
                res.status(404).json({ error: 'Doctor no encontrado' });
                return;
            }
            res.json({ message: 'Doctor actualizado exitosamente' });
        });
    })
    .delete((req, res) => {
        const doctor = new Doctor();
        doctor.delete(req.params.id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.changes === 0) {
                res.status(404).json({ error: 'Doctor no encontrado' });
                return;
            }
            res.json({ message: 'Doctor eliminado exitosamente' });
        });
    });

// Rutas para Pacientes
app.route('/patients')
    .get((req, res) => {
        const paciente = new Paciente();
        paciente.findAll((err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        });
    })
    .post((req, res) => {
        // Atención: campo en la BD es 'sede_de_atencion'
        const { sede_de_atencion, numero, edad, genre, enfermedad, estado, doctor_id } = req.body;
        const paciente = new Paciente();
        
        paciente.create(sede_de_atencion, numero, edad, genre, enfermedad, estado, doctor_id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'Paciente creado exitosamente', id: result.id });
        });
    });

app.route('/patients/:id')
    .get((req, res) => {
        const paciente = new Paciente();
        paciente.findById(req.params.id, (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (!row) {
                res.status(404).json({ error: 'Paciente no encontrado' });
                return;
            }
            res.json(row);
        });
    })
    .put((req, res) => {
        const { sede_de_atencion, numero, edad, genre, enfermedad, estado, doctor_id } = req.body;
        const paciente = new Paciente();
        
        paciente.update(req.params.id, sede_de_atencion, numero, edad, genre, enfermedad, estado, doctor_id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.changes === 0) {
                res.status(404).json({ error: 'Paciente no encontrado' });
                return;
            }
            res.json({ message: 'Paciente actualizado exitosamente' });
        });
    })
    .delete((req, res) => {
        const paciente = new Paciente();
        paciente.delete(req.params.id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.changes === 0) {
                res.status(404).json({ error: 'Paciente no encontrado' });
                return;
            }
            res.json({ message: 'Paciente eliminado exitosamente' });
        });
    });

// Ruta para obtener pacientes por doctor
app.get('/doctors/:id/patients', (req, res) => {
    const paciente = new Paciente();
    paciente.findByDoctor(req.params.id, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Iniciar el servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Sistema médico API ejecutándose en http://0.0.0.0:${port}`);
});

// Manejar el cierre graceful
process.on('SIGINT', () => {
    console.log('Apagando servidor...');
    process.exit(0);
});
