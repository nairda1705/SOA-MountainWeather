const http = require("http");
const url = require('url');

const mountainPeaks = [
  { id: 1, name: "Mount Everest", height: 8848, latitude: 27.988056, longitude: 86.925278 },
  { id: 2, name: "K2", height: 8611, latitude: 35.8825, longitude: 76.513333 },
  { id: 3, name: "Kangchenjunga", height: 8586, latitude: 27.703333, longitude: 88.145833 },
  { id: 4, name: "Lhotse", height: 8516, latitude: 27.961667, longitude: 86.93 },
  { id: 5, name: "Makalu", height: 8485, latitude: 27.888333, longitude: 87.0875 },
  { id: 6, name: "Cho Oyu", height: 8188, latitude: 28.086389, longitude: 86.660833 },
  { id: 7, name: "Dhaulagiri", height: 8167, latitude: 28.693333, longitude: 83.493 },
  { id: 8, name: "Manaslu", height: 8163, latitude: 28.5275, longitude: 84.563333 },
  { id: 9, name: "Nanga Parbat", height: 8126, latitude: 35.2375, longitude: 74.589167 },
  { id: 10, name: "Annapurna I", height: 8091, latitude: 28.595, longitude: 83.820278 },
  { id: 11, name: "Gasherbrum I", height: 8080, latitude: 35.724167, longitude: 76.691667 },
  { id: 12, name: "Broad Peak", height: 8051, latitude: 35.824167, longitude: 76.509722 },
  { id: 13, name: "Shishapangma", height: 8032, latitude: 28.568889, longitude: 85.875278 },
  { id: 14, name: "Gasherbrum II", height: 8035, latitude: 35.73, longitude: 76.615833 }
];

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/peaks') {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(mountainPeaks));
  } else if (req.method === 'GET' && req.url.startsWith('/peak')) {
    const id = url.parse(req.url, true).query.id;
    const peak = mountainPeaks.find(peak => peak.id == id);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(peak));
  }
});

const port = 3100;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});