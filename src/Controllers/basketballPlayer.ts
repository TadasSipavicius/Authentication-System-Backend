import { NextFunction, Request, Response } from "express"
import { ConnectMYSQL, Query } from "../Config/mysql";

const getBasketballPlayersList = (req: Request, res: Response, next: NextFunction) => {

    let query = 'SELECT * from basketball_player';

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

const getBasketballPlayerByID = (req: Request, res: Response, next: NextFunction) => {

    let basketballPlayerID = req.params.basketballPlayerID;
    let ratingID = req.params.ratingID;
    let teamID = req.params.teamID;
    let query = `SELECT * from basketball_player WHERE ID = ${basketballPlayerID}`;
    let kazkas = `SELECT * FROM basketball_player 
    RIGHT JOIN team ON team.ID = ${teamID}
    RIGHT JOIN rating ON rating.ID = ${ratingID}
    WHERE basketball_player.ID = ${basketballPlayerID}`

    ConnectMYSQL()
        .then(connection => {
            Query(connection, kazkas)
                .then((results: any) => {

                    if (!Object.keys(results).length) return res.status(204).json(null);

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

const insertNewBasketballPlayer = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    let { basketballPlayer_name, basketballPlayer_position, basketballPlayer_price, basketballPlayer_teamName } = req.body;

    if(user && user?.roles !== "Admin") return res.status(403).send("No Access");

    let query = `INSERT INTO basketball_player (name, position, price, team_name) VALUES ("${basketballPlayer_name}","${basketballPlayer_position}","${basketballPlayer_price}","${basketballPlayer_teamName}")`;
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

const deleteBasketballPlayer = (req: Request, res: Response, next: NextFunction) => {
    
    const user = req.user;
    let playerID = req.params.basketballPlayerID;

    if(user && user?.roles !== "Admin") return res.status(403).send("No Access");

    let query = `DELETE FROM basketball_player WHERE ID = ${playerID}`;
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

const updateBasketballPlayer = (req: Request, res: Response, next: NextFunction) => {
    
    const user = req.user;
    let playerID = req.params.basketballPlayerID;
    let { basketballPlayer_name, basketballPlayer_position, basketballPlayer_price, basketballPlayer_teamName } = req.body;
    
    if(user && user?.roles !== "Admin") return res.status(403).send("No Access");
    
    let query = `UPDATE basketball_player  SET name = "${basketballPlayer_name}", position = "${basketballPlayer_position}", price = "${basketballPlayer_price}", team_name = "${basketballPlayer_teamName}" WHERE ID = ${playerID} `;
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

export default { getBasketballPlayersList, getBasketballPlayerByID, insertNewBasketballPlayer, deleteBasketballPlayer, updateBasketballPlayer }