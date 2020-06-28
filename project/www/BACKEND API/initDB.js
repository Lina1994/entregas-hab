require("dotenv").config();

const faker = require("faker/locale/es");
const { getConnection } = require("./db");
const { formatDateToDB } = require("./helpers");
const { formatDateToDBDay } = require("./helpers");
const { random, times } = require("lodash");

let connection;

async function main() {
  try {
    // Conseguir conexión a la base de datos
    connection = await getConnection();

    // Borrar las tablas si existen (diary, diary_votes)
    console.log("Borrando tablas");
    await connection.query("DROP TABLE IF EXISTS bookings");
    await connection.query("DROP TABLE IF EXISTS deliverys_points");
    await connection.query("DROP TABLE IF EXISTS toys");
    await connection.query("DROP TABLE IF EXISTS users");

    // Crear las tablas de nuevo
    console.log("Creando tablas");

    await connection.query(`
      CREATE TABLE users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_name VARCHAR(50) NOT NULL,
        surname VARCHAR(50) NOT NULL,
        direction VARCHAR(50) NOT NULL,
        birth_date DATE,
        phone VARCHAR(20),
        registrationDate DATETIME NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TINYTEXT NOT NULL,
        role ENUM("normal", "admin") DEFAULT "normal" NOT NULL,
        image TINYTEXT,
        active BOOLEAN DEFAULT false,
        registrationCode TINYTEXT,
        passwordUpdateCode TINYTEXT,
        lastUpdate DATETIME NOT NULL,
        lastAuthUpdate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE toys (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        photo VARCHAR(350),
        description VARCHAR(500),
        locality VARCHAR(50),
        recomended_age INT,
        category VARCHAR(50),
        toy_name VARCHAR(50),
        date DATETIME NOT NULL,
        lastUpdate DATETIME NOT NULL,
        id_user INT UNSIGNED,
        FOREIGN KEY (id_user) REFERENCES users (id)
      );
    `);

    await connection.query(`
      CREATE TABLE deliverys_points (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        date DATETIME NOT NULL,
        timetable VARCHAR(50),
        place varchar(50),
        lastUpdate DATETIME NOT NULL,
        id_user INT UNSIGNED,
        FOREIGN KEY (id_user) REFERENCES users (id)
      )
    `);

    await connection.query(`
      CREATE TABLE bookings (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        date DATETIME NOT NULL,
        vote TINYINT,
	      booking_code VARCHAR(50),
        state ENUM("confirmed", "unconfirmed") DEFAULT "unconfirmed" NOT NULL,
        lastUpdate DATETIME NOT NULL,
        id_user INT UNSIGNED,
        FOREIGN KEY (id_user) REFERENCES users (id),
        id_toy INT UNSIGNED,
        FOREIGN KEY (id_toy) REFERENCES toys (id),
        id_delivery_point INT UNSIGNED,
        FOREIGN KEY (id_delivery_point) REFERENCES deliverys_points (id)
      )
    `);

    // Meter datos de prueba en las tablas
    
    //////////// SUPERUSUARIO /////////////////
    console.log("Creando usuario administrador");

    await connection.query(
      `
      INSERT INTO users(registrationDate, email, password, role, user_name, surname, direction, birth_date, phone, active, lastUpdate)
      VALUES(UTC_TIMESTAMP(), "luciagc994@gmail.com", SHA2("${process.env.DEFAULT_ADMIN_PASSWORD}", 512), "admin", "Lucia Carolina", "González Chans", "Algun sitio", "1994-01-18", "618000000", true, UTC_TIMESTAMP())
    `
    );

    ///////////// USERS RANDOM NORMIS ////////////////
    console.log("Metiendo datos de prueba en users");
    const users = 10;

    for (let index = 0; index < users; index++) {
      const email = faker.internet.email();
      const user_name = faker.name.firstName();
      const surname = faker.name.lastName();
      const direction = faker.address.streetAddress();
      const birth_date = formatDateToDB(faker.date.recent());
      const phone = faker.phone.phoneNumber();

      await connection.query(
        `
        INSERT INTO users(registrationDate, email, password, role, user_name, surname, direction, birth_date, phone, lastUpdate)
        VALUES(UTC_TIMESTAMP(), "${email}", SHA2("${faker.internet.password()}", 512), "normal", "${user_name}", "${surname}", "${direction}", "${birth_date}", "${phone}", UTC_TIMESTAMP())
      `
      );
    }
    ////////////// TOYSR'S //////////////////////////////
    console.log("Metiendo datos de prueba en toys");

    const toysEntries = 30;
    
    for (let index = 0; index < toysEntries; index++) {
      const recomended_age = faker.random.number(18);
      const date = formatDateToDB(faker.date.recent());
      const toy_name = faker.commerce.productName();
      const category = faker.random.objectElement(["electronica", "peluche", "lego", "barbie", "videojuego"]);

      await connection.query(`
        INSERT INTO toys(description, locality, recomended_age, date, toy_name, category, lastUpdate, id_user)
        VALUES( 
          "${faker.lorem.paragraph()}", 
          "${faker.address.city()}", 
          "${recomended_age}",
          "${date}",
          "${toy_name}",
          "${category}",
          UTC_TIMESTAMP(), 
          "${random(2, users + 1)}")
      `);
    }

   /////////////// deliverys_points ///////////////
    console.log("Metiendo datos de prueba en los puntos de entrega");

    const deliverys_points = 20;

    for (let index = 0; index <deliverys_points; index++){
      const date = formatDateToDBDay(faker.date.future());
      const timetable = faker.random.objectElement(["08:00-10:00", "11:00-13:00", "14:00-16:00","17:00-19:00","20:00-22:00",])
      const place = faker.address.streetAddress();

      await connection.query(`
       INSERT INTO deliverys_points(date, timetable, place, lastUpdate, id_user)
       VALUES(
         "${date}",
         "${timetable}",
         "${place}",
         UTC_TIMESTAMP(), 
        "${random(2, users + 1)}")
      `);
    }

    /////////////// RESERVAS ///////////////
    console.log("Metiendo datos de prueba en las reservas.");

    const bookings = 5;

    for (index = 0; index < bookings; index++) {
      const date = formatDateToDBDay(faker.date.future());
      const booking_code = faker.random.alphaNumeric(20);
      const state = faker.random.objectElement(["confirmed", "unconfirmed"]);

      await connection.query(`
      INSERT INTO bookings(date, vote, booking_code, state, lastUpdate, id_user, id_toy, id_delivery_point)
      VALUES(
        "${date}",
        "${random(1, 5)}",
        "${booking_code}",
        "${state}",
        UTC_TIMESTAMP(), 
        "${random(2, users + 1)}",
        "${random(1,toysEntries)}",
        "${random(1, deliverys_points)}")
      `);
    }

  } catch (error) {
    console.error(error);
  } finally {
    console.log("Todo hecho, liberando conexión");
    if (connection) connection.release();
    process.exit();
  }
}

main();
