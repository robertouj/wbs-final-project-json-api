# JSON API Server

JSON API server created as a part of the final project in the WBS Fullstack Web & Apps Developer Bootcamp.


cd /home/robest/FinalProject/material/test-mongo/mongodb-database-tools-amazon-x86_64-100.3.1/bin/

mongorestore --uri mongodb+srv://wbsadmin:DekpwICH2aPDl20s@cluster0.1il5g.mongodb.net/wbs-timebanking --drop

curl -d '{"username": "zubat", "email": "zubat@pokemon.com", "password": "iamthenight"}' -H "Content-Type: application/json" -X POST http://localhost:5000/auth/register

curl -d '{"username": "zubat", "email": "zubat@pokemon.com", "password": "iamthenight"}' -H "Content-Type: application/json" -X POST http://localhost:5000/users

curl -X DELETE http://localhost:5000/users/60d9a08f13fadb5cedbf5fab



to update a user, the right way this time: `curl -d '{"email": "zubat@pokemon.com", "password": "iamtheKNIGHT"}' -H "Content-Type: application/json" -H "Authorization: Bearer tokenhere" -X PUT http://localhost:5000/users/60dafc76a5daa05ced352776`

Token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGFmYzc2YTVkYWEwNWNlZDM1Mjc3NiIsImlhdCI6MTYyNDk2NDIxNH0.yTbai8Z8N6dB0Vr-JJ-7LPIsyG1T4ATCgV3LDKfcQT0

id: 60dafc76a5daa05ced352776

Invalid: 
curl -d '{"email": "zubat@pokemon.com", "password": "thisIsMyNewPassword"}' -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGFmYzc2YTVkYWEwNWNlZDM1Mjc3NiIsImlhdCI6MTYyNDk2NDIxNH0.lastPartTokenChanged" -X PUT http://localhost:5000/users/60dafc76a5daa05ced352776

Valid:
curl -d '{"email": "zubat@pokemon.com", "password": "thisIsMyNewPassword"}' -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGFmYzc2YTVkYWEwNWNlZDM1Mjc3NiIsImlhdCI6MTYyNDk2NDIxNH0.yTbai8Z8N6dB0Vr-JJ-7LPIsyG1T4ATCgV3LDKfcQT0" -X PUT http://localhost:5000/users/60dafc76a5daa05ced352776

Check the Auth:

Invalid:
curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGFmYzc2YTVkYWEwNWNlZDM1Mjc3NiIsImlhdCI6MTYyNDk2NDIxNH0.changingTheToken" http://localhost:5000/auth/me

Valid:
curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGFmYzc2YTVkYWEwNWNlZDM1Mjc3NiIsImlhdCI6MTYyNDk2NDIxNH0.yTbai8Z8N6dB0Vr-JJ-7LPIsyG1T4ATCgV3LDKfcQT0" http://localhost:5000/auth/me

Check the login:

curl -d '{"email": "zubat@pokemon.com", "password": "iamthenight"}' -H "Content-Type: application/json" -X POST http://localhost:5000/auth/login

curl -d '{"email": "dmitris@batch13.com", "password": "iamthemasterofcss"}' -H "Content-Type: application/json" -X POST http://localhost:5000/auth/register



---

## LOGIN 

curl -d '{"email": "roberto123@gmail.com", "password": "roberto123"}' -H "Content-Type: application/json" -X POST http://localhost:5000/auth/login

TOKEN:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDE5MjQyYzViNjQ5NDNmMGUzM2Q1OCIsImlhdCI6MTYyNzU3MDI0MH0.J88sLKTtr5D5Koo3MFb61HnYV1XKhokA-Iv0WG-0pfg

AUTH:

curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDE5MjQyYzViNjQ5NDNmMGUzM2Q1OCIsImlhdCI6MTYyNzU3MDI0MH0.J88sLKTtr5D5Koo3MFb61HnYV1XKhokA-Iv0WG-0pfg" http://localhost:5000/auth/me


curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDE5MjQyYzViNjQ5NDNmMGUzM2Q1OCIsImlhdCI6MTYyNzU3MDI0MH0.J88sLKTtr5D5Koo3MFb61HnYV1XKhokA-Iv0WG-0pfg" http://localhost:5000/auth/me

Id: 61019242c5b64943f0e33d58

curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDE5MjQyYzViNjQ5NDNmMGUzM2Q1OCIsImlhdCI6MTYyNzU3MDI0MH0.J88sLKTtr5D5Koo3MFb61HnYV1XKhokA-Iv0WG-0pfg" http://localhost:5000/users/61019242c5b64943f0e33d58


## Update 

curl -d '{"username": "Roberto", "email": "roberto123@gmail.com", "bio": "To sorry world an at do spoil along. Incommode he depending do frankness remainder to. Edward day almost active him friend thirty piqued. People as period twenty my extent as. Set was better abroad ham plenty secure had horses.", "password": "roberto123"}' -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDE5MjQyYzViNjQ5NDNmMGUzM2Q1OCIsImlhdCI6MTYyNzU3MDI0MH0.J88sLKTtr5D5Koo3MFb61HnYV1XKhokA-Iv0WG-0pfg" -X PUT http://localhost:5000/users/61019242c5b64943f0e33d58

curl -d '{"username": "Roberto", "email": "roberto123@gmail.com", "password": "roberto123"}' -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDE5MjQyYzViNjQ5NDNmMGUzM2Q1OCIsImlhdCI6MTYyNzU3MDI0MH0.J88sLKTtr5D5Koo3MFb61HnYV1XKhokA-Iv0WG-0pfg" -X PUT http://localhost:5000/users/61019242c5b64943f0e33d58


curl -d '{"username": "Roberto", "email": "roberto123@gmail.com", "password": "roberto123"}' -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDE5MjQyYzViNjQ5NDNmMGUzM2Q1OCIsImlhdCI6MTYyNzg5NDMwOH0.maN1SvQigBYqBiQQNVkTuwVCjY2GVT3oNqnPPRHwK0I" -X PUT http://localhost:5000/users/61019242c5b64943f0e33d58


