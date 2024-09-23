import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import './database'

app.get('/', (req, res) => res.send('Hello World with TypeScript!'));

app.listen(app.get('port'), () => {
  console.log(`Server is run at`, app.get('port'));
});