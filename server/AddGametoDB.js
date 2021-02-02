const { Game } = require("./models");
// const express = require("express");
// const app = express();

//API
//"https://api.rawg.io/api/games?=name%2Cbackground_image%2Crating"

const axios = require("axios");

let url = "https://api.rawg.io/api/games?=name%2Cbackground_image%2Crating";

async function GetFirstPage() {
  let data = [];
  let obj = {};

  let res = await axios.get(url);
  //   console.log(res);
  for (i = 0; i < 20; i++) {
    obj = {};
    let title = res.data.results[i].name;
    let image = res.data.results[i].background_image;
    //   let title = gameResults;
    let jsontitle = JSON.stringify(title);
    let jsonimage = JSON.stringify(image);
    // console.log(`Game Title: ${jsontitle}`);
    // console.log(`Game Image: ${jsonimage}`);
    let genres = res.data.results[i].genres;
    let genrelist = [];
    for (let g of genres) {
      let genre = g.name;
      genrelist.push(genre);
      // console.log(genre);
    }

    let plist = [];
    let platforms = res.data.results[i].platforms;
    for (let plat of platforms) {
      let system = plat.platform.name;
      plist.push(system);
      // console.log(system);
    }
    console.log(jsontitle);
    console.log(jsonimage);

    obj["title"] = title;
    obj["image"] = image;
    obj["genre"] = genrelist;
    obj["desc"] = "";
    obj["rating"] = null;
    obj["review"] = "";
    obj["platform"] = plist;
    obj["createdAt"] = new Date();
    obj["updatedAt"] = new Date();

    data.push(obj);
  }
  // console.log(data);
  return data;
}

// GetFirstPage();

// let titles = [];
// let images = [];
// let platforms = [];
// let genres = [];

async function GetPages() {
  // 10 Pages at a Time as of Right Now
  // 24,568 Pages in Total
  let data = [];
  let obj = {};

  for (p = 2; p < 50; p++) {
    let url2 = `https://api.rawg.io/api/games?=name%2Cbackground_image%2Crating&page=${p}`;
    let res = await axios.get(url2);
    //   console.log(res);
    for (i = 0; i < 20; i++) {
      obj = {};
      // Game Title
      let title = res.data.results[i].name;
      title ? title : "";
      // titles.push(name);
      // console.log(`Game Title: ${name}`);
      // Game Image
      let image = res.data.results[i].background_image;
      image ? image : "";
      // images.push(image);
      // console.log(image);
      // Game Platforms
      let plist = [""];
      let platforms = res.data.results[i].platforms;
      for (let plat of platforms) {
        let system = plat.platform.name;
        plist.push(system);
        // console.log(system);
      }
      plist == [] ? null : plist;

      // Game Genres
      let genres = res.data.results[i].genres;
      let genrelist = [""];
      for (let g of genres) {
        let genre = g.name;
        genrelist.push(genre);
        // console.log(genre);
      }
      // console.log(genrelist);
      // genrelist = genrelist == [] ? genrelist : ;

      obj["title"] = title;
      obj["image"] = image;
      obj["genre"] = genrelist;
      obj["desc"] = "";
      obj["rating"] = null;
      obj["review"] = "";
      obj["platform"] = plist;
      obj["createdAt"] = new Date();
      obj["updatedAt"] = new Date();

      data.push(obj);
    }
  }
  return data;
  // console.table(data);
}
// GetPages();
//   // const titleObj = Object.assign({}, titles);

//   console.log(titleObj);
//   // console.log(images);
// }

//

module.exports = { GetFirstPage, GetPages };
