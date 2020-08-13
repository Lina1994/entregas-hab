const { getConnection } = require("../../db");
const {
  processAndSaveImage,
  formatDateToDB,
  deleteUpload,
} = require("../../helpers");

async function editEntry(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Sacamos los datos
    const { vote, booking_code, state, date } = req.body;
    const { id } = req.params;

    // Seleccionar datos actuales de la entrada
    const [current] = await connection.query(
      `
    SELECT id, vote, booking_code, state, date, lastUpdate, id_user, id_toy, id_delivery_point
    FROM bookings
    WHERE id=?
  `,
      [id]
    );

    const [currentEntry] = current;

    if (currentEntry.user_id !== req.auth.id && req.auth.role !== "admin") {
      const error = new Error("No tienes permisos para editar esta entrada");
      error.httpStatus = 403;
      throw error;
    }

    // Ejecutar la query de edición de la entrada
    await connection.query(
      `
      UPDATE bookings SET vote=?, booking_code=?, state=?, date=?, lastUpdate=UTC_TIMESTAMP()
      WHERE id=?
    `,
      [vote, booking_code, state, formatDateToDB(date), id]
    );

    // Devolver resultados
    res.send({
      status: "ok",
      data: {
        id,
        vote,
        booking_code,
        state,
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
