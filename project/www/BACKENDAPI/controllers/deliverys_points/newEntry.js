const { getConnection } = require("../../db");
const { processAndSaveImage } = require("../../helpers");

/*
id_user:
date: 
timetable: 
place: 
comments: 
*/

async function newEntry(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    // Sacar de req.body los datos que necesitio
    const { timetable, place, date} = req.body;
    console.log(req.body)
    console.log(timetable)

    // Comprobar que están todos los datos necesarios
    if (!timetable || !place ) {
      const error = new Error(
        "Faltan datos en la petición. El campo timetable y place son obligatorios"
      );
      error.httpStatus = 400;
      throw error;
    }

    // Ejecutar la query
    const [result] = await connection.query(
      `
      INSERT INTO deliverys_points(timetable, place, date, lastUpdate, id_user)
      VALUES(?,?,?, UTC_TIMESTAMP(), ?)
      `,
      [timetable, place, date, req.auth.id]
    );

    // Devolver el resultado

    res.send({
      status: "ok",
      data: {
        id: result.insertId,
        timetable,
        place,
        date,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newEntry;
