import { useState } from "react";

// A button component makes sense here of course.
const Button = ({ type, val, update }) => {
  // I can simply handle the functionality here simply...
  function handleClick() {
    update(val + 1); // nice and easy
  }
  return (
    <button type="button" onClick={handleClick}>
      {type}
    </button>
  );
};

const StatisticLine = ({text, value}) => {
  return <p>{text} {value}{text == "Positive" && "%"}</p>
}

// turn it into tables later on jare...
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good / (good + neutral + bad)) * 100;
  return (
    <div>
      <StatisticLine text={"Good"} value={good}/>
      <StatisticLine text={"Neutral"} value={neutral}/>
      <StatisticLine text={"Bad"} value={bad}/>
      <StatisticLine text={"Average"} value={(good - bad) / total}/>
      <StatisticLine text={"All"} value={total}/>
      <StatisticLine text={"Positive"} value={average || 0}/>
    </div>
  );
};

const App = () => {
  // nice and easy. Take it slow.
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // nice states
  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button type={"good"} val={good} update={setGood} />
        <Button type={"neutral"} val={neutral} update={setNeutral} />
        <Button type={"bad"} val={bad} update={setBad} />
      </div>
      <h2>Statistics</h2>
      {good + bad + neutral != 0 ? (
        <Statistics good={good} bad={bad} neutral={neutral} />
      ) : <p><strong>No feedback given</strong></p>}
    </div>
  );
};

export default App;
