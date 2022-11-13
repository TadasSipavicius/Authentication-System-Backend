import { NextFunction, Request, Response } from "express"
import { ConnectMYSQL, Query } from "../Config/mysql";
import { v4 as uuidv4 } from 'uuid';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { IGetUserAuthInfoRequest } from "./basketballPlayer";

let refreshTokens: any[] = [];

const GenerateAccessToken = (userID: string, roles: string) => {
    return jwt.sign({ userID: userID, roles: roles }, process.env.TOKEN_SECRET as Secret, { expiresIn: '5m' })
}

const authVerify = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const accessToken = req.header('auth-access-token');
    console.log(accessToken);
    if (!accessToken) return res.status(401).send("Access Denied");

    try {
        jwt.verify(accessToken, process.env.TOKEN_SECRET as Secret, (err, user) => {
            if (err) return res.status(403).send("Bad token");
            req.user = user;
            next();
        });
    } catch (err) {
        res.status(403).send(err);
    }
}

const UserRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { userName, email, password } = req.body;

    const validationSchema = Joi.object({
        userName: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .email(),
        password: Joi.string()
            .min(6)
    });

    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error?.details[0].message);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let query = `INSERT INTO user (iduser, userName, email, password, roles) VALUES ("${uuidv4()}", "${userName}","${email}","${hashPassword}","User")`;
    ConnectMYSQL()
        .then(connection => {
            Query(connection, query)
                .then(result => {
                    return res.status(201).json({
                        result
                    })
                })
                .catch(error => {
                    return res.status(400).json({
                        message: error.message,
                        error
                    })
                })
                .finally(() => {
                    connection.end();
                })
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
}

const UserLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    console.log("AAA")
    const validationSchema = Joi.object({
        email: Joi.string()
            .email(),
        password: Joi.string()
            .min(6)
    });

    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error?.details[0].message);


    let query = `SELECT * from user WHERE email = "${email}"`;
    let user: any[] = [];
    await ConnectMYSQL()
        .then(async connection => {
            await Query(connection, query)
                .then((result: any) => {

                    if (!Object.keys(result).length) return res.status(400)
                        .json("User was not found with given email");
                    else {
                        user = Object.values(JSON.parse(JSON.stringify(result)));
                    }


                })
                .catch(error => {
                    return res.status(400).json({
                        message: error.message,
                        error
                    })
                })
                .finally(() => {
                    connection.end();
                })
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })

    if (user.length === 0) return;

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) return res.status(400).send("Invalid password")
    console.log(user)
    const accessToken = GenerateAccessToken(user[0].iduser, user[0].roles);
    const refreshToken = jwt.sign({ userID: user[0].iduser, roles: user[0].roles }, process.env.REFRESH_TOKEN_SECRET as Secret)
    refreshTokens.push(refreshToken);
    res.header('auth-access-token', accessToken).status(200).send({ accessToken: accessToken, refreshToken: refreshToken })
}

const RefreshToken = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.body.token;

    if (!refreshToken) return res.status(401).send("Refresh Token is null")

    if (!refreshTokens.includes(refreshToken)) return res.status(403).send("Refresh Token was not found")

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret, (err: any, user: any) => {

        if (err) return res.status(403).send("Forbidden")

        const accessToken = GenerateAccessToken(user.userID, user.roles);
        res.status(200).send({ accessToken: accessToken })
    })
}

const LogoutUser = (req: Request, res: Response, next: NextFunction) => {
    refreshTokens = refreshTokens.filter(token => token != req.body.token);
    res.status(204).json("Logout successfully");
}

export default { UserRegister, UserLogin, authVerify, RefreshToken, LogoutUser }