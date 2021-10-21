const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const userDB = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "PrivateKey"; //Secret key
const expiresIn = "1h"; //Expire time

//create token
const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

//check user is exist or not in database
const isLoginAuthenticated = ({ email, password }) => {
  return (
    userDB.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
};
const isRegisterAuthenticated = ({ email }) => {
  return userDB.users.findIndex((user) => user.email === email) !== -1;
};

//create a route to register a new user
server.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;
  //
  if (isRegisterAuthenticated({ email })) {
    const status = 401;
    const message = "Email already exist";
    res.status(status).json({ status, message });
    return;
  }
  //read database file
  fs.readFile("./users.json", (error, data) => {
    //If error occured
    if (error) {
      const status = 401;
      const message = error;
      res.status(status).json({ status, message });
      return;
    }
    //if data found
    data = JSON.parse(data.toString());
    let last_item_id = data.users[data.users.length - 1].id;

    //push data into database file
    data.users.push({ id: last_item_id + 1, email: email, password: password });
    let writeData = fs.writeFile(
      "./users.json",
      JSON.stringify(data),
      (error, result) => {
        if (error) {
          const status = 401;
          const message = error;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });
  //create a token and pass with 200 status code
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});

// create a route for login
server.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!isLoginAuthenticated({ email, password })) {
    const status = 401;
    const message = "Invalid credentials";
    res.status(status).json({ status, message });
    return;
  }
  //create a token and pass with 200 status code
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});

server.listen(5000, () => {
  console.log("Our JSON server is running...");
});
