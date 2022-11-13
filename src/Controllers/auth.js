"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../Config/mysql");
const uuid_1 = require("uuid");
const joi_1 = __importDefault(require("@hapi/joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let refreshTokens = [];
const GenerateAccessToken = (userID, roles) => {
    return jsonwebtoken_1.default.sign({ userID: userID, roles: roles }, process.env.TOKEN_SECRET, { expiresIn: '5m' });
};
const authVerify = (req, res, next) => {
    const accessToken = req.header('auth-access-token');
    console.log(accessToken);
    if (!accessToken)
        return res.status(401).send("Access Denied");
    try {
        jsonwebtoken_1.default.verify(accessToken, process.env.TOKEN_SECRET, (err, user) => {
            if (err)
                return res.status(403).send("Bad token");
            req.user = user;
            next();
        });
    }
    catch (err) {
        res.status(403).send(err);
    }
};
const UserRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    const validationSchema = joi_1.default.object({
        userName: joi_1.default.string()
            .min(6)
            .required(),
        email: joi_1.default.string()
            .email(),
        password: joi_1.default.string()
            .min(6)
    });
    const { error } = validationSchema.validate(req.body);
    if (error)
        return res.status(400).send(error === null || error === void 0 ? void 0 : error.details[0].message);
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashPassword = yield bcrypt_1.default.hash(password, salt);
    let query = `INSERT INTO user (iduser, userName, email, password, roles) VALUES ("${(0, uuid_1.v4)()}", "${userName}","${email}","${hashPassword}","User")`;
    (0, mysql_1.ConnectMYSQL)()
        .then(connection => {
        (0, mysql_1.Query)(connection, query)
            .then(result => {
            return res.status(201).json({
                result
            });
        })
            .catch(error => {
            return res.status(400).json({
                message: error.message,
                error
            });
        })
            .finally(() => {
            connection.end();
        });
    })
        .catch(error => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
});
const UserLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("AAA");
    const validationSchema = joi_1.default.object({
        email: joi_1.default.string()
            .email(),
        password: joi_1.default.string()
            .min(6)
    });
    const { error } = validationSchema.validate(req.body);
    if (error)
        return res.status(400).send(error === null || error === void 0 ? void 0 : error.details[0].message);
    let query = `SELECT * from user WHERE email = "${email}"`;
    let user = [];
    yield (0, mysql_1.ConnectMYSQL)()
        .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mysql_1.Query)(connection, query)
            .then((result) => {
            if (!Object.keys(result).length)
                return res.status(400)
                    .json("User was not found with given email");
            else {
                user = Object.values(JSON.parse(JSON.stringify(result)));
            }
        })
            .catch(error => {
            return res.status(400).json({
                message: error.message,
                error
            });
        })
            .finally(() => {
            connection.end();
        });
    }))
        .catch(error => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
    if (user.length === 0)
        return;
    const validPassword = yield bcrypt_1.default.compare(password, user[0].password);
    if (!validPassword)
        return res.status(400).send("Invalid password");
    console.log(user);
    const accessToken = GenerateAccessToken(user[0].iduser, user[0].roles);
    const refreshToken = jsonwebtoken_1.default.sign({ userID: user[0].iduser, roles: user[0].roles }, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.header('auth-access-token', accessToken).status(200).send({ accessToken: accessToken, refreshToken: refreshToken });
});
const RefreshToken = (req, res, next) => {
    const refreshToken = req.body.token;
    if (!refreshToken)
        return res.status(401).send("Refresh Token is null");
    if (!refreshTokens.includes(refreshToken))
        return res.status(403).send("Refresh Token was not found");
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).send("Forbidden");
        const accessToken = GenerateAccessToken(user.userID, user.roles);
        res.status(200).send({ accessToken: accessToken });
    });
};
const LogoutUser = (req, res, next) => {
    refreshTokens = refreshTokens.filter(token => token != req.body.token);
    res.status(204).json("Logout successfully");
};
exports.default = { UserRegister, UserLogin, authVerify, RefreshToken, LogoutUser };
