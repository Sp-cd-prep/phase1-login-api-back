const bcrypt = require("bcrypt");
const saltRound = 10;
const secretKey = "acharya";
// console.log(secretKey)
const jwt = require("jsonwebtoken");
// const auth = require('../Middleware/auth')

let arr = []; //database

// const register = (req, res) => {
//   const data = req.body; //body parsing
//   // console.log(data) //{ email: 'abc@gmail.com', password: '123456789' }

//   const account = arr.find((item) => item.email === data.email);
//   if (account) {
//     return res.send({ msg: "This email is already exist" });
//   }

//   //encrypt the password by hashing the password
//   data.password = bcrypt.hashSync(data.password, saltRound);
//   // console.log(data); //{email: 'abc@gmail.com',password: '$2b$10$gJLAsucy2yviXqnEYrxXrORXfCTORQRd4yt9ED7P/OKciQfa6luLS' }

//   arr.push(data);
// //   console.log(arr);

//   const token = jwt.sign({ user: data.email }, secretKey); //jwt token generation

//   res.send({ msg: "user Registered successfully", token: token });
// };

const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = arr.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).send({ msg: "This email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRound);
  const newUser = { email, password: hashedPassword };

  arr.push(newUser);

  const token = jwt.sign({ email }, secretKey, { expiresIn: "365d" });

  res.status(201).send({ msg: "User registered successfully", token });
};

// const login = async (req, res) => {
//   const data = req.body; //user input data for login
// //   console.log(data);

//   const account = arr.find((item) => item.email === data.email);
// //   console.log(account, "account");

//   if (account) {
//     const login = await bcrypt.compare(data.password, account.password);
//     // console.log(login, "login");
//     if (login) {
//       const token = jwt.sign({ user: data.email }, secretKey, {
//         expiresIn: "365d",
//       });
//       return res.send({ msg: "User Logged in successfully", token: token });
//     } else {
//       return res.send("Password is incorrect");
//     }
//   } else {
//     return res.send("user is not registered");
//   }
// };
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = arr.find((user) => user.email === email);
  if (!user) {
    return res.status(404).send({ msg: "User is not registered" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).send({ msg: "Incorrect password" });
  }

  const token = jwt.sign({ email }, secretKey, { expiresIn: "365d" });

  res.send({ msg: "User logged in successfully", token });
};

const home = (req, res) => {
  res.send({
    message: "This is Home page",
  });
};

const dashboard = (req, res) => {
  res.send({ msg: "Welcome to Dashboard" });
};

module.exports = { login, register, home, dashboard };
