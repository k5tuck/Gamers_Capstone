import React from "react";
import axios from "axios";
import Footer from "./subcomponents/Footer";
import Header from "./subcomponents/Header";

async function createFollow(id) {
  await axios.post(`/api/follower/${id}`);
  // console.log(resp);
}
async function removeFollow(id) {
  await axios.post(`/api/removefollower/${id}`);
  // console.log(resp.data);
}

export default function Layout({ children, isLoggedIn, setIsLoggedIn }) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div>
      <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      {children}
      <Footer />
    </div>
  );
}

export { createFollow, removeFollow };
