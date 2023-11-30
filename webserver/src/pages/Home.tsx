import { useNavigate } from 'react-router-dom'
import React from 'react';

const Home: React.FC = () => {

    const navigate = useNavigate();
      // State to manage the input value
  return (
    <div>
        <div>
            <h1>Welcome to Davis Library!</h1>
        </div>
        <div>
            <button onClick={() => navigate("/in")}>
                check in
            </button>
        </div>
    </div>
  );
};

export default Home;
