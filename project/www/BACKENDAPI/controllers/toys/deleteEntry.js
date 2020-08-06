const { getConnection } = require("../../db");
const { deleteUpload } = require("../../helpers");

async function deleteEntry(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    // Comprobar que existe esa id y si no dar error404
    const [current] = await connection.query(
      `
      SELECT user_id, image
      FROM toys
      WHERE id=?
    `,
      [id]
    );

    if (current[0].user_id !== req.auth.id && req.auth.role !== "admin") {
      const error = new Error("No tienes permisos para borrar esta entrada");
      error.httpStatus = 403;
      throw error;
    }

    // Si la entrada tiene imagen asociada borrarla
    if (current[0].image) {
      await deleteUpload(current[0].image);
    }

    // Borrar la entrada de la tabla
    await connection.query(
      `
      DELETE FROM toys
      WHERE id=?
    `,
      [id]
    );
         /*
    // Borrar votos asociados a esa entrda en la tabla diary_votes
    await connection.query(
      `
      DELETE FROM diary_votes
      WHERE entry_id=?
      `,
      [id]
    );
       */
    res.send({
      status: "ok",
      message: `La entrada ${id} de la tabla toys fue borrada y también sus votos`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = deleteEntry;
