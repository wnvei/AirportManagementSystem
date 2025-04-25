const express = require('express');
const mysql = require('mysql2')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'Airport_Management',
});

app.post('/login', (req, res) => {
  const { emailOrUsername, password } = req.body;

  const adminQuery = `SELECT * FROM Admin WHERE Username = ? AND Password = ?`;
  db.query(adminQuery, [emailOrUsername, password], (err, adminResults) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (adminResults.length > 0) {
      const admin = adminResults[0];
      return res.json({
        success: true,
        role: 'admin',
        user: { id: admin.Admin_ID, username: admin.Username }
      });
    }

    const crewQuery = `SELECT * FROM Crew WHERE Username = ? AND Password = ?`;
    db.query(crewQuery, [emailOrUsername, password], (err, crewResults) => {
      if (err) return res.status(500).json({ error: 'Database error' });
    if (crewResults.length > 0) {
        const crew = crewResults[0];
        const flightQuery = `SELECT Flight_id, Flight_name, Arrival, Departure, Origin, Destination, Status 
                             FROM Flights WHERE Flight_id = ?`;
        db.query(flightQuery, [crew.Flight_id], (err, flightResults) => {
          if (err) return res.status(500).json({ error: 'Database error' });

          if (flightResults.length > 0) {
            const flight = flightResults[0];
            console.log("Flight details fetched:", flight); 
            return res.json({
              success: true,
              role: 'crew',
              user: {
                id: crew.Crew_ID,
                username: crew.Username,
                name: crew.Crew_name,
                designation: crew.Role,
                flight: crew.Flight_id
              },
              flightDetails: flight
            });
          } else {
            return res.status(404).json({ success: false, message: 'Flight details not found' });
          }
        });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    });
  });
});

app.get('/flights', (req, res) => {
    const query = `
      SELECT Airlines.Airline_id, Airlines.Airline_name, Flights.Origin, Flights.Destination, Flights.Departure, Flights.Status
      FROM Airlines
      JOIN Flights ON Airlines.Flight_id = Flights.Flight_id
    `;
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      res.json(results);
    });
  });


  app.get('/admin', (req, res) => {
    const airportName = req.query.airportName || 'Mangalore International Airport';
  
    const airportQuery = `
      SELECT * 
      FROM Airport 
      WHERE Airport_name = ?`;
  
    db.query(airportQuery, [airportName], (err, airportResults) => {
      if (err) return res.status(500).json({ error: 'Database error' });
  
      if (airportResults.length > 0) {
        const airport = airportResults[0];

        const query = `
          SELECT 
            a.Airport_name,
            a.Location,
            r.Runway_id,
            r.Length AS Runway_Length,
            r.Status AS Runway_Status,
            f.Flight_id,
            f.Flight_name,
            f.Arrival,
            f.Departure,
            f.Status AS Flight_Status,
            al.Airline_name,
            al.Country AS Airline_Country,
            ac.Model AS Aircraft_Model,
            ac.Capacity AS Aircraft_Capacity,
            g.Gate_id,
            g.Terminal AS Gate_Terminal,
            g.Status AS Gate_Status
          FROM Airport a
          LEFT JOIN Runway r ON a.Airport_id = r.Airport_id
          LEFT JOIN Flights f ON f.Runway_id = r.Runway_id
          LEFT JOIN Airlines al ON f.Flight_id = al.Flight_id
          LEFT JOIN Aircraft ac ON al.Airline_id = ac.Airline_id
          LEFT JOIN Gates g ON ac.Aircraft_id = g.Aircraft_id
          WHERE a.Airport_name = ?`;
  
        db.query(query, [airportName], (err, results) => {
          if (err) return res.status(500).json({ error: 'Database error' });
  
          return res.json(results); 
        });
      } else {
        return res.status(404).json({ success: false, message: 'Airport not found' });
      }
    });
  });

  app.get('/admin/category', (req, res) => {
    const category = req.query.category;
  
    if (category === 'Passenger') {
      const query = `
        SELECT 
          p.Passport,
          p.Passenger_name,
          p.Nationality,
          p.DOB,
          p.Email,
          p.Contact,
          b.Booking_id,
          b.Seat,
          b.Date,
          b.Baggage,
          b.Boarding,
          b.Gate_id
        FROM Passengers p
        LEFT JOIN Booking b ON p.Booking_id = b.Booking_id`;
  
      db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        return res.json(results);
      });
    } else if (category === 'Crew') {
      const query = `
        SELECT 
          c.Crew_id,
          c.Crew_name,
          c.Role,
          c.Username,
          c.Flight_id
        FROM Crew c`;
  
      db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        return res.json(results);
      });
    } else {
      return res.status(400).json({ error: 'Invalid category' });
    }
  });

  app.post('/explore', async (req, res) => {
    const { name, bookingId } = req.body;
  
    if (!name || !bookingId) {
      return res.status(400).json({ success: false, message: 'Name and booking ID are required' });
    }
  
    try {
      const query = `
        SELECT 
          P.Passenger_name AS name,
          B.Booking_id AS bookingId,
          B.Seat AS seat,
          B.Boarding AS boardingTime,
          B.Date,
          B.Gate_id AS gate,
          F.Flight_name AS flight,
          F.Origin AS departure,
          F.Destination AS destination
        FROM Passengers P
        JOIN Booking B ON P.Booking_id = B.Booking_id
        JOIN Gates G ON B.Gate_id = G.Gate_id
        JOIN Aircraft A ON G.Aircraft_id = A.Aircraft_id
        JOIN Airlines L ON A.Airline_id = L.Airline_id
        JOIN Flights F ON L.Flight_id = F.Flight_id
        WHERE LOWER(P.Passenger_name) LIKE ? AND B.Booking_id = ?
      `;
  
      const rows = await new Promise((resolve, reject) => {
        db.query(query, [`%${name.toLowerCase()}%`, bookingId], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
  
      if (rows && rows.length > 0) {
        const r = rows[0];
  
        const date = new Date(r.Date);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-CA', options); 
  
        const formattedTime = r.boardingTime?.slice(0, 5) || '';
  
        const formattedDetails = {
          name: r.name,
          bookingId: r.bookingId,
          flight: r.flight,
          departure: r.departure,
          destination: r.destination,
          departureTime: `${formattedDate}, ${formattedTime}`,
          seat: r.seat,
          gate: r.gate
        };
  
        return res.json({ success: true, data: formattedDetails });
      } else {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
  
    } catch (err) {
      console.error('Error during booking lookup:', err);
      return res.status(500).json({ success: false, message: 'Server Error' });
    }
  });

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
