import React from "react";
import PostContainer from "./PostContainer";

function SearchResults({ addLike, deleteLike, results, setResults, id }) {
  console.log(results);
  return (
    <div>
      <PostContainer
        addLike={addLike}
        deleteLike={deleteLike}
        posts={results}
        sessionid={id}
      />
    </div>
  );
}

export default SearchResults;
