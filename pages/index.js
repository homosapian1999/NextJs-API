import { useRef, useState } from "react";

function HomePage() {
  const emailRef = useRef();
  const feedbackRef = useRef();
  const [feedbackItems, setFeedbackItems] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const feedback = feedbackRef.current.value;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ email: email, feedback: feedback }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data)); // {email:"", feeback:""}
  };

  const getFeedback = () => {
    fetch("/api/feedback", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback));
  };
  return (
    <div>
      <h1>Welcome to the API Route</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackRef}></textarea>
        </div>
        <button>Submit Feedback</button>
      </form>
      <hr />
      <button onClick={getFeedback}>Load Feedback</button>
      <ul>
        {feedbackItems?.map((data) => (
          <li key={data.id}>{data.feedback}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
