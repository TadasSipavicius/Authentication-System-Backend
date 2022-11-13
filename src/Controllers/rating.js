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
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../Config/mysql");
const getTeamsRatingList = (req, res, next) => {
    let query = 'SELECT * from rating';
    (0, mysql_1.ConnectMYSQL)()
        .then(connection => {
        (0, mysql_1.Query)(connection, query)
            .then((results) => {
            if (!Object.keys(results).length)
                return res.status(400).send({
                    message: "Team rating was not found",
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
const getTeamRatingByTeamID = (req, res, next) => {
    const user = req.user;
    let teamID = req.params.teamID;
    let query = `SELECT * from rating WHERE ID = ${teamID} AND user_identifier = "${user.userID}"`;
    console.log("user.userID", user.userID);
    (0, mysql_1.ConnectMYSQL)()
        .then(connection => {
        (0, mysql_1.Query)(connection, query)
            .then((results) => {
            console.log("results", results);
            if (!Object.keys(results).length)
                return res.status(400).send({
                    message: "Team rating was not found",
                    data: results
                });
            return res.status(200).send({
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
const insertNewTeamToRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    let { teamID, teamName, ratingPlace } = req.body;
    let query = `INSERT INTO rating (ID, team_name, current_placement, user_identifier) VALUES ("${teamID}","${teamName}","${ratingPlace}","${user.userID}")`;
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
const deleteTeamFromRating = (req, res, next) => {
    const user = req.user;
    let teamID = req.params.teamID;
    let query = `DELETE FROM rating WHERE ID = ${teamID} AND user_identifier = "${user.userID}"`;
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
const resetRating = (req, res, next) => {
    const user = req.user;
    let query = `DELETE FROM rating`;
    if (user && (user === null || user === void 0 ? void 0 : user.roles) !== "Admin")
        return res.status(403).send("No Access");
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
exports.default = { getTeamsRatingList, getTeamRatingByTeamID, insertNewTeamToRating, deleteTeamFromRating, resetRating };
