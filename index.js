// import express library
const express = require('express')

// import generate ID number function
const generate = require('shortid').generate

// create a server
const server = express()

// plug-in json()
server.use(express.json())

// port number
const port = 9999

// list of users
const users = [

   { id: generate(), name: 'Emily', bio: 'Her anniversary day is on Christmas'}
]

// POST: add new user
server.post('/api/users', (req, res) => {

   const { name, bio } = req.body
   try {
      
      if(!name || !bio){
         console.log('Hey Its error')
         res.status(400).json({
            errorMessage: 'Please provide name and bio for the user.'
         })
      } else {
         const newUser = { id: generate(), name, bio }
         users.push(newUser)
         res.status(201).json(newUser)
      }

   } catch (error){

      res.status(500).json({ 
         errorMessage: "There was an error while saving the user to the database" 
      })
   }
})

// GET: fetch the list of users
server.get('/api/users', (req, res) => {

   // console.log(req)
   if(!users){
      res.status(500).json({
         errorMessage: "The users information could not be retrieved."
      })
   } else {
      res.status(200).json(users)
   }
})

// GET: fetch specific user
server.get('/api/users/:id', (req, res) => {

   const { id } = req.params
   const reqUser = users.find(eachUser => eachUser.id === id)

   try {
      if(!reqUser){
         res.status(404).json({
            message: "The user with the specified ID does not exist."
         })
      } else {
         res.status(200).json(reqUser)
      }
   } catch (error) {
      res.status(500).json({
         errorMessage: "The user information could not be retrieved."
      })
   }
})

// DELETE: remove specific user from the list of users
server.delete('/api/users/:id', (req, res) => {

   const { id } = req.params
   
   try {
      
      users = users.filter(eachUser => eachUser.id !== id)

      if(!users){ // users 가 undefined 이거나 null 일 경우 false 가 되기때문에 느낌표를 이용해 true 만들어주어 error message 를 실행한다
         console.log('user failed')
         res.status(404).json({
            message: "The user with the specified ID does not exist."
         })
      } else {
         console.log('users success')
         res.status(201).json(users)
      }
   } catch (error){
      res.status(500).json({
         errorMessage: "The user could not be removed"
      })
   }

})

// PUT: update specific user
server.put('/api/users/:id', (req, res) => {

   const { id } = req.params
   const { name, bio } = req.body

   // validate if the user exist
   const indexOfUser = users.findIndex(eachUser => eachUser.id === id)

   try {

      if(indexOfUser !== -1){
         if(!name || !bio){
            res.status(404).json({
               errorMessage: "Please provide name and bio for the user."
            })
         } else {
            users[indexOfUser] = { id, name, bio }
            res.status(200).json({ id, name, bio })
         }
      } else {
         res.status(404).json({
            message: "The user with the specified ID does not exist."
         })
      }
   } catch (error) {
      res.status(500).json({
         errorMessage: "The user information could not be modified."
      })
   }
})

server.listen(port, () => {

   console.log(`listening on port ${port}`)
})

