import React, { useEffect, useState } from "react";
import { dashboard } from "../store/actions";

const Dashboard = () => {
  const [dash, setDash] = useState("");

  console.log(dash);

  useEffect(() => {
    setDash(dashboard());
    console.log("Dasboard");
  }, []);

  return (
    <div>
      <div>
        {<p>Paragraph</p>}
        <div>No dashboard</div>
      </div>
    </div>
  );
};

export default Dashboard;
