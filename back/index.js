import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';

import mongoose from 'mongoose';



import  {ScreenplayController}  from './controllers/index.js';

mongoose
  .connect('mongodb+srv://glsiz:magakham88@cluster0.n7nan5n.mongodb.net/scripts?retryWrites=true&w=majority')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json({limit: '50mb'}));
app.use(cors({
  origin: ['https://sweet-alpaca-6d4cd7.netlify.app',],
}));
app.use('/uploads', express.static('uploads'));


app.post('/upload',  upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});



app.get('/posts', ScreenplayController.getAll);

app.get('/posts/:id', ScreenplayController.getOne);
app.post('/posts',  ScreenplayController.create);
app.delete('/posts/:id', ScreenplayController.remove);
app.put(
  '/posts/:id',
  ScreenplayController.update,
);
app.post('/upload',  upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});