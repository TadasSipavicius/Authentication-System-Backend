# Sprendžiamo uždavinio aprašymas

## Sistemos paskirtis
Euro Fantasy – tai krepšinio fantasy žaidimas internete. Kiekvienas prisijungęs vartotojas
galės susidėti savo norimą komandą iš žaidėjų sąrašo. Kiekviena sukurta komanda bus
įtraukta į reitingą, kur bus galima stebėti savo pozicija tarp visų sukurtų komandų.

Projekto tikslas – sukurti krepšinio fantasy žaidimą, kur dalyviai galėtų sukurti savo
“Euroleague” žaidėjų komandą ir konkuruoti tarp žaidžiančių žaidėjų. 

## Funkciniai reikalavimai

Reitingas:
1. GET reitingo vietą
2. INSERT komandą į reitingą
3. DELETE komandą iš reitingo
4. GET reitingo sąrašą
5. DELETE reitingą (Reset reitingą)

Komanda:
1. GET savo(current logged in user) komandų sąrašą
2. GET pasirinktą komandą
3. INSERT naują komandą
4. DELETE pasirinktą komandą
5. EDIT pasirinktą komandą.

Krepšinio žaidėjas:
1. CREATE krepšinio žaidėją
2. EDIT krepšinio žaidėją
3. GET krepšinio žaidėjų sąrašą
4. GET pasirinktą žaidėją
5. DELETE pasirinktą žaidėją

# Sistemos architektūra:
Sistemos sudedamosios dalys:
• Kliento pusė(ang. Front-End) – naudojant React.js
• Serverio pusė(ang. Back_End) – Naudojant NodeJS, Express Framework.
• Duomenų bazė – MYSQL.

<img width="480" alt="image" src="https://user-images.githubusercontent.com/74046943/208979720-9e25861c-f4c3-4c38-829e-faab2d89ac02.png">

# Naudotojo sąsajos projektas
Autentifikacijos langai:
Prisijungimas:

<img width="715" alt="image" src="https://user-images.githubusercontent.com/74046943/208980212-e87bb8b5-5818-4bb3-be28-4ee9a9c38ac6.png">

Prisiregistravimas:

<img width="713" alt="image" src="https://user-images.githubusercontent.com/74046943/208980259-f647c819-fdad-4c16-a221-f0e54a5785c0.png">

Slaptažodžio pamiršimas:

<img width="714" alt="image" src="https://user-images.githubusercontent.com/74046943/208980325-b5622757-b95f-459c-a29c-5d59c5e20a18.png">

Navigacijos langas prisijungusio vartotojo:

<img width="716" alt="image" src="https://user-images.githubusercontent.com/74046943/208980635-88cf2530-d94e-47b6-a2a0-af0f08626696.png">

Sukūrimas naujos komandos langas:

<img width="344" alt="image" src="https://user-images.githubusercontent.com/74046943/208980714-89d6db70-03c7-4ecb-927b-885508a4c8a8.png">

Visų komandų langas:

<img width="716" alt="image" src="https://user-images.githubusercontent.com/74046943/208980763-81364741-ed3a-4106-b30b-89e01b7c9e67.png">

Žaidėjų sąrašas:

<img width="655" alt="image" src="https://user-images.githubusercontent.com/74046943/208980810-958e7968-c382-4d98-b5d9-1683ba30f579.png">

Naujo žaidėjo sukūrimas:

<img width="313" alt="image" src="https://user-images.githubusercontent.com/74046943/208980854-10c00b86-03ff-41aa-840a-9608daf953dc.png">

Admino reitingo dashboard panelė:

<img width="671" alt="image" src="https://user-images.githubusercontent.com/74046943/208980909-b7b668fb-8b8e-4466-bc1d-36dfa1658b05.png">

Komandos editinimo langas:

<img width="704" alt="image" src="https://user-images.githubusercontent.com/74046943/208980986-4178cfce-ea79-4dc3-a762-71e96072bc94.png">

# API specifikacija

### Basketball Player
#### Description: 
Create Basketball Player (CREATE method)

#### Url: 
https://apieurpfantasy.herokuapp.com/api/basketballPlayer

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
#### Header: 
```json
        {
            "auth-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmZjNmMDI0OC1iMjI5LTQwMzktYTI3ZC0wODcyMDg0Y2Q2NmEiLCJyb2xlcyI6IlVzZXIiLCJpYXQiOjE2Njg0MTY4NDgsImV4cCI6MTY2ODQxNzE0OH0.AcmwmxIR8YHd1d7bNiyz6Jq97_rqguF95C8ZP0SmuzY"
        }
```
----------------------------------------------------------------------------
#### Description: 
Edit Basketball Player (PUT method)

#### Url: 
https://apieurpfantasy.herokuapp.com/api/basketballPlayer/31

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
#### Header: 
```json
        {
            "auth-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmZjNmMDI0OC1iMjI5LTQwMzktYTI3ZC0wODcyMDg0Y2Q2NmEiLCJyb2xlcyI6IlVzZXIiLCJpYXQiOjE2Njg0MTY4NDgsImV4cCI6MTY2ODQxNzE0OH0.AcmwmxIR8YHd1d7bNiyz6Jq97_rqguF95C8ZP0SmuzY"
        }
```
----------------------------------------------------------------------------

#### Description: 
Get all Basketball Players (GET method)

#### Url: 
https://apieurpfantasy.herokuapp.com/api/basketballPlayer

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
https://apieurpfantasy.herokuapp.com/api/rating/31/team/31/basketballPlayer/521

GET
#### Params: 
```json
None
```
----------------------------------------------------------------------------

#### Description: 
Delete a selected Basketball Player (DELETE method)

#### Url: 
https://apieurpfantasy.herokuapp.com/api/basketballPlayer/14

DELETE
#### Params: 
```json
None
```
#### Header: 
```json
        {
            "auth-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmZjNmMDI0OC1iMjI5LTQwMzktYTI3ZC0wODcyMDg0Y2Q2NmEiLCJyb2xlcyI6IlVzZXIiLCJpYXQiOjE2Njg0MTY4NDgsImV4cCI6MTY2ODQxNzE0OH0.AcmwmxIR8YHd1d7bNiyz6Jq97_rqguF95C8ZP0SmuzY"
        }
```
----------------------------------------------------------------------------


### Team
#### Description: 
Create new Team (CREATE method)

#### Url: 
https://apieurpfantasy.herokuapp.com/api/team

POST
#### Params: 
```json
       {
               "team_name": "Zalgirio dubleriai"
       }
```
#### Header: 
```json
        {
            "auth-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmZjNmMDI0OC1iMjI5LTQwMzktYTI3ZC0wODcyMDg0Y2Q2NmEiLCJyb2xlcyI6IlVzZXIiLCJpYXQiOjE2Njg0MTY4NDgsImV4cCI6MTY2ODQxNzE0OH0.AcmwmxIR8YHd1d7bNiyz6Jq97_rqguF95C8ZP0SmuzY"
        }
```
----------------------------------------------------------------------------
#### Description: 
Edit selected Team (PUT method)

#### Url: 
https://apieurpfantasy.herokuapp.com/api/team/31

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
#### Header: 
```json
        {
            "auth-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmZjNmMDI0OC1iMjI5LTQwMzktYTI3ZC0wODcyMDg0Y2Q2NmEiLCJyb2xlcyI6IlVzZXIiLCJpYXQiOjE2Njg0MTY4NDgsImV4cCI6MTY2ODQxNzE0OH0.AcmwmxIR8YHd1d7bNiyz6Jq97_rqguF95C8ZP0SmuzY"
        }
```
----------------------------------------------------------------------------

#### Description: 
Get all Teams (GET method)

#### Url: 
https://apieurpfantasy.herokuapp.com/api/team

GET
#### Params: 
```json
{
    none
}
```
#### Header: 
```json
        {
            "auth-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmZjNmMDI0OC1iMjI5LTQwMzktYTI3ZC0wODcyMDg0Y2Q2NmEiLCJyb2xlcyI6IlVzZXIiLCJpYXQiOjE2Njg0MTY4NDgsImV4cCI6MTY2ODQxNzE0OH0.AcmwmxIR8YHd1d7bNiyz6Jq97_rqguF95C8ZP0SmuzY"
        }
```
----------------------------------------------------------------------------

#### Description: 
Get a selected Basketball Team (GET method by ID)

#### Url: 
https://apieurpfantasy.herokuapp.com/api/team/41

GET
#### Params: 
```json
{
    none
}
```
#### Header: 
```json
        {
            "auth-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmZjNmMDI0OC1iMjI5LTQwMzktYTI3ZC0wODcyMDg0Y2Q2NmEiLCJyb2xlcyI6IlVzZXIiLCJpYXQiOjE2Njg0MTY4NDgsImV4cCI6MTY2ODQxNzE0OH0.AcmwmxIR8YHd1d7bNiyz6Jq97_rqguF95C8ZP0SmuzY"
        }
```
----------------------------------------------------------------------------

#### Description: 
Delete a selected Basketball Team (DELETE method)

#### Url: 
https://apieurpfantasy.herokuapp.com/api/team/51

DELETE
#### Params: 
```json
{
    none
}
```
#### Header: 
```json
        {
            "auth-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmZjNmMDI0OC1iMjI5LTQwMzktYTI3ZC0wODcyMDg0Y2Q2NmEiLCJyb2xlcyI6IlVzZXIiLCJpYXQiOjE2Njg0MTY4NDgsImV4cCI6MTY2ODQxNzE0OH0.AcmwmxIR8YHd1d7bNiyz6Jq97_rqguF95C8ZP0SmuzY"
        }
```
----------------------------------------------------------------------------



### Rating
#### Description: 
Create new Team into Rating (CREATE method)

#### Url: 
https://apieurpfantasy.herokuapp.com/api/rating

POST
#### Params: 
```json
       {
               "teamID": 11,
               "teamName": "Testuotojai",
               "ratingPlace": 2
       }
```
#### Header: 
```json
        {
            "auth-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmZjNmMDI0OC1iMjI5LTQwMzktYTI3ZC0wODcyMDg0Y2Q2NmEiLCJyb2xlcyI6IlVzZXIiLCJpYXQiOjE2Njg0MTY4NDgsImV4cCI6MTY2ODQxNzE0OH0.AcmwmxIR8YHd1d7bNiyz6Jq97_rqguF95C8ZP0SmuzY"
        }
```
----------------------------------------------------------------------------

#### Description: 
Get rating list (GET method)

#### Url: 
https://apieurpfantasy.herokuapp.com/api/rating

GET
#### Params: 
```json
none
```
----------------------------------------------------------------------------

#### Description: 
Get team rating (GET method by ID)

#### Url: 
https://apieurpfantasy.herokuapp.com/api/rating/team/31

GET
#### Params: 
```json
none
```
#### Header: 
```json
        {
            "auth-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmZjNmMDI0OC1iMjI5LTQwMzktYTI3ZC0wODcyMDg0Y2Q2NmEiLCJyb2xlcyI6IlVzZXIiLCJpYXQiOjE2Njg0MTY4NDgsImV4cCI6MTY2ODQxNzE0OH0.AcmwmxIR8YHd1d7bNiyz6Jq97_rqguF95C8ZP0SmuzY"
        }
```
----------------------------------------------------------------------------

#### Description: 
Delete a selected Team from Rating (DELETE method)

#### Url: 
https://apieurpfantasy.herokuapp.com/api/rating/24

DELETE
#### Params: 
```json
none
```
#### Header: 
```json
        {
            "auth-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmZjNmMDI0OC1iMjI5LTQwMzktYTI3ZC0wODcyMDg0Y2Q2NmEiLCJyb2xlcyI6IlVzZXIiLCJpYXQiOjE2Njg0MTY4NDgsImV4cCI6MTY2ODQxNzE0OH0.AcmwmxIR8YHd1d7bNiyz6Jq97_rqguF95C8ZP0SmuzY"
        }
```
----------------------------------------------------------------------------
#### Description: 
Reset rating (DELETE method)

#### Url: 
https://apieurpfantasy.herokuapp.com/api/rating/reset/rating

DELETE
#### Params: 
```json
none
```
#### Header: 
```json
        {
            "auth-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmZjNmMDI0OC1iMjI5LTQwMzktYTI3ZC0wODcyMDg0Y2Q2NmEiLCJyb2xlcyI6IlVzZXIiLCJpYXQiOjE2Njg0MTY4NDgsImV4cCI6MTY2ODQxNzE0OH0.AcmwmxIR8YHd1d7bNiyz6Jq97_rqguF95C8ZP0SmuzY"
        }
```
----------------------------------------------------------------------------

# Išvados
Projektą išėjo realizuoti plius minus taip, kaip buvo ir įsivaizduota projekto pradžioje. Išėjo parašyti API, parašyti autentifikaciją su jwt. Beveik visas funkcijas išėjo atvaizduoti ir UI dalyje. 
Projektas dar nėra užbaigtas, todėl reikia dar investuoti laiko, kad užsibaigti projektą iki galo
