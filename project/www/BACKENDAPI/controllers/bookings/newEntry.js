const { getConnection } = require("../../db");
//const { processAndSaveImage } = require("../../helpers");
const { randomString, sendMail } = require("../../helpers");

/*
id_toy: this.toyId,
id_delivery_point: deliveryPoint,
id_user_donor: this.idUserOfToy,
id_user_recives: userRecivedId,
email_user_donor: this.user.email,
email_user_recives: mymail,
datetosend: this.delipoints.date,
timetable: this.delipoints.timetable,
place: this.delipoints.place,
comments: this.delipoints.comments,
*/

async function newEntry(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    // Sacar de req.body los datos que necesitio
    const { id_toy, id_delivery_point, id_user_donor, id_user_recives, email_user_donor, email_user_recives, datetosend, timetable, place, comments, toy_name } = req.body;
    console.log(req.body)
    let state = 'confirmed';
    const  id = id_toy;
    let booking_code = randomString(10);
   
    // Comprobar que no no existe una entrada con el mismo id_toy
    const [existingEntry] = await connection.query(
      `
      SELECT id 
      FROM bookings
      WHERE id_toy=?
    `,
      [id_toy]
    );

    if (existingEntry.length > 0) {
      const error = new Error(
        "Ya existe una entrada en la base de datos con ese campo id_toy"
      );
      error.httpStatus = 409;
      throw error;
    }
    
    //Enviamos confirmación reserva por mail al usuario donante
    try {
      let email = email_user_donor;
      await sendMail({
        email,
        title: "Confirmación de la reserva en la web playtime",
        content: `Se ha confirmado la entrega de ${toy_name} el día ${datetosend} en el horario ${timetable} en ${place}. Los comentarios que dejaste para ese punto de entrega: ${comments}`,
      });
      console.log('Correo enviado a ' + email)
    } catch (error) {
      const emailError = new Error("Error en el envío de mail");
      throw emailError;
    }
    //Enviamos confirmación reserva por mail al usuario receptor
    try {
      let email = email_user_recives;
      await sendMail({
        email,
        title: "Confirmación de la reserva en la web playtime",
        content: `Se ha confirmado la entrega de ${toy_name} el día ${datetosend} en el horario ${timetable} en ${place}. Los comentarios que dejó el donante para ese punto de entrega: ${comments}`,
      });
      console.log('Correo enviado a ' + email)
    } catch (error) {
      const emailError = new Error("Error en el envío de mail");
      throw emailError;
    }

    let toy_name_selected = toy_name;
    let date_selected = datetosend;
    let timetable_selected = timetable;
    let place_selected = place;
    let comments_selected = comments;
    // Ejecutar la query
    const [result] = await connection.query(
      `
      INSERT INTO bookings(booking_code, state, date, lastUpdate, id_user_donor, id_user_recives, id_toy, id_delivery_point, toy_name_selected, date_selected, timetable_selected, place_selected, comments_selected)
      VALUES(?,?, UTC_TIMESTAMP(),UTC_TIMESTAMP(), ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [booking_code, state, id_user_donor, id_user_recives, id_toy, id_delivery_point, toy_name_selected, date_selected, timetable_selected, place_selected, comments_selected]
    );
    // Seleccionar datos actuales de la entrada toys
    const [current] = await connection.query(
      `
    SELECT state
    FROM toys
    WHERE id=?
  `,
      [id]
    );
        console.log('Campo state seleccionado')
    const [currentEntry] = current;
    // Ejecutar la query de edición de la entrada
    await connection.query(
      `
      UPDATE toys SET state=?, lastUpdate=UTC_TIMESTAMP()
      WHERE id=?
    `,
      ['sold', id]
    );
    console.log('Campo state cambiado')


    // Devolver el resultado

    res.send({
      status: "ok",
      data: {
        id: result.insertId,
        booking_code,
        state,
        id_user_donor,
        id_user_recives,
        id_toy,
        id_delivery_point,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newEntry;
