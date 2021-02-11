import React from "react";
import { useParams } from "react-router-dom";

export default function FollowButton({ createFollow }) {
  const { id } = useParams();

  return (
    <div>
      <button
        onClick={(e) => {
          createFollow(id);
          window.location.reload();
        }}
      >
        <i class="fas fa-user-plus"></i>
      </button>
    </div>
  );
}
