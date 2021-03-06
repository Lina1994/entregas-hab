const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");
const crypto = require("crypto");

const sendgrid = require("@sendgrid/mail");

const { format } = require("date-fns");

// Definimos directorio de subida de imágenes
const imageUploadPath = path.join(__dirname, process.env.UPLOADS_DIR);

function formatDateToDB(date) {
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
}

function formatDateToDBDay(date) {
  return format(new Date(date), "yyyy-MM-dd");
}

async function processAndSaveImage(uploadedImage) {
  console.log('Empezando procesado de imagen')
  console.log(uploadedImage)

  // DEFINIMOS DIRECTORIO DE SUBIDA
  console.log('test');
  const imageUploadPath = path.join(__dirname, process.env.UPLOADS_DIR);
  console.log('Dirección de subida definida');
  console.log(imageUploadPath)

  // Creamos el directorio (con recursive: true por si hay subdirectorios y así no da error)
  await fs.mkdir(imageUploadPath, { recursive: true });
  console.log("Creado directorio");

  // Leer la imagen que se subio
  console.log("Leyendo la imagen");
  const image = sharp(uploadedImage.data);

  // Saco información de la imagen
  console.log("Sacando información");
  const imageInfo = await image.metadata();

  // Cambiarle el tamaño si es necesario
  if (imageInfo.width > 1000) {
    console.log("Cambiando tamaño imagen")
    image.resize(1000);
  }

  // Guardar la imagen en el directorio de subidas
  console.log("Guardando imagen")
  const imageFileName = `${uuid.v4()}.jpg`;
  await image.toFile(path.join(imageUploadPath, imageFileName));

  // Devolver el nombre con el que fue guardada
  return imageFileName;
}

async function deleteUpload(uploadedImage) {
  await fs.unlink(path.join(imageUploadPath, uploadedImage));
}

function randomString(length = 20) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}

async function sendMail({ email, title, content }) {
  // Configurar api key de sendgrid
  sendgrid.setApiKey(process.env.SENDGRID_KEY);
  console.log('Ejecutando sendMail')
  // Configurar mensaje
  const message = {
    to: email,
    from: process.env.SENDGRID_FROM,
    subject: title,
    text: content,
    html: `
      <div>
        <h1>${title}</h1>
        <p>${content}</p>
      </div>
    `,
  };

  // Enviar mensaje
  await sendgrid.send(message);
}

module.exports = {
  formatDateToDB,
  formatDateToDBDay,
  processAndSaveImage,
  deleteUpload,
  randomString,
  sendMail,
};
