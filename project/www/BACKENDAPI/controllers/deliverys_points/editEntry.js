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
    const { timetable, place, date } = req.body;
    const { id } = req.params;

    // Seleccionar datos actuales de la entrada
    const [current] = await connection.query(
      `
    SELECT id, timetable, place, date, lastUpdate, id_user
    FROM deliverys_points
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
      UPDATE deliverys_points SET timetable=?, place=?, date=?, lastUpdate=UTC_TIMESTAMP()
      WHERE id=?
    `,
      [timetable, place, formatDateToDB(date), id]
    );

    // Devolver resultados
    res.send({
      status: "ok",
      data: {
        id,
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

module.exports = editEntry;
