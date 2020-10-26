const name =  process.argv[2] || 'World'
// process 는 우리가 터미널에 쓰는 것을 나타낸다.
// 예를 들어 node hello.js Hello 라고 터미널에 쓰면, 
// process.argv[0] 은 node,
// process.argv[1] 은 hello.js
// process.argv[2] 은 Hello 를 나타낸다.

console.log(`Hello, ${name}`)