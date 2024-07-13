const logger = (req, res, next) => {
  console.log(`Ruta accedida: ${req.originalUrl}`);
  next();
};

module.exports = logger;
