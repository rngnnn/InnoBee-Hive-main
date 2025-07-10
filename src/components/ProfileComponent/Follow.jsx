import React from "react";
import UserCard from "./UserCard";

const Follow = () => {
  const data = [1, 2, 3, 4];
  return (
    <div className="w-full flex flex-wrap">
      {data.map((profile, index) => (
        <UserCard index={index} />
      ))}
    </div>
  );
};

export default Follow;
