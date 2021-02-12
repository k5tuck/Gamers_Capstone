import React, { useState } from "react";
import SearchForm from "./subcomponents/SearchForm";
import SearchResults from "./subcomponents/SearchResults";
import axios from "axios";

function SearchPage() {
  const [results, setResults] = useState([]);
  const [tagresults, setTagResults] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const [sessionid, setSessionId] = useState(null);

  const SearchGame = async () => {
    const resp = await axios.post("/api/searchgame", { search });
    console.log(resp.data);
    setResults(resp.data.posts);
    setSessionId(resp.data.id);
  };

  const SearchTag = async () => {
    const resp = await axios.post("/api/searchtag", { search });
    console.log(resp.data);
    const newResults = [];
    resp.data.posts
      ? resp.data.posts.map((tg) => {
          newResults.push(tg.Post);
        })
      : newResults.push("No Posts Under This Tag");
    // setTagResults(resp.data.posts);
    console.log(newResults);
    setResults(newResults);
    setSessionId(resp.data.sessionid);
  };

  console.log("====================================");
  console.log(results);
  console.log("====================================");

  const SearchPost = async () => {
    const resp = await axios.post("/api/searchpost", { search });
    console.log(resp.data);
    setResults(resp.data.posts);
    setSessionId(resp.data.id);
  };

  async function addLike(pid) {
    const resp = await axios.put(`/api/like/${pid}`, { like: true });
    console.log(resp.data);
    const newPosts = results.map((p) => {
      if (p.id === pid) {
        console.log(p.id);
        return {
          ...p,
          Likes: [...p.Likes, resp.data],
        };
      } else {
        return p;
      }
    });
    setResults(newPosts);
  }

  async function deleteLike(pid) {
    const resp = await axios.delete(`/api/like/${pid}`);
    console.log(resp.data);
    const newPosts = results.map((p) => {
      if (p.id === pid) {
        console.log(p.id);
        return {
          ...p,
          // Little Off
          // Likes: p.Likes.filter(
          //   (l) => l.userid !== sessionid && l.postid !== pid
          // ),
          Likes: p.Likes.filter((l) => {
            if (l.userid === sessionid && l.postid === pid) {
              return false;
            } else return true;
          }),
        };
      } else {
        return p;
      }
    });
    setResults(newPosts);
  }

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
      <SearchResults
        id={sessionid}
        results={results}
        addLike={addLike}
        deleteLike={deleteLike}
        setResults={setResults}
      />
    </div>
  );
}

export default SearchPage;
