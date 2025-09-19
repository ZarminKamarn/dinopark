import Express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import router from "./routes/index";
import session from "express-session";

const app = Express();
const PORT: number = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(Express.static(path.join(__dirname, "public")));

app.use(Express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Le serveur a démarré sur le port ${PORT}`);
});
