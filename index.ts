import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import fs from 'fs';
import axios from 'axios';
import cron from 'node-cron';
import Cronjob from './controllers/cron';
import codeController from './controllers/service/code.controller';
import auth from './middleware/auth';
import userRoute from './routes/user.routes';
import memberRoute from './routes/member.routes';
import avtarRoute from './routes/avtar.routess';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import db from './models';
import commonController from './controllers/common/common.controller';
import { body } from 'express-validator';
const app = express();
app.use(cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);
const io = new Server(server);

// Serve your static index.html file from public directory
app.get('/generate-captcha', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Captcha generation endpoint
app.post('/generate', async (req: Request, res: Response) => {

});




  

// Handle form submission // redirect file 
app.post('/contactus', (req: Request, res: Response) => {
  const { firstname, lastname, email } = req.body;
  console.log(`First Name: ${firstname}, Last Name: ${lastname}, Email: ${email}`);
  res.redirect('/');
});



// Socket.io setup for handling chat rooms
io.on('connection', (socket: Socket) => {
  socket.on('joinRoom', (roomName: string) => {
    socket.join(roomName);
    socket.to(roomName).emit('userJoined', `${socket.id} joined the room`);
  });

  socket.on('leaveRoom', (roomName: string) => {
    socket.leave(roomName);
    socket.to(roomName).emit('userLeft', `${socket.id} left the room`);
  });

  socket.on('chat message', (msg: string, roomName: string) => {
    console.log("Received message:", msg);
    io.to(roomName).emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`User with socket ID ${socket.id} disconnected.`);
  });
});

const port = process.env.PORT || 4000;

// Basic GET endpoint
app.get('/api/v1/welcome', auth, (req: Request, res: Response) => {
  res.status(200).send('Welcome to your API');
});

// Middleware for CORS headers
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({ error: { message: err.message } });
});

// Serve static resources and profile images
app.use(express.static('resources'));
app.use('/profile', express.static(__dirname + '/profile'));

// API routes
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/member', auth, memberRoute);
app.use('/api/v1/avtar', auth, avtarRoute);

// cron.schedule('*/15 * * * *', () => {
//   console.log('running a task every minute');
// });

// Schedule the cron job to run every 15 minutes
cron.schedule('*/15 * * * *', async () => {
  console.log('Running a task every 15 minutes');
  await codeController.checkServer();
});

// Sync Sequelize models with database and start server
db.sequelize.sync().then(() => {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
