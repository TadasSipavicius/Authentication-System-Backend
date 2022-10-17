# Eurofantasy-System-Backend

## API requests wiki

### Basketball Player
#### Description: 
Create Basketball Player (CREATE method)

#### Url: 
localhost:1337/api/basketballPlayer
POST
#### Params: 
```json
        {
            "basketballPlayer_name": "Marius Grigonis",
            "basketballPlayer_position": "Guard",
            "basketballPlayer_price": 850000,
            "basketballPlayer_teamName": "Panathinaikos"
        }
```

----------------------------------------------------------------------------
#### Description: 
Edit Basketball Player (EDIT method)

#### Url: 
localhost:1337/api/basketballPlayer/:basketballPlayerID
PUT
#### Params: 
```json
        {
            "basketballPlayer_name": "Marius Grigonis",
            "basketballPlayer_position": "Guard",
            "basketballPlayer_price": 850000,
            "basketballPlayer_teamName": "Panathinaikos"
        }
```
----------------------------------------------------------------------------

#### Description: 
Get all Basketball Players (GET method)

#### Url: 
localhost:1337/api/basketballPlayer
GET
#### Params: 
```json
None
```
----------------------------------------------------------------------------

#### Description: 
Get a selected Basketball Player (GET method by ID)
#### Url: 
localhost:1337/api/rating/:ratingID/team/:teamID/basketballPlayer/:basketballPlayerID
e.g.
localhost:1337/api/rating/12/team/12/basketballPlayer/1
GET
#### Params: 
```json
None
```
----------------------------------------------------------------------------

#### Description: 
Delete a selected Basketball Player (DELETE method)

#### Url: 
localhost:1337/api/basketballPlayer/:basketballPlayerID
DELETE
#### Params: 
```json
None
```
----------------------------------------------------------------------------


### Team
#### Description: 
Create new Team (CREATE method)

#### Url: 
localhost:1337/api/team
POST
#### Params: 
```json
       {
               "team_name": "Zalgirio dubleriai",
               "userHash": "TSI"
       }
```

----------------------------------------------------------------------------
#### Description: 
Edit selected Team (EDIT method)

#### Url: 
localhost:1337/api/team/:teamID
PUT
#### Params: 
```json
       {
               "team_name": "Zalgirio dubleriai",
               "guard_players": [4,8,9],
               "foward_players": [1,2,5],
               "center_players" : [3]
       }
```
----------------------------------------------------------------------------

#### Description: 
Get all Teams (GET method)

#### Url: 
localhost:1337/api/team
GET
#### Params: 
```json
{
    "userHash": "TSI"
}
```
----------------------------------------------------------------------------

#### Description: 
Get a selected Basketball Team (GET method by ID)

#### Url: 
localhost:1337/api/team/:teamID
GET
#### Params: 
```json
{
    "userHash": "TSI"
}
```
----------------------------------------------------------------------------

#### Description: 
Delete a selected Basketball Team (DELETE method)

#### Url: 
localhost:1337/api/team/:teamID
DELETE
#### Params: 
```json
{
    "userHash": "TSI"
}
```
----------------------------------------------------------------------------



### Rating
#### Description: 
Create new Team into Rating (CREATE method)

#### Url: 
localhost:1337/api/rating
POST
#### Params: 
```json
       {
               "teamID": 11,
               "teamName": "Testuotojai",
               "ratingPlace": 2
       }
```

----------------------------------------------------------------------------

#### Description: 
Get rating list (GET method)

#### Url: 
localhost:1337/api/rating
GET
#### Params: 
```json
none
```
----------------------------------------------------------------------------

#### Description: 
Get team rating (GET method by ID)

#### Url: 
localhost:1337/api/rating/team/:teamID
GET
#### Params: 
```json
none
```
----------------------------------------------------------------------------

#### Description: 
Delete a selected Team from Rating (DELETE method)

#### Url: 
localhost:1337/api/rating/:teamID
DELETE
#### Params: 
```json
none
```
----------------------------------------------------------------------------
#### Description: 
Reset rating (DELETE method)

#### Url: 
localhost:1337/api/rating/reset
DELETE
#### Params: 
```json
none
```
----------------------------------------------------------------------------
