import React, { useEffect, useState } from "react";

const ProfileClock = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const timeInterval = setInterval(() => {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      //   let seconds = date.getSeconds();
      let modulation = hours >= 12 ? "PM" : "AM";

      //   More checks
      const formattedHours = hours < 10 ? "0" + hours : hours;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

      let time = `${formattedHours}:${formattedMinutes} ${modulation}`;

      setTime(time);
    });

    return () => clearInterval(timeInterval);
  }, []);

  
  return (
    <div className="clock">
      <p>{`${time}  ${new Date().toLocaleDateString("en-US", {weekday: "short"})}`}</p>
    </div>
  );
};

export default ProfileClock;
