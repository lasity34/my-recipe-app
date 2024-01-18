import express from "express"
import cors from 'cors';
import cocktailsRouter from './routes/cocktails.js'; 
import countriesRouter from './routes/countries.js';
import authRouter from './routes/authRoutes.js';
const app = express();
const PORT = 3001;

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173', 
      'http://localhost:3000', // Frontend running on port 3000
      'https://boozy-benders-frontend.onrender.com'
    ];

    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(express.json());




app.use('/api/cocktails', cocktailsRouter);
app.use('/api/countries', countriesRouter); 
app.use('/api/auth', authRouter);





app.listen(PORT, () => {
    console.log(`listening to PORT ${PORT}`)
})