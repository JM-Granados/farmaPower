import app from './app';

app.get('/', (req, res) => res.send('Hello World with TypeScript!'));

app.listen(3000, () => {
  console.log(`Server is run at http://localhost:${3000}`);
});