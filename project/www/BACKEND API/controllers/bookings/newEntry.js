const { getConnection } = require("../../db");
const { processAndSaveImage } = require("../../helpers");

async function newEntry(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    // Sacar de req.body los datos que necesitio
    const { toy_name, description, locality, recomended_age, category} = req.body;

    // Comprobar que están todos los datos necesarios
    if (!toy_name) {
      const error = new Error(
        "Faltan datos en la petición. El campo toy_name es obligatorio"
      );
      error.httpStatus = 400;
      throw error;
    }
   /*
    // Comprobar que no no existe una entrada con el mismo place
    const [existingEntry] = await connection.query(
      `
      SELECT id 
      FROM toys
      WHERE place=?
    `,
      [place]
    );

    if (existingEntry.length > 0) {
      const error = new Error(
        "Ya existe una entrada en la base de datos con ese campo place"
      );
      error.httpStatus = 409;
      throw error;
    }
    */
    let savedImageFileName;

    // Procesar la imagen si está en el body
    if (req.files && req.files.image) {
      try {
        // Procesar y guardar imagen
        savedImageFileName = await processAndSaveImage(req.files.image);
      } catch (error) {
        const imageError = new Error(
          "No se pudo procesar la imagen. Inténtalo de nuevo"
        );
        imageError.httpStatus = 400;
        throw imageError;
      }
    }

    // Ejecutar la query
    const [result] = await connection.query(
      `
      INSERT INTO toys(image, description, locality, recomended_age, category, toy_name, date, lastUpdate, id_user)
      VALUES(?,?,?,?,?,?,UTC_TIMESTAMP(),UTC_TIMESTAMP(), ?)
      `,
      [savedImageFileName, description, locality, recomended_age, category, toy_name, req.auth.id]
    );

    // Devolver el resultado

    res.send({
      status: "ok",
      data: {
        id: result.insertId,
        toy_name,
        description,
        locality,
        recomended_age,
        category,
        image: savedImageFileName,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newEntry;
