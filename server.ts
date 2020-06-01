import { listenAndServe } from "https://deno.land/std/http/server.ts";
import { acceptWebSocket, acceptable } from "https://deno.land/std/ws/mod.ts";
import { chat } from "./chat.ts";

listenAndServe({ port: 8000 }, async (req) => {
  if (req.method === "GET" && req.url === "/") {
    req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/html",
      }),
      body: await Deno.open("./index.html"),
    });
  }

  // if(req.method === "POST" && req.url === '/reg'){
  //   console.log('REQ ===>', req)
  //   req.respond({
  //     status: 200,
  //     headers: new Headers({
  //       "content-type": "text/html",
  //     }),
  //     body: `200 OK`
  //   });
    
  // }

  if (req.method === "GET" && req.url === "/ws") {
    // console.log('request', req);
    if (acceptable(req)) {
      acceptWebSocket({
        conn: req.conn,
        bufReader: req.r,
        bufWriter: req.w,
        headers: req.headers,
      }).then(chat);
    }
  }
});

console.log("Server running on localhost:8000");
