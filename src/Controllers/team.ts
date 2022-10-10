import { NextFunction, Request, Response } from "express"
import { ConnectMYSQL, Query } from "../Config/mysql";

const getTeamList = (req: Request, res: Response, next: NextFunction) => {

    let query = 'SELECT * from team';

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

    let teamID = req.params.teamID;
    let query = `SELECT * from team WHERE ID = ${teamID}`;


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

    let { team_name } = req.body;
    let query = `INSERT INTO team (name) VALUES ("${team_name}")`;

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

export default { getTeamList, getTeamListByTeamID, insertNewTeam }