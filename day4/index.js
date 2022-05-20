import http from "http";

const server = http.createServer((req, res) => {

  // Using if else condition

  // if(req.url === "/books"){
  //   res.writeHead(200);
  //   res.end("Book route is working.");
  // }else if(req.url === "/others"){
  //   res.writeHead(200);
  //   res.end("Others route is working.");
  // }else{
  //   res.writeHead(200);
  //   res.end("Backend route is working.");
  // }

  // Using switch case

  switch(req.url){
    case "/books":
      if(req.method == "GET"){
        console.log("Im get request");
      }
      if(req.method == "POST"){
        console.log("Im post request");
      }
      res.writeHead(200);
      res.end("Book route is working.");
      console.log(req.method);
      break;

    case "/others":
      res.writeHead(200);
      res.end("Others route is working.");
      break;
      
    default:
      res.writeHead(200);
      res.end("Backend route is working.");
  }
});

server.listen(8000, () => {
  console.log("Server has started !!");
});
