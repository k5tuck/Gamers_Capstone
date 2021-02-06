import React from "react";
import axios from "axios";
import Footer from "./subcomponents/Footer";
import Header from "./subcomponents/Header";

async function createFollow(id) {
  const resp = await axios.post(`/api/follower/${id}`);
  console.log(resp);
}
export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export { createFollow };
