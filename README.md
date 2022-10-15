# Eurofantasy-System-Backend

## API requests wiki

### Basketball Player
#### Description: 
Create Basketball Player (CREATE method)

#### Url: 
localhost:1337/api/basketballPlayer/create

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
localhost:1337/api/basketballPlayer/update/:basketballPlayerID

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

#### Params: 
```json
None
```
----------------------------------------------------------------------------

#### Description: 
Get a selected Basketball Player (GET method by ID)

#### Url: 
localhost:1337/api/basketballPlayer/:basketballPlayerID

#### Params: 
```json
None
```
----------------------------------------------------------------------------

#### Description: 
Delete a selected Basketball Player (DELETE method)

#### Url: 
localhost:1337/api/basketballPlayer/delete/:basketballPlayerID

#### Params: 
```json
None
```
----------------------------------------------------------------------------
