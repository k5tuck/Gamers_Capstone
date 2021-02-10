import React from 'react'
import PostContainer from './PostContainer';

function SearchResults({results, setResults, id}) {
    return (
        <div className="searchresults">
            <PostContainer posts={results} sessionid={id}/>
        </div>
    )
}

export default SearchResults;