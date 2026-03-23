import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const triggerStepFunction = async () => {
    try {
      await axios.post("http://localhost:5000/start-stepfn", {
        phoneNumber,
        message,
      });
      setStatus("SMS workflow started successfully");
    } catch (error) {
      setStatus("Error triggering SMS workflow");
    }
  };

  return (
    <div className="app">
      <div className="overlay"></div>

      <div className="card">
        <p className="tag">AWS Intern Task 4</p>
        <h2>Step Function + SNS SMS</h2>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            placeholder="+91xxxxxxxxxx"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            rows="4"
            placeholder="Enter SMS message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button onClick={triggerStepFunction}>Send SMS</button>
        <p className="status">{status}</p>
      </div>
    </div>
  );
}

export default App;
