import React, { useEffect, useState } from 'react';

const LibraryOccupancyTracker: React.FC = () => {

  const [username, setUsername] = useState<string>('');
  const [lastUser, setLast] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  // Create an object to store the occupancy information for each floor
  const [occupancyData, setOccupancyData] = useState<Array<number>>([0, 0, 0, 0, 0, 0, 0, 0]);
  useEffect(() => {
    getData();
    const textBox = document.getElementById("note");
    const userBox = document.getElementById("user");
    textBox?.setAttribute("wrap", "off");
    userBox?.setAttribute("wrap", "off");
  });
  const handleFloorClick = async (floor: number) => {
    if (selectedFloor === floor) {
      setSelectedFloor(null);
      checkOut(lastUser);
    }
    else if (selectedFloor === null) {
      setSelectedFloor(floor);
      console.log(floor);
      let result = await checkIn(username, floor, note);
      if (!("errormsg" in result)){
        setLast(username);
      }
      else{
        setSelectedFloor(null);
        setNote("User already checked in on another machine. Try again with a different username.");
      }
    }
    else{
      setNote('Click your currently selected floor first to check out and check into a different floor.');
    }

    getData();
    console.log(occupancyData);
  };
  const changeUser = (userName: string) => {
    setUsername(userName);
  }
  const checkIn = async (userName: string, floorNumber: number | null, noteWritten: string) => {
    const checkInData = {user: userName, floor: floorNumber, note: noteWritten};
    const response = await fetch("http://localhost:8000/checkin", {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(checkInData)});
    const msg = await response.json();
    console.log("response from api: ", msg);
    return msg;
  }
  const checkOut = async (userName: string) => {
    const checkOutData = {user: userName}
    const response= await fetch("http://localhost:8000/checkout", {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(checkOutData)});
    const msg = await response.json();
    console.log("response from api: ", msg);
    };
  const getData = async () => {
    const response = await fetch("http://localhost:8000/counts", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
      }});
      const data = await response.json();
      // const occupancy = [...occupancyData];
      // for(let i = 0; i < data.length; i++){
      //   occupancy[i] = occupancy[i]+1;
      //   // Update the state with the new array
      // }
      console.log("data received: ", data);
      setOccupancyData(data["counts"]);
  };
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
          <input type="text" id="user" value={username} onChange={(e) => changeUser(e.target.value)} />
        </label>
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>
          Note: 
          <textarea value={note} id="note" onChange={(e) => setNote(e.target.value)} />
          <h1>{note}</h1>
        </label>
      </div>
    </div>
  );

};

export default LibraryOccupancyTracker;
