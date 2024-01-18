import express from "express";
import { query } from "./db.mjs";
import cors from "cors";
import cocktailsRouter from "./routes/cocktails.js";
import countriesRouter from "./routes/countries.js";
import authRouter from "./routes/authRoutes.js";
const app = express();
const PORT = 3001;

// function logResponseTime(req, res, next) {
//   const start = process.hrtime();

//   res.on("finish", () => {
//     const durationInMilliseconds = getDurationInMilliseconds(start);
//     console.log(
//       `${req.method} ${req.originalUrl} [${durationInMilliseconds}ms]`
//     );
//   });

//   next();
// }

// function getDurationInMilliseconds(start) {
//   const NS_PER_SEC = 1e9;
//   const NS_TO_MS = 1e-6;
//   const diff = process.hrtime(start);

//   return (diff[0] * NS_PER_SEC + diff[1]) * NS_TO_MS;
// }

const corsOptions = {
  origin: (origin, callback) => {
    // List of allowed origins (both local and production)
    const allowedOrigins = [
      "http://localhost:5173",
      "https://boozy-benders-frontend.onrender.com",
    ];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      var msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(logResponseTime);

app.use('/api/cocktails', logResponseTime, cocktailsRouter);
app.use("/api/countries", countriesRouter);
app.use("/api/auth", authRouter);



app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`);
});
