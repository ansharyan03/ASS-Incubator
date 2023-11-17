import React, { useState } from 'react';

const LibraryOccupancyTracker: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

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
      // If the same floor is clicked again, unselect it and decrease its occupancy
      setSelectedFloor(null);
      setOccupancyData({
        ...occupancyData,
        [floor]: occupancyData[floor] - 1,
      });
    } else {
      // Otherwise, update the occupancy for the previously selected floor and set the new floor
      setSelectedFloor(floor);
      setOccupancyData({
        ...occupancyData,
        [selectedFloor!]: occupancyData[selectedFloor!] - 1, // Decrease occupancy for the previously selected floor
        [floor]: occupancyData[floor] + 1, // Increase occupancy for the new floor
      });
    }
  };

  return (
    <div>
      <h1>Welcome, Please Select What Floor of Davis You'll Be At</h1>
      <p>Selected Floor: {selectedFloor === null ? 'None' : `${selectedFloor} floor`}</p>

      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((floor) => (
          <div key={floor}>
            <button onClick={() => handleFloorClick(floor)} className={selectedFloor === floor ? 'selected' : ''}>
              {floor} Floor
            </button>
            <span>Occupancy Percentage: {(occupancyData[floor] / 50 * 100).toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryOccupancyTracker;
