const { getConnection } = require("../../db");
const {
  processAndSaveImage,
  formatDateToDB,
  deleteUpload,
} = require("../../helpers");

async function editToVote(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Sacamos los datos
    const { vote } = req.body.data;
    const { id } = req.params;
    console.log(vote)

    // Seleccionar datos actuales de la entrada
    const [current] = await connection.query(
      `
    SELECT id, vote
    FROM bookings
    WHERE id=?
  `,
      [id]
    );

    const [currentEntry] = current;

    // Ejecutar la query de edición de la entrada
    await connection.query(
      `
      UPDATE bookings SET vote=?
      WHERE id=?
    `,
      [vote, id]
    );

    // Devolver resultados
    res.send({
      status: "ok",
      data: {
        id,
        vote,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = editToVote;