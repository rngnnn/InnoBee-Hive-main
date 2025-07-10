import React from "react";
import UserCard from "./UserCard";

const Following = () => {
  const data = [1, 2, 3, 4];
  return (
    <div className="w-full flex flex-wrap">
      {data.map((profile, index) => (
        <UserCard key={index} index={index} />
      ))}
    </div>
  );
};

export default Following;
