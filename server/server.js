const sqlite3 = require("sqlite3").verbose();
const express = require('express'); // importerar express-ramverket och tilldelar variabeln express
const server = express(); //express-app skapas med anrop av express() och tilldelar den variabeln 'server'

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');

    next();
});

//skapar koppling till SQLite-databas
  const db = new sqlite3.Database('./database.db', (err)=> {
    if (err) {
      console.error('Error connecting to database', err.message);
    } else {
      console.log('conected to database');
      db.run(`
      CREATE TABLE IF NOT EXISTS events(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titel TEXT,
        datum TEXT,
        plats TEXT,
        tid   TEXT
      )
      `, (createErr) => {
        if (createErr) {
          console.error('Error creating table', createErr.message);
        } else {
          console.log('Table created successfully');
        }
      });
    }
  });

// Hämta alla (get)
server.get('/', (req, res) => { //: Vi sätter upp en route för HTTP GET-förfrågningar till rotvägen ("/"). När någon gör en förfrågan till den vägen, körs den angivna funktionen med två parametrar req (för begäran) och res (för svar). I funktionen extraheras HTTP-metoden och URL-en från begäran (req) och sedan skickas ett svar (res.send()) tillbaka till klienten med information om den mottagna förfrågan
  const method = req.method;
  const url = req.url;
  res.send(`du gjorde en ${method}-förfrågan till url:en ${url}`);
});

server.get('/events', (req, res) => {
  const sql = 'SELECT * FROM events';
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(rows);
    }
  });
});

//Uppdatera (put)
server.put('/events/:id', (req, res) => {
  const eventId = req.params.id;
  const { titel, datum, plats, tid } = req.body;

  const sql = 'UPDATE events SET titel=?, datum=?, plats=?, tid=? WHERE id=?';
  const params = [titel, datum, plats, tid, eventId];

  db.run(sql, params, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send('Event updated successfully');
    }
  });
});

//Ta bort (delete)
server.delete('/events/:id', (req, res) => {
  const eventId = req.params.id;

  const sql = 'DELETE FROM events WHERE id=?';
  const params = [eventId];

  db.run(sql, params, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send('Event deleted successfully');
    }
  });
});

//skapa (post)
server.post('/events', (req, res) => {
  const { titel, datum, plats, tid } = req.body;
  const sql = 'INSERT INTO events (titel, datum, plats, tid) VALUES (?, ?, ?, ?)';
  const params = [titel, datum, plats, tid];
  db.run(sql, params, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send('Post added successfully');
    }
  });
});


//starta servern
server.listen(3000, () => { // Vi lyssnar på port 3000 och när servern startar, skrivs meddelandet "server running on http://localhost:3000." till konsolen.
  console.log('server running on http://localhost:3000.');
});