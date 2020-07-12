const { getConnection } = require("../../db");
const { processAndSaveImage } = require("../../helpers");

async function newEntry(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    // Sacar de req.body los datos que necesitio
    const { vote, booking_code, state } = req.body;
   
    // Comprobar que no no existe una entrada con el mismo id_toy
    const [existingEntry] = await connection.query(
      `
      SELECT id 
      FROM bookings
      WHERE id_toy=?
    `,
      [id_toy]
    );

    if (existingEntry.length > 0) {
      const error = new Error(
        "Ya existe una entrada en la base de datos con ese campo id_toy"
      );
      error.httpStatus = 409;
      throw error;
    }
    
    // Ejecutar la query
    const [result] = await connection.query(
      `
      INSERT INTO bookings(vote, booking_code, state, date, lastUpdate, id_user, id_toy, id_delivery_point)
      VALUES(?,?,?, UTC_TIMESTAMP(),UTC_TIMESTAMP(), ?, ?, ?)
      `,
      [vote, booking_code, state, req.auth.id, id_toy, id_delivery_point]
    );

    // Devolver el resultado

    res.send({
      status: "ok",
      data: {
        id: result.insertId,
        vote,
        booking_code,
        state,
        id_toy,
        id_delivery_point,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newEntry;
