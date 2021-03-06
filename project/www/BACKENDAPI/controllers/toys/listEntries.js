const { getConnection } = require("../../db");

async function listEntries(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    // Sacamos las posibles opciones del querystring:
    //  search: para listar solo las entradas que contengan su valor en place o description
    //  order: para ordernar el listado por voteAverage, place o date
    //  direction: para la dirección de la ordenación desc o asc
    const { search, order, direction } = req.headers;
    

    // Proceso la dirección de orden
    const orderDirection =
      (direction && direction.toLowerCase()) === "asc" ? "ASC" : "DESC";

    // Proceso el campo de orden
    let orderBy;
    switch (order) {
      case "toy_name":
        orderBy = "toy_name";
        break;
      case "recomended_age":
        orderBy = "recomended_age";
        break;
      case "locality":
        orderBy = "locality";
        break;
        case "category":
          orderBy = "category";
          break;
      default:
        orderBy = "date";
    }

    // Ejecuto la query en base a si existe querystring de search o no
    let queryResults;
    if (search) {
      queryResults = await connection.query(
        `
        SELECT id, toy_name, id_user, date, image, recomended_age, category, locality, state
        FROM toys 
        WHERE toy_name LIKE ? OR recomended_age LIKE ? OR locality LIKE ? OR category LIKE ? 
        ORDER BY ${orderBy} ${orderDirection}
        `,
        [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
      );
    } else {
      queryResults = await connection.query(
        `
        SELECT id, toy_name, id_user, date, image, recomended_age, category, locality, state
        FROM toys  
        WHERE state LIKE ?
        ORDER BY ${orderBy} ${orderDirection}
        `,
        ['forsale']
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
