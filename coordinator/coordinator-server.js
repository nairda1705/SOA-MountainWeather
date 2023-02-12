const http = require('http');
const url = require('url');
const https = require('https');
 
const port = 3000;

const peaksUrl = 'http://192.168.1.5:3100/peaks'
function peakUrl(id) {
  return `http://192.168.1.5:3100/peak?id=${id}`;
}
function temperatureUrl(lat, long) {
  return `http://192.168.1.5:3200/temperature?latitude=${lat}&longitude=${long}`;
}
 
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/temperature')) {
    const id = url.parse(req.url, true).query.id;
    http.get(peakUrl(id), apiRes => {
      let data = '';
      apiRes.on('data', chunk => {
        data += chunk;
      });
      apiRes.on('end', () => {
        const peak = JSON.parse(data);
        console.log(peak);
        console.log(temperatureUrl(peak.latitude, peak.longitude));
        http.get(temperatureUrl(peak.latitude, peak.longitude), tempApi => {
          let tempData = '';
          tempApi.on('data', chunk => {
            tempData += chunk;
          });
          tempApi.on('end', () => {
            console.log(tempData);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(tempData);
          });
        });
      });
    })
  } else if (req.method === 'GET' && req.url === '/peaks') {
    http.get(peaksUrl, apiRes => {
      let data = '';
      
      apiRes.on('data', chunk => {
        data += chunk;
      })

      apiRes.on('end', () => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
      });
    })
  } else {
    res.writeHead(404);
    res.end();
  }
});
 
server.listen(port, () => {
  console.log(`Coordinator server listening on port ${port}`);
});