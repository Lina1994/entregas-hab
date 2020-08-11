const { getConnection } = require("../../db");

async function listEntries(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    // Sacamos las posibles opciones del querystring:
    //  search: para listar solo las entradas que contengan su valor en place o description
    //  order: para ordernar el listado por voteAverage, place o date
    //  direction: para la dirección de la ordenación desc o asc
    const { search, order, direction } = req.query;

    // Proceso la dirección de orden
    const orderDirection =
      (direction && direction.toLowerCase()) === "desc" ? "DESC" : "ASC";

    // Proceso el campo de orden
    let orderBy;
    switch (order) {
      case "booking_code":
        orderBy = "booking_code";
        break;
      case "state":
        orderBy = "state";
        break;
      case "id_user_recives":
        orderBy = "id_user_recives";
      default:
        orderBy = "date";
    }

    // Ejecuto la query en base a si existe querystring de search o no
    let queryResults;
    if (search) {
      queryResults = await connection.query(
        `
        SELECT id, vote, id_user, date, booking_code, state, id_toy
        FROM bookings 
        WHERE booking_code LIKE ? OR state LIKE ?
        ORDER BY ${orderBy} ${orderDirection}
        `,
        [`%${search}%`, `%${search}%`]
      );
    } else {
      queryResults = await connection.query(
        `
        SELECT id, vote, id_user, date, booking_code, state, id_toy
        FROM bookings  
        ORDER BY ${orderBy} ${orderDirection}`
      );
    }

    // Extraigo los resultados reales del resultado de la query
    const [result] = queryResults;

    // Mando la respuesta
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
