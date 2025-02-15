---
title: NODE 웹소켓 통신하기
publishedAt: 2022-05-02
---

# NODE 웹소켓 통신하기

https://socket.io/ <br>
https://github.com/socketio/socket.io

## 개요

```
웹소켓을 쉽게 다룰 수 있는 노드 라이브러리 패키지
HTTP는 요청 <-> 응답 이라면 웹소켓은 그저 데이터를 담을 뿐이다.
```

## 사용법

```js
// npm i socket.io
const server = app.listen(8080)
const io = require('socket.io')(server)
io.on('connection', (socket) => {
    console.log('클라이언트가 연결 될 때 동작하는 이벤트')
})
```

````js
// npm i socket.io-client
import openSocket from 'socket.io-client'
openSocket(API_URL)
### 컨트롤러가 소켓에 접근하는 법
객체 공유를 피하기 위해 우선 싱글턴 객체를 만들어야 한다.
```

```js
// socket.js
let io
module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer)
        return io
    },
    getIO: () => {
        if (!io) {
            throw new Error('소켓을 초기화 해주세요')
        }
        return io
    }
}
````

```js
// app.js
const io = require('socket.io').init(server)
```

```js
// 컨트롤러
const controller = (req, res) => {
    io.getIO().emit('my-name', {
        name: 'yms',
    })
}
```

모든 클라이언트는 my-name 이라는 이벤트가 있으면 위 데이터를 받을 수 있다.

```js
// 클라이언트
const socket = openSocket(API_URL)
socket('my-name', data) => {
    console.log(data)
})
```

클라이언트마다 다른 데이터를 받게 할 수도 있다.
