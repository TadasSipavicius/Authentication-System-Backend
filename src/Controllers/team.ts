import { NextFunction, Request, Response } from "express"
import { type } from "os";
import { ConnectMYSQL, Query } from "../Config/mysql";
import { IGetUserAuthInfoRequest } from "./basketballPlayer";

const getTeamList = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    let query = `SELECT * from team WHERE user_identifier = "${user.userID}" `;

    ConnectMYSQL()
        .then(connection => {
            Query(connection, query)
                .then((results: any) => {

                    if (!Object.keys(results).length) return res.status(400).send({
                        message: "No data was found",
                        data: results
                    });

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

const getTeamListByTeamID = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {

    let teamID = req.params.teamID;
    const user = req.user;
    console.log("user", user)
    let query = `SELECT * from team WHERE user_identifier = "${user.userID}" AND ID = "${teamID}"`;

    ConnectMYSQL()
        .then(connection => {
            Query(connection, query)
                .then((results: any) => {

                    if (!Object.keys(results).length) return res.status(400).send({
                        message: "No data was found",
                        data: results
                    });

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

const insertNewTeam = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {

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

const deleteTeam = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {

    let teamID = req.params.teamID;
    const user = req.user;
    let query = `DELETE FROM team WHERE user_identifier = "${user.userID}" AND ID = "${teamID}"`;

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

const ValidateGuardPlayers = (guardPlayers: number[]): string => {
    if (guardPlayers.length < 3) {
        return "You have to select at least 3 guard players";
    };
    if (guardPlayers.length > 5) {
        return "You have to select fewer guard players. You can't have more than 5 guard players in your team";
    };

    return "Valid";
}

const ValidateFowardPlayers = (fowardPlayers: number[]): string => {
    if (fowardPlayers.length < 3) {
        return "You have to select at least 3 foward players";
    };
    if (fowardPlayers.length > 5) {
        return "You have to select fewer foward players. You can't have more than 5 foward players in your team";
    };

    return "Valid";
}

const ValidateCenterPlayers = (fowardPlayers: number[]): string => {
    if (fowardPlayers.length < 0) {
        return "You have to select at least 1 center player";
    };
    if (fowardPlayers.length > 2) {
        return "You have to select fewer center players. You can't have more than 2 center players in your team";
    };

    return "Valid";
}

const updateTeam = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    let teamID = req.params.teamID;
    let { team_name, guard_players, foward_players, center_players } = req.body;

    const validateGuards = ValidateGuardPlayers(guard_players);

    if (validateGuards !== "Valid") res.status(400).json({ message: validateGuards })

    const validateFowards = ValidateFowardPlayers(foward_players);

    if (validateFowards !== "Valid") res.status(400).json({ message: validateFowards })

    const validateCenters = ValidateCenterPlayers(center_players);

    if (validateCenters !== "Valid") res.status(400).json({ message: validateCenters })

    
    let query = `UPDATE team SET name = "${team_name}", guard_players = "${JSON.stringify(guard_players)}", foward_players = "${JSON.stringify(foward_players)}", center_players = "${JSON.stringify(center_players)}" WHERE ID = ${teamID} AND user_identifier = "${user.userID}"`;

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