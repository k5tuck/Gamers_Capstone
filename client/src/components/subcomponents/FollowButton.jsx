import React from "react";
import {useParams} from "react-router-dom";

export default function FollowButton({ createFollow }) {
  const { id } = useParams();

  return (
    <div>
      <button onClick={createFollow(id)}>Follow</button>
    </div>
  );
}
