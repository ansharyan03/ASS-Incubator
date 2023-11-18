import React, { useState } from 'react';
import {redirect, useNavigate} from 'react-router-dom'

interface LibraryProps{
  user: string;
}

const LibraryOccupancyTracker: React.FC<LibraryProps> = ({user}) => {

  const [username, setUsername] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  let navigate = useNavigate();
  // Create an object to store the occupancy information for each floor
  const [occupancyData, setOccupancyData] = useState<{ [key: number]: number }>({
    1: 0, // Initialize occupancy for each floor to 0
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  });

  const handleFloorClick = (floor: number) => {
    if (selectedFloor === floor) {
      setSelectedFloor(null);
      setOccupancyData(prevOccupancyData => {
        const newData = [...prevOccupancyData];
        newData[floor - 1] = Math.max(newData[floor - 1] - 1, 0);
        return newData;
      });
    } else {
      setSelectedFloor(floor);
      setOccupancyData(prevOccupancyData => {
        const newData = [...prevOccupancyData];
        newData[floor - 1] += 1;
        if (selectedFloor !== null) {
          newData[selectedFloor - 1] = Math.max(newData[selectedFloor - 1] - 1, 0);
        }
        return newData;
      });
    }
  };

  const checkIn = async (user: string, floor: number, note: string) => {
    data: Object = {"user": user, "floor": floor, "note": note};
    const response = await fetch("http://localhost:8000/checkin", )
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome, Please Select What Floor of Davis You'll Be At</h1>
      <p>Selected Floor: {selectedFloor === null ? 'None' : `${selectedFloor} floor`}</p>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((floor) => (
          <div key={floor} style={{ margin: '10px' }}>
            <button
              onClick={() => handleFloorClick(floor)}
              className={`floor-button ${selectedFloor === floor ? 'selected' : ''}`}
            >
              {floor} Floor
            </button>
            <span>Occupancy: {occupancyData[floor - 1]}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>
          Note:
          <textarea value={note} onChange={(e) => setNote(e.target.value)} />
          <h1>{note}</h1>
        </label>
      </div>
    </div>
  );

};

export default LibraryOccupancyTracker;
