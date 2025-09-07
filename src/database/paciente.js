const Database = require('./database');

class Paciente {
	constructor() {
		this.db = new Database().getDatabase();
	}

	create(sede_de_atencion, numero, edad, genre, enfermedad, estado, doctor_id, callback) {
		const sql = `INSERT INTO patients (sede_de_atencion, numero, edad, genre, enfermedad, estado, doctor_id)
		             VALUES (?, ?, ?, ?, ?, ?, ?)`;
		this.db.run(sql, [sede_de_atencion, numero, edad, genre, enfermedad, estado, doctor_id], function(err) {
			callback(err, { id: this ? this.lastID : null });
		});
	}

	findAll(callback) {
		const sql = "SELECT * FROM patients";
		this.db.all(sql, [], callback);
	}

	findById(id, callback) {
		const sql = "SELECT * FROM patients WHERE id = ?";
		this.db.get(sql, [id], callback);
	}

	update(id, sede_de_atencion, numero, edad, genre, enfermedad, estado, doctor_id, callback) {
		const sql = `UPDATE patients
		             SET sede_de_atencion = ?, numero = ?, edad = ?, genre = ?, enfermedad = ?, estado = ?, doctor_id = ?
		             WHERE id = ?`;
		this.db.run(sql, [sede_de_atencion, numero, edad, genre, enfermedad, estado, doctor_id, id], function(err) {
			callback(err, { changes: this ? this.changes : 0 });
		});
	}

	delete(id, callback) {
		const sql = "DELETE FROM patients WHERE id = ?";
		this.db.run(sql, [id], function(err) {
			callback(err, { changes: this ? this.changes : 0 });
		});
	}

	findByDoctor(doctorId, callback) {
		const sql = "SELECT * FROM patients WHERE doctor_id = ?";
		this.db.all(sql, [doctorId], callback);
	}
}

module.exports = Paciente;