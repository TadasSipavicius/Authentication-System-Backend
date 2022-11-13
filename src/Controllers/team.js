"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../Config/mysql");
const getTeamList = (req, res, next) => {
    const user = req.user;
    let query = `SELECT * from team WHERE user_identifier = "${user.userID}" `;
    (0, mysql_1.ConnectMYSQL)()
        .then(connection => {
        (0, mysql_1.Query)(connection, query)
            .then((results) => {
            if (!Object.keys(results).length)
                return res.status(400).send({
                    message: "No data was found",
                    data: results
                });
            return res.status(200).json({
                results
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
};
const getTeamListByTeamID = (req, res, next) => {
    let teamID = req.params.teamID;
    const user = req.user;
    console.log("user", user);
    let query = `SELECT * from team WHERE user_identifier = "${user.userID}" AND ID = "${teamID}"`;
    (0, mysql_1.ConnectMYSQL)()
        .then(connection => {
        (0, mysql_1.Query)(connection, query)
            .then((results) => {
            if (!Object.keys(results).length)
                return res.status(400).send({
                    message: "No data was found",
                    data: results
                });
            return res.status(200).json({
                results
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
};
const insertNewTeam = (req, res, next) => {
    let { team_name } = req.body;
    const user = req.user;
    let query = `INSERT INTO team (name, user_identifier) VALUES ("${team_name}", "${user.userID}")`;
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
};
const deleteTeam = (req, res, next) => {
    let teamID = req.params.teamID;
    const user = req.user;
    let query = `DELETE FROM team WHERE user_identifier = "${user.userID}" AND ID = "${teamID}"`;
    (0, mysql_1.ConnectMYSQL)()
        .then(connection => {
        (0, mysql_1.Query)(connection, query)
            .then(result => {
            return res.status(204).json({
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
};
const updateTeam = (req, res, next) => {
    const user = req.user;
    let teamID = req.params.teamID;
    let { team_name, guard_players, foward_players, center_players } = req.body;
    let query = `UPDATE team SET name = "${team_name}", guard_players = "${JSON.stringify(guard_players)}", foward_players = "${JSON.stringify(foward_players)}", center_players = "${JSON.stringify(center_players)}" WHERE ID = ${teamID} AND user_identifier = "${user.userID}"`;
    (0, mysql_1.ConnectMYSQL)()
        .then(connection => {
        (0, mysql_1.Query)(connection, query)
            .then(result => {
            return res.status(200).json({
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
};
exports.default = { getTeamList, getTeamListByTeamID, insertNewTeam, deleteTeam, updateTeam };
