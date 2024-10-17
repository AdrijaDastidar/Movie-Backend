// All imports
import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import "dotenv/config";
import userRouter from './src/routes/user.routes.js';
import adminRouter from './src/routes/admin.routes.js';
import movieRouter from './src/routes/movie.routes.js';
import theaterRouter from './src/routes/theater.routes.js';


const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 1000;

// Database connection
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb connected");

  // Start the server using app.listen instead of server.listen
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
app.use("/theater", theaterRouter);
