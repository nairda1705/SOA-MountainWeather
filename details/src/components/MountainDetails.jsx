import React, { useState, useEffect } from 'react';

export const MountainDetails = (props) => {
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    fetch(`http://192.168.1.5:3000/temperature?id=${props.mountain.id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTemperature(data.temperature);
      });
  }, [props]);

  return (
    <div>
      <p>The temperature for the peak of {props.mountain.name} is {temperature}</p>
    </div>
  );
}

export default MountainDetails;