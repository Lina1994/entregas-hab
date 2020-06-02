USE zona_azul;

CREATE TABLE IF NOT EXISTS usuarios (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(50) NOT NULL,
	apellidos VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	DNI VARCHAR(50) NOT NULL,
	movil INT NOT NULL,
	cuenta_bancaria VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS vehiculos (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    matricula VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    color VARCHAR(50),
    id_usuario INT UNSIGNED,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
);

CREATE TABLE IF NOT EXISTS reclamaciones(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    notas VARCHAR(300) NOT NULL,
    id_usuario INT UNSIGNED,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
);

CREATE TABLE IF NOT EXISTS parking( 
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    hora_inicio TIME NOT NULL,
    hora_fin TIME,
    estado_cobro ENUM('se cobra','festivo, no cobra', 'fuera de horario de cobro'),
    precio_mínimo INT,
    limite_tiempo INT,
    observaciones VARCHAR(300),
    estado_usar ENUM('se puede aparcar', 'no se puede aparcar')
);
CREATE TABLE IF NOT EXISTS estaciona (
	id_vehiculo INT UNSIGNED,
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculos (id),
	id_parking INT UNSIGNED,
    FOREIGN KEY (id_parking) REFERENCES parking (id),
    PRIMARY KEY (id_vehiculo, id_parking ),
    hora_inicio TIMESTAMP DEFAULT current_timestamp,
    hora_fin timestamp DEFAULT current_timestamp, 
    multa INT DEFAULT 0,
    id_reclamacion INT UNSIGNED,
    FOREIGN KEY (id_reclamacion) REFERENCES reclamaciones (id)
);