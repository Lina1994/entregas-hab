const { getConnection } = require("../../db");
//const { differenceInCalendarYears } = require("date-fns");

async function getMyVotes(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const id_user_donor = Number(req.params.id);
    console.log('id_user_donor desde back ' + req.params.id)
    console.log(Number(req.params.id))
    //console.log(id_user_donor)
    //const {id_user_donor} = dbUser[0].id;
    const data = {};
    let myqueryResults;
    myqueryResults = await connection.query(
      `
      SELECT vote
      FROM bookings
      WHERE id_user_donor=?
    `,
      [id_user_donor]
      );

      // Extraigo los resultados reales del resultado de la query
    const [result] = myqueryResults;
    
    // Calculo media de votos
    console.log('Cantidad de votos ' + result.length)
    let sum = 0;
    for (let i = 0; i < result.length; i++) {
        //const element = array[i];
        let {vote} = result[i];
        sum = sum + vote
        //console.log(vote)
    }
    let average = Math.floor( sum / result.length )
    console.log(sum + '/' + result.length + '= ' + average)

    if(!average){
        average = 'Aun no hay votos'
    }
    
    res.send({
      status: "ok",
      //data: result[0],
      data: average,
    });
    console.log('VOTOS:')
    console.log(result)
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}


module.exports = getMyVotes;