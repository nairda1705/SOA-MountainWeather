import React, { useState, useEffect } from 'react';
import MountainDetails from "details/Details"

export const Peaks = () => {
  const [mountains, setMountains] = useState([]);
  const [selectedMountain, setSelectedMountain] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://192.168.1.5:3000/peaks');
      console.log(response);
      const result = await response.json();
      console.log(response);
      setMountains(result);
    };

    fetchData();
  }, []);

  const handleClick = mountain => {
    setSelectedMountain(mountain);
  };

  return (
    <div>
      <h1>List of Mountain Peaks</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Height (m)</th>
          </tr>
        </thead>
        <tbody>
          {mountains.sort((a, b) => b.height - a.height).map(mountain => (
            <tr key={mountain.id}>
              <td>{mountain.id}</td>
              <td>
                {mountain.name}
                <button onClick={() => handleClick(mountain)}>Details</button>
              </td>
              <td>{mountain.height}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedMountain && (
        <div>
          <h2>Details of {selectedMountain.name}</h2>
          <MountainDetails mountain = {selectedMountain}/>
        </div>
      )}
    </div>
  );
};

export default Peaks;