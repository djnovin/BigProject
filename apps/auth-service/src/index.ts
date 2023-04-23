import express, { Request, Response } from 'express';
import passport from 'passport';
import session from "express-session";
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
const PORT = process.env.PORT || 8001;
const HOST = process.env.HOST || "localhost";
import Redis from 'ioredis';
import RedisStore from 'connect-redis';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
  password: 'password',
});

app.use(session({
  store: redisStore,
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.authenticate('session'));

const Users = [
  {
    id: 1,
    username: "admin",
    password: "admin",
    email: ""
  }
];

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
  issuer: "auth-service",
  audience: "client",
};

type Payload = {
  id: number;
  user: string;
  email: string;
};

const verify = (payload: Payload, done: any) => {
  const user = Users.find((user) => user.id === payload.id);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
};

passport.use(new JwtStrategy(opts, verify));

const localopts = {
  usernameField: "username",
  passwordField: "password",
  session: false,
};
 
const localverify = (username: string, password:string, done: any) => {
  const user = Users.find((user) => user.username === username);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
};

passport.use(new LocalStrategy(localopts, localverify));

app.get("/api/v1/auth/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
}));

app.get("/api/v1/auth/logout", (req, res) => {

});

app.listen(PORT, () => {
  console.log(`auth-service listening at http://${HOST}:${PORT}`);
});
