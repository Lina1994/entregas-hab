use playtime;

CREATE TABLE IF NOT EXISTS users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	user_name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    direction VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    birth_date DATE,
    phone VARCHAR(20),
    user_password VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS toys (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	image VARCHAR(350),
    description VARCHAR(350),
    locality VARCHAR(50),
    recomended_age INT,
    category VARCHAR(50),
    toy_nome VARCHAR(50),
	id_user INT UNSIGNED,
    FOREIGN KEY (id_user) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS usersdeliverys_points (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	timetable VARCHAR(50),
	place varchar(50),
    id_user INT UNSIGNED,
    FOREIGN KEY (id_user) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS bookings (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    vote DECIMAL,
    booking_code VARCHAR(50),
    commentary VARCHAR(300),
    state VARCHAR(50),
    id_user INT UNSIGNED,
    FOREIGN KEY (id_user) REFERENCES users (id),
    id_toy INT UNSIGNED,
    FOREIGN KEY (id_toy) REFERENCES toys (id),
    id_delivery_point INT UNSIGNED,
    FOREIGN KEY (id_delivery_point) REFERENCES deliverys_points (id)
);