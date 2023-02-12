const http = require('http');
const url = require('url');
const https = require('https');
 
const port = 3200;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/temperature')) {
    const query = url.parse(req.url, true).query;
    const latitude = query.latitude;
    const longitude = query.longitude;
    const currentDateTimeNoTimezone = new Date();
    const currentDateTimeIso = new Date(currentDateTimeNoTimezone.getTime() - (currentDateTimeNoTimezone.getTimezoneOffset() * 60000)).toISOString();
    const currentDate = currentDateTimeIso.split('T')[0];
    const currentHour = currentDateTimeIso.split('T')[1].split(':')[0];
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&start_date=${currentDate}&end_date=${currentDate}`;
 
    https.get(apiUrl, apiRes => {
      let data = '';
 
      apiRes.on('data', chunk => {
        data += chunk;
      });
 
      apiRes.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          const index = parsedData.hourly.time.findIndex(s => s.split('T')[1].split(':')[0] === currentHour);
          const currentTemperature = parsedData.hourly.temperature_2m[index];
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({temperature: currentTemperature}));
        } catch (error) {
          console.error(error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to retrieve temperature data' }));
        }
      });
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});
 
server.listen(port, () => {
  console.log(`Temperature server listening on port ${port}`);
});