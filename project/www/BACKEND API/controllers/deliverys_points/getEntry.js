const { getConnection } = require("../../db");
const { differenceInCalendarYears } = require("date-fns");

async function getEntry(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `
      SELECT *
      FROM deliverys_points
      WHERE id=?
    `,
      [id]
    );

    res.send({
      status: "ok",
      data: result[0],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getEntry;
 