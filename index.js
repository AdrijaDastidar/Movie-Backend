// All imports
import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import "dotenv/config";
import userRouter from './src/routes/user.routes.js';
import adminRouter from './src/routes/admin.routes.js';
import movieRouter from './src/routes/movie.routes.js';
import showTimeRouter from './src/routes/showTime.routes.js';
import bookingRouter from './src/routes/Booking.routes.js';
import paymentsRouter from './src/routes/payment.routes.js';
import theaterRouter from './src/routes/theater.routes.js';
import getRecommendedMovies from './src/controllers/neo4j.js'

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 1000;

// Database connection
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb connected");

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });

}).catch((err) => {
  console.log({ err });
  process.exit(1);
});

// Routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/showTime", showTimeRouter);
app.use("/booking", bookingRouter);
app.use("/theater", theaterRouter);
app.use("/payment", paymentsRouter);

// Neo4j
app.post('/neo4j/query', async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({ error: 'Id is required' });
  }

  console.log("Received movie id:", id);  // Check the type and value of the id

  // Ensure the id is treated as a number
  const movieId = Number(id);
  if (isNaN(movieId)) {
    return res.status(400).send({ error: 'Invalid id format' });
  }

  try {
    const recommendedMovies = await getRecommendedMovies(movieId);
    console.log("Sending recommended movies:", recommendedMovies);  // Log before sending the response
    res.status(200).send(recommendedMovies);
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    res.status(500).send({ error: 'Internal server error' });
  }
});


app.get('/key', (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});