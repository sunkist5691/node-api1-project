const http = require('http')

const server = http.createServer((req, res) => {
   // use 'req' to get information what client request to server
   // use 'res' to send information what client expect to get from server

   res.statusCode = 200
   // sending a "success" status code

   res.setHeader('Content-Type', 'text/html')
   // 브라우저에게 '브라우저님, 지금 header object 에 text/html 형식으로 정보를 전달할께요' 라고 말하는 것
   // 'Content-Type' 은 어떤 유형의 data(정보) 를 전달 할지를 결정하는 것
   // 'text/html' 은 전달하는 정보의 유형중 하나이다.

   res.write('<h1>Hello, World! </h1>')
   // 브라우저에게 text/html 정보를 보낸다고 했으니, '<h1>Hello, World</h1>' 을 써서 보낸다

   res.end()
   // 브라우저에게 정보를 전달하고 종결 짓는다

})

server.listen(8080, () => {
   // 항상 브라우저님으로 부터 서버는 8080 포트에 귀와 눈을 열고 있어야한다.
   // 만약 브라우저님으로 부터 request 가 더 이상 없을 경우, 
   // server 가 다운 됬다는 뜻이다.
   // 즉, 원하는 요청이 이뤄지지 않았으니 frontend 에서도 작동이 안될 것이라는 얘기이다.
   
   console.log('server started at port 8080')
   // 내가 Ctrl + C 를 누르지 않는 이상, 이 서버는 계속 listening (존재한다) 하게 된다.
   // Ctrl + C 를 누르는 순간, 브라우저는 더 이상 request 와 response 를 받을 수 없게 된다.
})