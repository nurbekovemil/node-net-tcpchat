const net = require("net");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const username = new Promise((resolve) => {
  readline.question("Enter your username: ", (name) => {
    resolve(name);
  });
});

username.then((name) => {
  const socket = net.connect({
    port: 1234,
  });
  socket.on("connect", () => {
    socket.write(`${name} has joined the chat!`);
  });

  readline.on("line", (data) => {
    if (data === "leave") {
      socket.write(`${name} has left the chat!`);
      socket.setTimeout(1000);
    } else {
      socket.write(`_${name}: ${data}`);
    }
  });

  socket.on("data", (data) => {
    const obj = data.toString();
    console.log(obj);
  });

  socket.on("timeout", () => {
    socket.write("leave");
    socket.end();
  });
  socket.on("end", () => {
    process.exit();
  });
});
