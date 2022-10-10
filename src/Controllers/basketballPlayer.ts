import { NextFunction, Request, Response } from "express"
import { ConnectMYSQL, Query } from "../Config/mysql";

const getBasketballPlayersList = (req: Request, res: Response, next: NextFunction) => {

    let query = 'SELECT * from basketball_player';

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

const getBasketballPlayerByID = (req: Request, res: Response, next: NextFunction) => {

    let basketballPlayerID = req.params.basketballPlayerID;
    let query = `SELECT * from basketball_player WHERE ID = ${basketballPlayerID}`;


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

const insertNewBasketballPlayer = (req: Request, res: Response, next: NextFunction) => {

    let { basketballPlayer_name, basketballPlayer_position, basketballPlayer_price, basketballPlayer_teamName } = req.body;
    let query = `INSERT INTO basketball_player (name, position, price, team_name) VALUES ("${basketballPlayer_name}","${basketballPlayer_position}","${basketballPlayer_price}","${basketballPlayer_teamName}")`;

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

const deleteBasketballPlayer = (req: Request, res: Response, next: NextFunction) => {

    let playerID  = req.params.basketballPlayerID;
    let query = `DELETE FROM basketball_player WHERE ID = ${playerID}`;

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

export default { getBasketballPlayersList, getBasketballPlayerByID, insertNewBasketballPlayer, deleteBasketballPlayer }