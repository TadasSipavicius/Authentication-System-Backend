import { NextFunction, Request, Response } from "express"
import { ConnectMYSQL, Query } from "../Config/mysql";

const getTeamsRatingList = (req: Request, res: Response, next: NextFunction) => {

    let query = 'SELECT * from rating';

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

const getTeamRatingByTeamID = (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;
    let teamID = req.params.teamID;
    let query = `SELECT * from rating WHERE ID = ${teamID} AND user_identifier = "${user.userID}"`;


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

const insertNewTeamToRating = async (req: Request, res: Response, next: NextFunction) => {
    
    const user = req.user;
    let { teamID, teamName, ratingPlace } = req.body;
    let query = `INSERT INTO rating (ID, team_name, current_placement, user_identifier) VALUES ("${teamID}","${teamName}","${ratingPlace}","${user.userID}")`;

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

const deleteTeamFromRating = (req: Request, res: Response, next: NextFunction) => {
    
    const user = req.user;
    let teamID = req.params.teamID;
    let query = `DELETE FROM rating WHERE ID = ${teamID} AND user_identifier = "${user.userID}"`;

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

const resetRating = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    let query = `DELETE FROM rating`;

    if(user && user?.roles !== "Admin") return res.status(403).send("No Access");

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
export default { getTeamsRatingList, getTeamRatingByTeamID, insertNewTeamToRating, deleteTeamFromRating, resetRating }