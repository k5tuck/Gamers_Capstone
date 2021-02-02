fetch("/signup", {
  method: "POST",
})
  .then((r) => r.json())
  .then((data) => console.log(data))
  .catch((err) => {
    console.log("You have an error");
    console.log(err);
  });


  