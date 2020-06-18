const protectedRoute = (req, res, next) => {
  if (req.headers.authorization === "1234") {
    next();
  } else {
    // res.redirect("https://google.com");
    const error = new Error("No estás autorizado para ver esta ruta");
    error.httpStatus = 401;
    next(error);
  }
};

module.exports = {
  protectedRoute,
};
