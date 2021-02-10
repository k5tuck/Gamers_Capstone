import React, { useState } from "react";
import SearchForm from "./subcomponents/SearchForm";
import SearchResults from "./subcomponents/SearchResults";
import axios from "axios";

function SearchPage() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const [sessionId, setSessionId] = useState(null);

  const SearchGame = async () => {
    const resp = await axios.post("/api/searchgame", { search });
    console.log(resp.data);
    setResults(resp.data.posts);
    setSessionId(resp.data.id);
  };

  const SearchTag = async () => {
    const resp = await axios.post("/api/searchtag", { search });
    console.log(resp.data);
    // setResults(resp.data.TagToPosts);
    // setSessionId(resp.data.id);
  };

  const SearchPost = async () => {
    const resp = await axios.post("/api/searchpost", { search });
    console.log(resp.data);
    setResults(resp.data.posts);
    setSessionId(resp.data.id);
  };
  return (
    <div className="searchpage">
      <SearchForm
        SearchGame={SearchGame}
        SearchTag={SearchTag}
        SearchPost={SearchPost}
        search={search}
        setSearch={setSearch}
        searchType={searchType}
        setSearchType={setSearchType}
      />
      <SearchResults id={sessionId} results={results} setResults={setResults} />
    </div>
  );
}

export default SearchPage;
