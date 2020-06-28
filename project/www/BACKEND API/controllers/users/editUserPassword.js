const { getConnection } = require("../../db");

async function editUserPassword(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params; //Importante: esto va a ser un string
    const { oldPassword, newPassword } = req.body;

    // Comprobar que el usuario que hace la petición es el mismo que quiere cambiar la pass
    if (req.auth.id !== Number(id)) {
      const error = new Error("No puedes cambiar la password de otro usuario");
      error.httpStatus = 403;
      throw error;
    }

    // Comprobar que la password antigua no es igual que la nueva
    if (oldPassword === newPassword) {
      const error = new Error(
        "Tu nueva password no puede ser igual que la antigua"
      );
      error.httpStatus = 400;
      throw error;
    }

    // Comprobar que el usuario existe
    // y que la password antigua es la correcta
    const [currentUser] = await connection.query(
      `
      SELECT id
      FROM users
      WHERE id=? AND password=SHA2(?, 512)
    `,
      [id, oldPassword]
    );

    if (currentUser.length === 0) {
      const error = new Error("Tu password antigua no es correcta");
      error.httpStatus = 401;
      throw error;
    }

    // Guardar nueva password
    await connection.query(
      `
      UPDATE users
      SET password=SHA2(?, 512), lastUpdate=UTC_TIMESTAMP(), lastAuthUpdate=UTC_TIMESTAMP()
      WHERE id=?
    `,
      [newPassword, id]
    );

    // Dar una respuesta
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

module.exports = editUserPassword;
