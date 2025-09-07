const Database = require('./database');

class Doctor {
    constructor() {
        this.db = new Database().getDatabase();
    }

    // Crear un nuevo doctor
    create(name, genre, sede, hospital, especializacion, callback) {
        const sql = `INSERT INTO doctors (name, genre, sede, hospital, especializacion) 
                  VALUES (?, ?, ?, ?, ?)`;

        this.db.run(sql, [name, genre, sede, hospital, especializacion], function(err) {
            callback(err, { id: this ? this.lastID : null });
        });
    }

    // Obtener todos los doctores
    findAll(callback) {
        const sql = "SELECT * FROM doctors";
        this.db.all(sql, [], callback);
    }

    // Obtener un doctor por ID
    findById(id, callback) {
        const sql = "SELECT * FROM doctors WHERE id = ?";
        this.db.get(sql, [id], callback);
    }

    // Actualizar un doctor
    update(id, name, genre, sede, hospital, especializacion, callback) {
        const sql = `UPDATE doctors 
                     SET name = ?, genre = ?, sede = ?, hospital = ?, especializacion = ? 
                     WHERE id = ?`;

        this.db.run(sql, [name, genre, sede, hospital, especializacion, id], function(err) {
            callback(err, { changes: this ? this.changes : 0 });
        });
    }

    // Eliminar un doctor
    delete(id, callback) {
        const sql = "DELETE FROM doctors WHERE id = ?";
        this.db.run(sql, [id], function(err) {
            callback(err, { changes: this ? this.changes : 0 });
        });
    }
}

module.exports = Doctor;