import React from "react";
import { useParams } from "react-router-dom";

export default function UnfollowButton({ removeFollow }) {
  const { id } = useParams();

  return (
    <div>
      <button
        onClick={(e) => {
          removeFollow(id);

          window.location.reload();
        }}
      >
        Unfollow
      </button>
    </div>
  );
}
