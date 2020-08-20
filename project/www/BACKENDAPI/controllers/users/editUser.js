const { getConnection } = require("../../db");
const {
  randomString,
  sendMail,
  processAndSaveImage,
} = require("../../helpers");

async function editUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;
    const { email, user_name, birth_date, direction, image, phone, surname } = req.body;
    console.log("////   ¡¡¡EDITANDO USUARIO!!!  //////")
    console.log(req.files)
    console.log(req.body)
 
    // Comprobar que el id de usuario que queremos cambiar es
    // el mismo que firma la petición o bien es admin
    if (req.auth.id !== Number(id) && req.auth.role !== "admin") {
      const error = new Error("No tienes permisos para editar este usuario");
      error.httpStatus = 403;
      throw error;
    }

    // Comprobar que el usuario existe
    const [currentUser] = await connection.query(
      `
      SELECT id, email, image
      FROM users
      WHERE id=?
    `,
      [id]
    );

    if (currentUser.length === 0) {
      const error = new Error(`El usuario con id ${id} no existe`);
      error.httpStatus = 404;
      throw error;
    }

    // Si el email es diferente al actual comprobar que no existe en la base de datos
    console.log(email)
    if (email !== currentUser[0].email) {
      console.log('Cambiando email...')
      const [existingEmail] = await connection.query(
        `
        SELECT id
        FROM users
        WHERE email=? 
      `,
        [email]
      );

      if (existingEmail.length > 0) {
        const error = new Error(
          "Ya existe un usuario con este email en la base de datos"
        );
        error.httpStatus = 403;
        throw error;
      }

      // Verificamos de nuevo el email recibido
      const registrationCode = randomString(40);
      const validationURL = `${process.env.PUBLIC_HOST}/users/validate/${registrationCode}`;

      //Enviamos la url anterior por mail
      try {
        await sendMail({
          email,
          title:
          "Cambiaste tu email en la aplicación diario de viajes. Por favor valida de nuevo",
          content: `Para validar tu nuevo email en la app diario de viajes haz click aquí: ${validationURL}`,
        });
      } catch (error) {
        const emailError = new Error("Error en el envío de mail");
        throw emailError;
      }
      
      let savedImageFileName;

      // Procesar la imagen si está en el body
      if (req.files && req.files.image) {
        try {
          // Procesar y guardar imagen
          //console.log(req.body.image)
          savedImageFileName = await processAndSaveImage(req.files.image);
        } catch (error) {
          const imageError = new Error(
            "No se pudo procesar la imagen. Inténtalo de nuevo"
          );
          imageError.httpStatus = 400;
          throw imageError;
        }
        
        console.log('Edito usuario con distinto mail con imagen')
        await connection.query(
          `
          UPDATE users 
          SET surname=?, phone=?, direction=?, birth_date=?, user_name=?, email=?, lastUpdate=UTC_TIMESTAMP(), lastAuthUpdate=UTC_TIMESTAMP(), active=false, registrationCode=?, image=?
          WHERE id=?
        `,
          [surname, phone, direction, birth_date, user_name, email, registrationCode, savedImageFileName, id]
        );

      } else {
        console.log('Edito usuario con distinto mail sin imagen')
        await connection.query(
          `
          UPDATE users 
          SET surname=?, phone=?, direction=?, birth_date=?, user_name=?, email=?, lastUpdate=UTC_TIMESTAMP(), lastAuthUpdate=UTC_TIMESTAMP(), active=false, registrationCode=?
          WHERE id=?
        `,
          [surname, phone, direction, birth_date, user_name, email, registrationCode, id]
        );
      }

      // Dar una respuesta
      res.send({
        status: "ok",
        message: "Usuario actualizado. Mira tu email para activarlo de nuevo.",
      });
    } else {

      let savedImageFileName;

      // Procesar la imagen si está en el body
      if (req.files && req.files.image) {
        try {
          console.log('Empieza procesado mismo mail con imagen')
          // Procesar y guardar imagen
          //console.log(req.body.image)
          savedImageFileName = await processAndSaveImage(req.files.image);
        } catch (error) {
          const imageError = new Error(
            "No se pudo procesar la imagen. Inténtalo de nuevo"
          );
          imageError.httpStatus = 400;
          throw imageError;
        }

        // Actualizar usuario en la base de datos
        console.log('Edito usuario con mismo mail con imagen')
        await connection.query(
          `
        UPDATE users 
        SET surname=?, phone=?, direction=?, birth_date=?, user_name=?, email=?, image=?, lastUpdate=UTC_TIMESTAMP()
        WHERE id=?
        `,
          [surname, phone, direction, birth_date, user_name, email, savedImageFileName, id]
        );

      } else {
        // Actualizar usuario en la base de datos
        console.log('Edito usuario con mismo mail sin imagen')
        await connection.query(
          `
        UPDATE users 
        SET surname=?, phone=?, direction=?, birth_date=?, user_name=?, email=?, lastUpdate=UTC_TIMESTAMP()
        WHERE id=?
      `,
          [surname, phone, direction, birth_date, user_name, email, id]
        );
      }


      // Dar una respuesta
      res.send({
        status: "ok",
        message: "Usuario actualizado",
      });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = editUser;
