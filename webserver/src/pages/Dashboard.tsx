import React, { useState } from 'react';

const Dashboard: React.FC = () => {
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

  return (
    <div>
        <div>
            <h1>Welcome to Davis Library!</h1>
        </div>
        <div>
            
        </div>
    </div>
  );
};

export default Dashboard;
