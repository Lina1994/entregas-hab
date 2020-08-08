const { getConnection } = require("../db");

async function entryExists(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;

    console.log("comprobando que en la tabla de toys hay una entrada id", id);

    // Comprobar que la entrada que queremos editar exista en la base de datos
    const [current] = await connection.query(
      `
    SELECT id
    FROM toys
    WHERE id=?
  `,
      [id]
    );
    console.log(current.length)

    if (current.length === 0) {
      const error = new Error(
        `La entrada con id ${id} no existe en la base de datos`
      );
      error.httpStatus = 404;
      throw error;
    } else {
      next();
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = entryExists;
