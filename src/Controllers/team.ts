import { NextFunction, Request, Response } from "express"
import { type } from "os";
import { ConnectMYSQL, Query } from "../Config/mysql";

const getTeamList = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    let query = `SELECT * from team WHERE user_identifier = "${user.userID}" `;

    ConnectMYSQL()
        .then(connection => {
            Query(connection, query)
                .then((results: any) => {

                    if (!Object.keys(results).length) return res.status(400).json(null);

                    return res.status(200).json({
                        results
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

const getTeamListByTeamID = (req: Request, res: Response, next: NextFunction) => {

    let teamID = req.params.teamID;
    const user = req.user;
    let query = `SELECT * from team WHERE user_identifier = "${user.userID}" AND ID = "${teamID}"`;


    ConnectMYSQL()
        .then(connection => {
            Query(connection, query)
                .then((results: any) => {

                    if (!Object.keys(results).length) return res.status(204).json(null);

                    return res.status(200).json({
                        results
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

const insertNewTeam = (req: Request, res: Response, next: NextFunction) => {

    let { team_name } = req.body;
    const user = req.user;
    let query = `INSERT INTO team (name, user_identifier) VALUES ("${team_name}", "${user.userID}")`;

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

const deleteTeam = (req: Request, res: Response, next: NextFunction) => {

    let teamID = req.params.teamID;
    let { userHash } = req.body;
    let query = `DELETE FROM team WHERE user_identifier = "${userHash}" AND ID = "${teamID}"`;

    ConnectMYSQL()
        .then(connection => {
            Query(connection, query)
                .then(result => {
                    return res.status(204).json({
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

const updateTeam = (req: Request, res: Response, next: NextFunction) => {

    let teamID = req.params.teamID;
    let { team_name, guard_players, foward_players, center_players } = req.body;

    let query = `UPDATE team SET name = "${team_name}", guard_players = "${JSON.stringify(guard_players)}", foward_players = "${JSON.stringify(foward_players)}", center_players = "${JSON.stringify(center_players)}" WHERE ID = ${teamID} `;

    ConnectMYSQL()
        .then(connection => {
            Query(connection, query)
                .then(result => {
                    return res.status(200).json({
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

export default { getTeamList, getTeamListByTeamID, insertNewTeam, deleteTeam, updateTeam }