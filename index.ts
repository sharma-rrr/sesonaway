import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cron from 'node-cron';
import db from './models';
import auth from './middleware/auth';
import userRoute from './routes/user.routes';
import memberRoute from './routes/member.routes';
import avtarRoute from './routes/avtar.routess'; 
import codeController from './controllers/service/code.controller';
import commonController from './controllers/common/common.controller';
import fs from 'fs';
import path from 'path'; // Import path module
import { json } from 'body-parser';
let ffmpegStatic = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');


const app = express();
app.use(cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);
const io = new Server(server);


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, this is your response!'});
});




// 
// Store connected users
const users = {}; // Format: { socketId: userId }

// Handle user addition
app.post('/useradd', (req, res) => {
    const { user_id, name } = req.body;
    // Add logic to save user to database
    res.json({ success: true, user_id, name });
});

// Handle adding users to groups and sending group messages
app.post('/groupchat', async (req, res) => { 
  const { user_id, sender_id, message } = req.body;
  console.log( req.body,"sddddddd");
  try {
      // Check if the user exists
      const user = await db. newUsers.findOne({ where: { 
        user_id
       } });

      if (!user) {
          return commonController.errorMessage("User not found", res);
      }

      // Add the message to the group chat
      const groupMessage = await db.groupChats.create({
          sender_id,
          message
      });

      return commonController.successMessage(groupMessage, "Message sent successfully", res);
  } catch (err) {
      console.error('Error adding message to group:', err);
      return commonController.errorMessage("An error occurred", res);
  }
});



io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Register a user
    socket.on('register', (userId) => {
        users[socket.id] = userId;
    });

    // Handle sending and receiving private messages
    socket.on('sendMessage', ({ sender_id, message, recipient_id }) => {
        const recipientSocketId = Object.keys(users).find(
            (key) => users[key] === recipient_id
        );
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('chatMessage', { sender_id, message });
        }
    });

    // Handle sending and receiving group messages
    socket.on('sendGroupMessage', ({ sender_id, message }) => {
        io.emit('groupMessage', { sender_id, message }); // Broadcast to all clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        delete users[socket.id];
    });
});



// Serve your static index.html file from public directory
app.get('/socket', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle form submission
app.post('/contactus', (req: Request, res: Response) => {
  const { firstname, lastname, email } = req.body;
  console.log(`First Name: ${firstname}, Last Name: ${lastname}, Email: ${email}`);
  res.redirect('/');
});


// Socket.io setup
// Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  // Join a room
  socket.on('joinRoom', ({ room, user_id }) => {
      socket.join(room);
      console.log(`User ${user_id} joined room ${room}`);
  });

  // Handle group chat messages
  socket.on('sendMessage', ({ room, sender_id, message }) => {
      console.log(`Message from ${sender_id} to room ${room}: ${message}`);
      io.to(room).emit('chatMessage', { sender_id, message });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
  });
});




// Socket.io setup for emitting numbers from 1 to 10 only once
io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);
  let count = 1;
  const interval = setInterval(() => {
    if (count <= 10) {
      socket.emit('number', count);
      count++;
    } else {
      clearInterval(interval); // Stop after sending numbers from 1 to 10
    }
  }, 1000);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});



// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});

// Route for adding a user
app.post('/useradd', async (req: Request, res: Response) => {
  const { user_id, name } = req.body;
  console.log('Request Body:', req.body);

  try {
      // Check if user already exists
      const user = await db. newUsers.findOne({ where: { user_id } });

      if (user) {
          console.log('User already exists:', user);
          return commonController.errorMessage('User already exists', res);
      }

      // Create a new user if not exists
      const newUser = await db. newUsers.create({ user_id, name });

      console.log('New user created:', newUser);

      // Emit the new user event to all connected clients
      io.emit('userAdded', { user_id, name });

      // Send success response
      return commonController.successMessage(newUser, 'User added successfully', res);

  } catch (err) {
      console.error('An error occurred:', err);
      // Send error response
      return commonController.errorMessage('An error occurred while adding the user.', res);
  }
});




async function sendmessage(req: Request, res: Response) {
  const { sender_id, message, reciver_id } = req.body;

  try {
      // Check if the receiver exists
      const receiver = await db.newUsers.findOne({
          where: { user_id: reciver_id }
      });

      if (!receiver) {
          return commonController.errorMessage("Receiver not found", res);
      }

      // Check if the sender exists
      const sender = await db.newUsers.findOne({
          where: { user_id: sender_id }
      });

      if (!sender) {
          return commonController.errorMessage("Sender not found", res);
      }

      // Save the message to the database
      const newMessage = await db.chatboxs.create({
          data: {
              sender_id,
              message,
              reciver_id
          }
      });

      // Emit the message to all connected clients
      io.emit('chatMessage', { sender_id, message });

      // Respond with success
      return commonController.successMessage(newMessage, "Message sent successfully", res);
  } catch (error) {
      console.error('Error sending message:', error);
      return commonController.errorMessage("An error occurred while sending the message", res);
  }

}
export{io}

// Middleware for CORS headers
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});




//
app.post('/abc', (req: Request, res: Response) => {
  ffmpeg.setFfmpegPath(ffmpegStatic);
  const inputpath = "SampleVideo_360x240_5mb.mp4"; // Ensure this path is correct
  const outputpath = "output_dash/output.mpd"; // Ensure this path is correct and directory exists

  const scaleoption = [
    "scale=1280:720",
    "scale=640:320",
    "scale=1920:1080",
    "scale=854:480", 
  ];
  
  const videocodec = "libx264";
  const x64options = "keyint=2.4:min-keyint=24:no-scenecut";
  const videobitrates = ['500k', '1000k', '2000k', '4000k'];

  ffmpeg(inputpath)
    .videoFilters(scaleoption)
    .videoCodec(videocodec)
    .addOptions(["-x264opts", x64options])
    .outputOptions(["-b:v", videobitrates[0]])
    .format('dash')
    .output(outputpath)
    .on('start', (cmd) => {
      console.log('FFMPEG command:', cmd);
    })
    .on('end', () => {
      console.log('Dash encoding complete');
      res.status(200).send('Encoding complete');
    })
    .on('error', (err) => {
      console.error('Error during encoding:', err);
      res.status(500).send(`Encoding failed: ${err.message}`);
    })
    .run();
});




//

app.post('/ww', (req: Request, res: Response) => {
  const ffmpegStatic = require('ffmpeg-static');
  const ffmpeg = require('fluent-ffmpeg');

  ffmpeg.setFfmpegPath(ffmpegStatic);
  const inputpath = "SampleVideo_360x240_5mb.mp4";
  const outputpath = "output_dash/output.mp4"; // Use a simpler format for testing

  ffmpeg(inputpath)
    .videoFilter("scale=1280:720") // Test with a single scale
    .videoCodec("libx264")
    .output(outputpath)
    .on('start', (cmd) => {
      console.log('FFMPEG command:', cmd);
    })
    .on('end', () => {
      console.log('Encoding complete');
      res.status(200).send('Encoding complete');
    })
    .on('error', (err) => {
      console.error('Error during encoding:', err);
      res.status(500).send(`Encoding failed: ${err.message}`);
    })
    .run();
});


ffmpeg.setFfmpegPath(ffmpegStatic);

app.post('/convert-images', (req: Request, res: Response) => {
  const imagesDir = path.resolve('images'); // Absolute path to the images directory
  const outputpath = 'output_dash/output.mp4'; // Output video file path
  // Check if the directory exists
  if (!fs.existsSync(imagesDir)) {
    return res.status(400).send('Image directory does not exist');
  }
  // Collect all image files from the directory
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error('Error reading input directory:', err);
      return res.status(500).send(`Error reading input directory: ${err.message}`);
    }

    console.log('Files found:', files); // Log found files
    // Filter out non-image files (optional)
    const imageFiles = files.filter(file => /\.(png|jpg|jpeg)$/i.test(file));
    
    if (imageFiles.length === 0) {
      return res.status(400).send('No images found in the directory');
    }

    // Create a video from images
    const inputs = imageFiles.map(file => path.join(imagesDir, file));
    const inputString = inputs.join('|');

    ffmpeg()
      .input(`concat:${inputString}`)
      .inputOptions('-framerate 1') // Frame rate (1 frame per second)
      .videoCodec('libx264')
      .output(outputpath)
      .on('start', (cmd) => {
        console.log('FFMPEG command:', cmd);
      })
      .on('end', () => {
        console.log('Encoding complete');
        res.status(200).send('Encoding complete');
      })
      .on('error', (err) => {
        console.error('Error during encoding:', err);
        res.status(500).send(`Encoding failed: ${err.message}`);
      })
      .run();
  });
});









ffmpeg.setFfmpegPath(ffmpegStatic);

app.post('/images', (req: Request, res: Response) => {
  const imagesDir = path.resolve('images'); // Absolute path to the images directory
  const outputpath = 'output_dash/output.mp4'; // Output video file path
  const listFilePath = 'output_dash/images.txt'; // Path to the text file listing images

  // Check if the directory exists
  if (!fs.existsSync(imagesDir)) {
    return res.status(400).send('Image directory does not exist');
  }

  // Collect all image files from the directory
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error('Error reading input directory:', err);
      return res.status(500).send(`Error reading input directory: ${err.message}`);
    }

    console.log('Files found:', files); // Log found files

    // Filter out non-image files
    const imageFiles = files.filter(file => /\.(png|jpg|jpeg)$/i.test(file));
    
    if (imageFiles.length === 0) {
      return res.status(400).send('No images found in the directory');
    }

    // Create a text file with the list of images
    const listFileContent = imageFiles.map(file => `file '${path.join(imagesDir, file).replace(/'/g, "\\'")}'`).join('\n');
    fs.writeFile(listFilePath, listFileContent, (err) => {
      if (err) {
        console.error('Error writing list file:', err);
        return res.status(500).send(`Error writing list file: ${err.message}`);
      }

      // Create a video from images using the list file
      ffmpeg()
        .input(listFilePath)
        .inputOptions('-f concat', '-safe 0') // Use the concat protocol with the list file
        .videoCodec('libx264')
        .output(outputpath)
        .on('start', (cmd) => {
          console.log('FFMPEG command:', cmd);
        })
        .on('end', () => {
          console.log('Encoding complete');
          res.status(200).send('Encoding complete');
        })
        .on('error', (err) => {
          console.error('Error during encoding:', err);
          res.status(500).send(`Encoding failed: ${err.message}`);
        })
        .run();
    });
  });
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

// Schedule the cron job to run every 15 minutes
cron.schedule('*/15 * * * *', async () => {
  console.log('Running a task every 15 minutes');
  await codeController.checkServer();
});

// Sync Sequelize models with database and start server
db.sequelize.sync().then(() => {
  const port = process.env.PORT || 4000;
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
