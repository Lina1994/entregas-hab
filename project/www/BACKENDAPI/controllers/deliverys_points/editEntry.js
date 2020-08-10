const { getConnection } = require("../../db");
const {
  processAndSaveImage,
  formatDateToDB,
  deleteUpload,
} = require("../../helpers");

async function editEntry(req, res, next) {
  let connection;
  console.log('Empezando edición de punto de entrega')
  try {
    connection = await getConnection();

    // Sacamos los datos
    const { timetable, place, date, comments } = req.body.data;
    const { id } = req.params;
    console.log(id)
    console.log(timetable)
    console.log(place)
    console.log(date)
    console.log(comments)
    console.log(req.body.data)
    // Seleccionar datos actuales de la entrada
    const [current] = await connection.query(
      `
    SELECT id, timetable, place, date, lastUpdate, id_user, comments
    FROM deliverys_points
    WHERE id=?
  `,
      [id]
    );
    console.log('test')
    const [currentEntry] = current;
    /*
    if (currentEntry.user_id !== req.auth.id && req.auth.role !== "admin") {
      const error = new Error("No tienes permisos para editar esta entrada");
      error.httpStatus = 403;
      throw error;
    }
    */
    // Ejecutar la query de edición de la entrada
    console.log('Editando punto de entrega')
    await connection.query(
      `
      UPDATE deliverys_points SET timetable=?, place=?, date=?, lastUpdate=UTC_TIMESTAMP(), comments=?
      WHERE id=?
    `,
    [timetable, place, date, comments, id]
      //[timetable, place, formatDateToDB(date), id, comments]
    );

    // Devolver resultados
    res.send({
      status: "ok",
      data: {
        id,
        timetable,
        place,
        date,
        comments,
      },
    });
    console.log('Editado punto de entrega')
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = editEntry;
