import 'dotenv/config';
import nodeMailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
const { SMTP_USER, SMTP_PASSWORD, SMTP_HOST, SMTP_PORT } = process.env;

const transporter = nodeMailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  //   secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

export const handlebarOptions = {
  viewEngine: {
    extName: '.handlebars',
    partialsDir: path.resolve('./Email Html'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./Email Html'),
  extName: '.handlebars',
};

// transporter.use('compile', hbs(handlebarOptions));
export default transporter;
