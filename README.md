# Batatabit ![batata-logo](https://cript-conf.herokuapp.com/assets/batata.svg)

Batatabit is a fiction company about crypts, you can create your account, deposit money, transfer to other users or pay whit your batata-card, also, you can create goals where you can save your money until complete your money objectives.

## frontend

You can see more [here](https://github.com/bueno12223/batatabit)
Our use the public version [here](https://batatabit.herokuapp.com)

## backend

Currency works whit express, all the endpoints are protected whit authentication, first, create your account, all the request and responses, when you log in, give you a session id, you have to send it like a cookie in all your request.
Public url request [https://batatabit-api.herokuapp.com]

## EndPoints

## User

### Login user

URL
`URL/user/log-in`
Body
`{"email": example@gmail.com}`
Method: POST
Return a JWT whit the session ID, you have to send it like a cookie for futures request.

### Config user

URL
`URL/user/:id`
Body
`{ userId, fullName, email, password, id }`
If you do not send a data i will not modify.
Method: PUT

## Goals

### Create a new goal

URL
`URL/goals/`
Body
`{ end, title, icon, goal, id }`
METHOD PUT
You have to send the title, font awesome icon, how much you going to save(goal), and the userID.

### Deposit money in goal

URL
`URL/goals/deposit`
Body
`{ ammount, since, title, icon }`
METHOD PUT
You have to send how much(ammound), title and icon to do a histoty transacction.

### Break goal

URL
`URL/goals/break`
Body
`{ id, userId }`
METHOD PUT
You have to send the userID and goalID.

## Transfer money to other user

URL
`URL/goals/transacctions`
Body
`{ to, since, ammount, nameTo, sinceName }`
METHOD PUT
You have to send the the ammount to send, since and to but id, to save the names you have to send, sinceName and nameTo, so when you see the transacction in the home it will say the user Name and no the id.

## scripts

If when you open the server and do not say ´Connected succesfully to mongo´. you have to see your env about the mongodb conecction again.

### npm start

It open in the port that you asigned the server

### npm run dev

It open in the port that you asigned the server, but any change that you do, open the server again whit the changes done.

## Midlewares

### UserAuth

It use passport.js, a framework that help in handle the sesion JWT and validate the password, the passport use bcrypt to hash it.

### ValidateTtransaction

Before do any transacction it verify if the user have the ammount enoguth to do this transacction.

## Installation :wrench

Any pull request would be accepted, you should have nodemon global if you going to run this proyect in development mode, npm and config the enviroment variables.

```bash
npm i nodemon -g
```

You have to config your .env, you can see in the .env.example how fill it.

## Contributing :busts_in_silhouette

Aport to this proyect is open, there are many things that would be better and we hope your conntruibution.

## License

[ISC](https://opensource.org/licenses/ISC)
