const { getConnection } = require("../../db");

async function resetUserPassword(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { recoverCode, newPassword } = req.body;

    // Comprobar que existe un usuario con el código de recover en la base de datos
    const [current] = await connection.query(
      `
      SELECT id
      FROM users
      WHERE passwordUpdateCode=?
    `,
      [recoverCode]
    );

    if (current.length === 0) {
      const error = new Error(
        "No hay ningún usuario con este código de recuperación de password"
      );
      error.httpStatus = 404;
      throw error;
    }

    // Actualizar password
    await connection.query(
      `
      UPDATE users
      SET password=SHA2(?, 512), passwordUpdateCode=NULL, lastUpdate=NOW(), lastAuthUpdate=NOW()
      WHERE passwordUpdateCode=?
    `,
      [newPassword, recoverCode]
    );

    res.send({
      status: "ok",
      message: "Password actualizada",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = resetUserPassword;
