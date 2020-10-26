const express = require('express')
// this import is now pulling from node_modules instead of the node standard libraries.
const db = require('./database')

const server = express()
// create an express server instance

server.use(express.json())
// this allows us to parse request JSON bodies.

server.get('/', (req, res) => {

   res.json({ message: 'Hello, World' })
})

server.get('/users', (req, res) => {
   const users = db.getUsers()
   // db 파일 안에 있는 getUsers() 를 실행하여 데이터를 users 가 가리키게 한다.
   
   res.json(users)
   // users 가 가리키는 data 를 json 형태로 바꾸어 client 에게 전송한다(response)
})

server.get('/users/:id', (req, res) => {
   const id = req.params.id
   // 이렇게 해야 client 가 특정 id 를 가진 정보를 request 를 할때,
   // request 할때 받아 놓은 params.id 를 const id 가 가리키게 한다.

   const user = db.getUserById(id)
   // const id 를 전달 받아,
   // db 파일 안에 있는 getUserById(id) 를 실행하여 데이터를 users 가 가리키게 한다. 
   // 주의! 항상 숫자는 string 으로 전달한다.

   if(user){

      res.json(user)

   } else {
      // if the req.params.id 가 이상한 문자거나 존재하지 않는 id 일 경우
      // user 의 값은 undefined 가 되며
      // 이 error 에 관한 정보 또한 client 에게 전달해줘야 한다.
      res.status(404).json({
         message: 'User Not Found'
      })

   }
   // endpoint 와 route 을 이용하여 req res 를 코딩한 것이 API 가 된다.
   // API 는 메신저 역할을 한다고 했었다.
   // 방금 우리가 코딩한 것들이 API 이다.
})

server.post('/users', (req, res) => {

   const newUser = db.createUser({
      name: 'req.body.name'
   })
   // client 에서 request 를 할때, 반드시 { name: 'Jackie'} 이런식으로 POST 를 하면,
   // server 에서 body 라는 object 안에 name: 'Jackie' 를 전달 받아 server database 에 추가 저장 할수 있게 된다.


   res.status(201).json(newUser)
   // status code 201 is success message that server able to receive the request 
   // and able to create new data and reponse back
   // POST method 를 테스팅 하기 위해서는 browser 가 아닌 postman 을 통해 실험할 수 있다.
})

server.put('/users/:id', (req, res) => {

   const id = req.params.id
   const user = db.getUserById(id)
   // 아이디가 존재하면 데이터를 user 에 받아 놓는다.

   if(user){

      const updatedUser = db.updateUser(id, {
         name: req.body.name
      })
      res.json(updatedUser)

   } else {

      res.status(404).json({
         message: 'User Not Found and Cannot Update'
      })

   }
})

server.delete('/users/:id', (req, res) => {

   const id = req.params.id
   const user = db.getUserById(id)

   if(user){

      const deletedUser = db.deleteUser(req.params.id, req.body)
      res.status(204).end()
      // status code 204 is successful empty response
      // OR you can do status code 200 with successful message that is 'deleted complete'

   } else {

      res.status(404).json({
         message: 'User Not Found and Cannot Update'
      })

   }
})

server.listen(8080, () => {
   // 항상 브라우저님으로 부터 server 는 8080 포트에 귀와 눈을 열고 있어야한다.
   // 만약 브라우저님으로 부터 request 가 더 이상 없을 경우나 웹페이지를 표기할수 없을 경우,
   // server 가 다운 됬다는 뜻이다.
   // 즉, 원하는 요청이 이뤄지지 않았으니 frontend 에서도 작동이 안될 것이라는 얘기이다.
   
   console.log('server started at port 8080')
   // 내가 Ctrl + C 를 누르지 않는 이상, 이 서버는 계속 listening (존재한다) 하게 된다.
   // Ctrl + C 를 누르는 순간, 브라우저는 더 이상 request 와 response 를 받을 수 없게 된다.
})
