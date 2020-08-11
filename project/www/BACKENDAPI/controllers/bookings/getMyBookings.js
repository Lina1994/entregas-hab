const { getConnection } = require("../../db");
//const { differenceInCalendarYears } = require("date-fns");

async function getMyBokkings(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const id_user_recives = Number(req.params.id);
    console.log('ID_USER desde back ' + req.params.id)
    console.log(Number(req.params.id))
    //console.log(id_user)
    //const {id_user} = dbUser[0].id;
    const data = {};
    let myqueryResults;
    myqueryResults = await connection.query(
      `
      SELECT *
      FROM bookings
      WHERE id_user_recives=?
    `,
      [id_user_recives]
      );

      // Extraigo los resultados reales del resultado de la query
    const [result] = myqueryResults;

    res.send({
      status: "ok",
      //data: result[0],
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}


module.exports = getMyBokkings;