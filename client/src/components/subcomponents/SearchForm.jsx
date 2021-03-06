import React from "react";

function SearchForm({
  SearchGame,
  SearchTag,
  SearchPost,
  setSearch,
  search,
  searchType,
  setSearchType,
}) {
  return (
    <div className="searchform">
      <h1>Search for a Post or Search for a Game</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchType === "Tag"
            ? SearchTag()
            : searchType === "Post"
            ? SearchPost()
            : SearchGame();
        }}
      >
        <label>
          Search by Title:
          <input
            type="text"
            value={search}
            name="searchContent"
            placeholder="Enter Post/Game Title"
            autofocus
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </label>
        <br />
        <br />
        <div className="tagssearch">
          <label>
            Post
            <input
              type="radio"
              value="Post"
              name="typeofsearch"
              onChange={(e) => {
                setSearchType(e.target.value);
              }}
            />
          </label>

          <label>
            Game
            <input
              type="radio"
              value="Game"
              name="typeofsearch"
              onChange={(e) => {
                setSearchType(e.target.value);
              }}
            />
          </label>

          <label>
            Tags
            <input
              type="radio"
              value="Tag"
              name="typeofsearch"
              onChange={(e) => {
                setSearchType(e.target.value);
              }}
            />
          </label>
        </div>
        <br />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default SearchForm;
