import express from "express"
import router from "./routes/routes.js"
import { formatDate, formatWeekday, formatMoney } from "./utils/utils.js"
import session from "express-session";
import dotenv from 'dotenv';
import MongoStore from "connect-mongo";

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(session({
    secret: 'troque-por-uma-senha-muito-secreta',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.locals.formatDate = (date, format = "BR") => formatDate(date, format);
app.locals.formatWeekday = (date) => formatWeekday(date);
app.locals.formatMoney = (value) => formatMoney(value);

export default app;