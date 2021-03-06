const { getConnection } = require("../../db");
const {
  processAndSaveImage,
  /*formatDateToDB,*/
  deleteUpload,
} = require("../../helpers");

async function editEntry(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Sacamos los datos
    //console.log(req.body.data)
    const { image, description, locality, recomended_age, category, toy_name, date } = req.body;
    const { id } = req.params;
    console.log(req.body)
    console.log(req.params)

    // Seleccionar datos actuales de la entrada
    const [current] = await connection.query(
      `
    SELECT id, image, description, locality, recomended_age, category, toy_name, date, lastUpdate, id_user
    FROM toys
    WHERE id=?
  `,
      [id]
    );

    const [currentEntry] = current;
/*
    if (currentEntry.user_id !== req.auth.id && req.auth.role !== "admin") {
      const error = new Error("No tienes permisos para editar esta entrada");
      error.httpStatus = 403;
      throw error;
    }
    */
/*
    let savedImageFileName;

    // Procesar la imagen si existe
    if (req.files && req.files.image) {
      try {
        // Procesar y guardar imagen
        savedImageFileName = await processAndSaveImage(req.files.image);

        if (currentEntry.image) await deleteUpload(currentEntry.image);
      } catch (error) {
        const imageError = new Error(
          "No se pudo procesar la imagen. Inténtalo de nuevo"
        );
        imageError.httpStatus = 400;
        throw imageError;
      }
    } else {
      savedImageFileName = currentEntry.image;
    }
*/


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
      // Ejecutar la query
      await connection.query(
      `
      UPDATE toys SET image=?, description=?, locality=?, recomended_age=?, category=?, toy_name=?, lastUpdate=UTC_TIMESTAMP()
      WHERE id=?
      `,
      [savedImageFileName, description, locality, recomended_age, category, toy_name, id]
    );
    }else {
      
      // Ejecutar la query de edición de la entrada
      await connection.query(
      `
      UPDATE toys SET description=?, locality=?, recomended_age=?, category=?, toy_name=?, lastUpdate=UTC_TIMESTAMP()
      WHERE id=?
    `,
      [description, locality, recomended_age, category, toy_name, id]
    );

    }




    
    /*
    // Ejecutar la query de edición de la entrada
    await connection.query(
      `
      UPDATE toys SET image=?, description=?, locality=?, recomended_age=?, category=?, toy_name=?, date=?, lastUpdate=UTC_TIMESTAMP()
      WHERE id=?
    `,
      [image, description, locality, recomended_age, category, toy_name, formatDateToDB(date), id]
    );
    */

    // Devolver resultados
    res.send({
      status: "ok",
      data: {
        id,
        image,
        description,
        locality,
        recomended_age,
        category,
        toy_name,
        date,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = editEntry;
