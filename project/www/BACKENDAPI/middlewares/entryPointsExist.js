const { getConnection } = require("../db");

async function entryPointsExists(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;
    
    console.log("comprobando que en la tabla de deliverys_points hay una entrada id", id);

    // Comprobar que la entrada que queremos editar exista en la base de datos
    const [current] = await connection.query(
      `
    SELECT id
    FROM deliverys_points
    WHERE id=?
  `,
      [id]
    );

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

module.exports = entryPointsExists;