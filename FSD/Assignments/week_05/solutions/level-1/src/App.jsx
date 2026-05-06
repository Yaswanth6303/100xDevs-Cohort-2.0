import React from "react";
import BusinessCard from "./components/BusinessCard";

const App = () => {
  return (
    <div>
      <BusinessCard
        name="Lokeshwar"
        description="A TA in 100x Cohort 2.0"
        interests={["Iconic", "Open Source", "Developer"]}
        linkedin="https://www.linkedin.com/in/lokeshwar-kumar-b77b8b200/"
        twitter="https://twitter.com/lokeshwar_kumar"
      />
      <BusinessCard
        name="Harkirat Singh"
        description="Founder of 100xDevs"
        interests={["React", "Node.js", "Express", "MongoDB"]}
        linkedin="https://www.linkedin.com/in/harkirat-singh-100xdevs/"
        twitter="https://twitter.com/harkirat_singh"
      />
    </div>
  );
};

export default App;
