import { NextFunction, Request, Response } from "express"
import { ConnectMYSQL, Query } from "../Config/mysql";

const getTeamList = (req: Request, res: Response, next: NextFunction) => {

    let userHash = req.body;
    let query = `SELECT * from team WHERE user_identifier = ${userHash} `;

    ConnectMYSQL()
        .then(connection => {
            Query(connection, query)
                .then(results => {
                    return res.status(200).json({
                        results
                    })
                })
                .catch(error => {
                    return res.status(500).json({
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

const getTeamListByTeamID = (req: Request, res: Response, next: NextFunction) => {

    let { teamID, userHash } = req.body;
    let query = `SELECT * from team WHERE user_identifier = ${userHash} AND ID = ${teamID}`;


    ConnectMYSQL()
        .then(connection => {
            Query(connection, query)
                .then(results => {
                    return res.status(200).json({
                        results
                    })
                })
                .catch(error => {
                    return res.status(500).json({
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

const insertNewTeam = (req: Request, res: Response, next: NextFunction) => {

    let { team_name, userHash } = req.body;
    let query = `INSERT INTO team (name, user_identifier) VALUES ("${team_name}", "${userHash}")`;

    ConnectMYSQL()
        .then(connection => {
            Query(connection, query)
                .then(result => {
                    return res.status(200).json({
                        result
                    })
                })
                .catch(error => {
                    return res.status(500).json({
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

const deleteTeam = (req: Request, res: Response, next: NextFunction) => {

    let { teamID, userHash } = req.body;
    let query = `DELETE FROM team WHERE user_identifier = ${userHash} AND ID = ${teamID}`;

    ConnectMYSQL()
        .then(connection => {
            Query(connection, query)
                .then(result => {
                    return res.status(200).json({
                        result
                    })
                })
                .catch(error => {
                    return res.status(500).json({
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

export default { getTeamList, getTeamListByTeamID, insertNewTeam, deleteTeam }