import React, {useState, useEffect} from "react";
import ProfilePic from "./subcomponents/ProfilePic";
import MemberActionContainer from "./subcomponents/MemberActionContainer";
import PostContainer from "./subcomponents/PostContainer";
import axios from "axios"

function MemberHome() {
const [posts, setPosts] = useState([]);

  async function grabPosts() {
    const respPosts = await axios.get("/api/posts");
    console.log(respPosts);
      setPosts(...posts, respPosts.data.posts);}

  useEffect( () => {
    grabPosts()
  }, []) 

    return (
        <div className="gridContainer">
            {/* <div className=""> */}

            <ProfilePic/>
            <MemberActionContainer />
            <PostContainer posts={posts}/>

                {/* <h1>Welcome ${'{'}displayname{'}'}</h1>
                <a href="/members/create"><button>ADD POST</button></a>
                <a href="/members/profile/${id}"><button>VIEW PROFILE</button></a>
                <a href="/members/search"><button>SEARCH</button></a>
            </div>
            /*  delete this
            <br />
            <br />
            <ul className="grid-container">
                ${'{'}posts.map(p =&gt; {'{'} return `
    <li className="grid-item-3 content">
                    <div>
                        <div className="postDiv">
                            <h2 className="post-title">${'{'}p.title{'}'}</h2>
                            <br />
                            <a href="/members/profile/${p.userid}">
                                <h3 className="post-user">${'{'}p.User.displayname{'}'}</h3>
                            </a>
                            <br />
                            <a href="/members/game/${p.Game == null ? '' : p.Game.id}">
                                <h3 className="game-title">${'{'}p.Game == null ? "" : p.Game.title{'}'}</h3>
                            </a>
                        </div>
                        <br />
        ${'{'}p.media.includes("/uploads/media/") ? `<div className="img-holder"><img src="${p.media}" className="image fit" alt="${p.User.displayname}'s image" />`:'' {'}'}
                        </div>
                        <p>${'{'}p.content{'}'}</p>
                        <a href="/members/post/${p.id}/comment"><button>ADD COMMENT</button></a>
        ${'{'}p.User.id == id? `
        <a href="/members/post/${p.id}/edit"><button>EDIT POST</button></a>
                        <a href="/members/post/${p.id}/delete"><button>DELETE POST</button></a>
        ` : ''{'}'}
                        <ul>
                            ${'{'}p.Comments ? p.Comments.map(c =&gt; `
          <li data-comment-id="${c.id}">
                                ${'{'}c.User ? `<a href="/members/profile/${c.User.id}">${'{'}c.User.displayname{'}'}</a>` : ''{'}'}: ${'{'}c.content{'}'}
            ${'{'}c.User.id == id? `
            <a href="/members/comment/${c.id}/edit"><button>EDIT COMMENT</button></a>
                                <a href="/members/comment/${c.id}/delete"><button>DELETE COMMENT</button></a>
            ` : ''{'}'}
                            </li>
          `).join('') : '' {'}'}
                        </ul>
                    </div>
                </li>
    ` {'}'}).join(''){'}'}
            </ul> */}
        </div> 
    )
};

export default MemberHome;
