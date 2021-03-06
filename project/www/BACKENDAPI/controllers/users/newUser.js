const { getConnection } = require("../../db");
const { randomString, sendMail } = require("../../helpers");

async function newUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { user_name, surname, direction, email, password } = req.body;

    // comprobar que se reciben todos los datos necesarios

    if (!email || !password || !user_name || !surname || !direction) {
      const error = new Error(
        "Faltan datos, es necesario especificar un nombre, apellido, dirección, email y una password"
      );
      error.httpStatus = 400;
      throw error;
    }

    // comprobar que no existe un usuario con ese mismo email en la base de datos
    const [existingUser] = await connection.query(
      `
      SELECT id 
      FROM users
      WHERE email=?
    `,
      [email]
    );

    if (existingUser.length > 0) {
      const error = new Error(
        "Ya existe un usuario en la base de datos con ese email"
      );
      error.httpStatus = 409;
      throw error;
    }

    // enviar un mensaje de confirmación de registro al email indicado
    // ejemplo url validación:
    // http://localhost:3000/users/validate/454e5109e4f3245c63be6fddb9ab05e4296ad1c6

    const registrationCode = randomString(40);
    const validationURL = `${process.env.PUBLIC_HOST}/users/validate/${registrationCode}`;

    //Enviamos la url anterior por mail
    try {
      await sendMail({
        email,
        title: "Valida tu cuenta de usuario en la web playtime",
        content: `Tu código de validación es: ${registrationCode}, para validar tu cuenta de usuario en la web playtime haz click aquí: ${validationURL}`,
      });
      console.log('Correo enviado a ' + email)
    } catch (error) {
      const emailError = new Error("Error en el envío de mail");
      throw emailError;
    }
    let image = '48433ece-3fab-4cef-9433-1c6bab5f5475.jpg';
    // meter el nuevo usuario en la base de datos sin activar
    await connection.query(
      `
      INSERT INTO users(registrationDate, user_name, surname, direction, email, password, registrationCode, lastUpdate, image)
      VALUES(UTC_TIMESTAMP(), ?, ?, ?, ?, SHA2(?, 512), ?, UTC_TIMESTAMP(), ?)
    `,
      [user_name, surname, direction, email, password, registrationCode, image]
    );

    res.send({
      status: "ok",
      message:
        "Usuario registrado. Mira tu email para activarlo. Mira en la carpeta de SPAM si no lo encuentras",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newUser;
