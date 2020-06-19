const { getConnection } = require("../../db");

async function listEntries(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { search } = req.query;

    let queryResults;

    if (search) {
      queryResults = await connection.query(
        `
        SELECT * FROM diary
        WHERE place LIKE ? OR description LIKE ?
        ORDER BY date DESC
        `,
        [`%${search}%`, `%${search}%`]
      );
    } else {
      queryResults = await connection.query(
        `
        SELECT diary.*,
        (SELECT AVG(vote) FROM diary_votes WHERE entry_id=diary.id) AS voteAverage
        FROM diary 
        ORDER BY date DESC`
      );
    }

    const [result] = queryResults;

    res.send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = listEntries;
