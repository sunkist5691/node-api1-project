const fs = require('fs')
// 'fs' stands for file system
// this is built in library inside of Node.js
// It allows us to work with computer file system.
// We can create, add, delete, update files.

fs.mkdirSync('data')
// " mkdirSync 는 folder 를 synchronously 만들어라 " 는 의미

for(let i = 97; i <= 122; i++){
   const letter = String.fromCharCode(i)
   // String.fromCharCode() 는 ASCII Code 를 받아 Alphabet 으로 전환한다
   fs.mkdirSync(`data/${letter}`)
}

