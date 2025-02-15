---
title: NODE HTTP 서버를 만들어보자
publishedAt: 2021-08-22
---

# NODE HTTP 서버를 만들어보자

## 생명주기

```
node app.js 실행
    |
코드 해석, 변수 및 함수 등록
    |
[이벤트 루프] ----> 노드 어플리케이션
    |
이벤트 리스너가 등록되는 한 반복
```

## 시작하기

### http.createServer

> https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener

서버 객체를 생성

```js
const http = require('http')
const server = http.createServer((req, res) => {
    ...
});
```

### server.listen

> https://nodejs.org/api/http.html#http_server_listen

HTTP 서버가 끊어지지 않게 유지하는 역할을 수행. 사용하지 않는다면 실행 후 종료되버린다.

```js
server.listen(3000)
```

### response.write

> https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback

HTTP body의 날 것이라고 한다. 테스트 할 때 말고는 딱히 쓸 일은 없다.

```js
res.write('<html>')
res.write('<head><title>제목</title></head>')
res.write('<body><h1> 힘들게써야되지 ? </h1></body>')
res.write('</html>')
```

### response.end

> https://nodejs.org/api/http.html#http_response_end_data_encoding_callback

서버에 응답 헤더와 바디를 보냈음을 알리고 처리. 주로 응답 하기 직전 써주어야 함.

## 요청 (request) 해석하기

express 를 사용하면 아래와 같은 코드를 쓰지 않아도 된다.
그러나, 어떻게 동작하는지 간단하게 알아둘 필요가 있다.  
예를 들어, 폼에서 이름이 name인 input 필드에 'yuu2dev' 를 입력한 후 전송해보자.

```js
const server = (req, res) => {
    const buffer = []
    // 버퍼에 데이터가 채워질 때마다 실행되는 이벤트
    req.on('data', (chunk) => {
        buffer.push(chunk)
    }),
        // 요청이 마무리 되었을 때 실행되는 이벤트
        req.on('end', () => {
            // chunk가 담긴 배열을 하나로 합쳐 새로운 버퍼를 만들어 문자열로 변환
            const parsed = Buffer.concat(buffer).toString()

            // name=yuu2dev
            const [k, v] = parsed.split('=')
            console.log(k, v)
        })
}
```

## 디버깅 (Debugging)

많은 상품을 크롤링 한다던가 스택 큐가 실행 도중에 알 수 없는 에러로 인해 기대하는 결과 값이 나오지 않는다면 어쩔 수 없이 많은 시간을 할애해서 코드를 수정 해야 할 것이다.  
조금이라도 시간을 낭비하지 않기 위해서 콜스택 (Call Stack)에서 지점마다 어떤 값이 들어 있는지 확인 할 수만 있다면 내가 자주 사용하는 VsCode의 기능을 조금이나마 알 필요가 있을 것이다.  
https://code.visualstudio.com/docs/nodejs/nodejs-debugging

그리고 에러에 대한 설명을 잠깐 하자면 ...

-   문법 에러
-   실행 에러
-   논리 에러

에러는 세가지로 구분 할 수 있다. 위에서 말한 예시는 논리 에러이다.  
이 논리에러는 간단하게 말하면 우리가 프로그램을 짜고 의도한대로 동작하지 않은 경우를 뜻한다.

이 경우 에러 메시지를 출력하지 않아 발견하기 어렵다. vscode를 이용한다면 디버깅을 사용 할 수 있다. **Run -> Start Debugging -> Node.js** 를 통해서 실행 할 수 있다.

만약 디버깅이 끝나고 exit 처리 되어 곤란하다면 설정 값을 추가해서 해소 할 수 있다.  
**프로젝트/.vsocde/launch.json** 에 아래와 같은 값을 추가해야 한다.

```json
"configurations": [
    {
        "type": "node",
        "request": "launch",
        "name": "Launch Program",
        // 진입점 설정
        "program": "${workspaceFolder}/app.js",
        "restart": true,
        // 노드몬을 사용한다면 설정
        "runtimeExecutable": "nodemon",
        // 디버그 콘솔이 아닌 터미널에서 볼 수 있음
        "console":"integratedTerminal",
    }
    ...
]
```

## Express

> https://expressjs.com/en/4x/api.html (4.x API)

앞 문서에서 node.js http 모듈을 통해 요청데이터를 받아올 때 data 와 end 이벤트를 건 후 청크를 바이트 배열로 담아 문자열로 파싱하는 일련의 과정들을 앞으로 이 웹프레임워크가 담당 할 것이다.

### 설치 및 시작하기

```
npm install --save express
```

모듈을 설치 한 후 아래의 express 객체를 받아온다.

```js
const express = require('express')
const app = express()
```

기본적인 사용법은 아래와 같다. _**use**_ 는 미들웨어 함수이다.  
아래는 여러가지 사용법들을 나열해두었다.

```js
app.use((req, res, next) => {
    console.log('미들웨어1')
    next()
})

app.get((req, res, next) => {
    console.log('미들웨어2')
    res.send('<h1>Hello Express</h1>')
})
```

### express.urlencoded([options])

> https://expressjs.com/en/4x/api.html#express.urlencoded

아래와 같은 미들웨어가 있고 form.html 문서에는 myname 이라는 필드를 가진 폼이 있으며 POST 로 데이터를 전송 할 것이라 가정해보자.

```js
app.get('/', (req, res, next) => {
    const path = require('path')
    res.sendFile(path.join(__dirname, 'views', 'form.html'))
})

app.post('/', (req, res) => {
    let myname = req.body.myname
    if (myname === undefined) {
        console.log('정상적으로 보냈음에도 불구하고 왜 undefined가 떳을까?')
    }
    const data = { myname }
    res.send(data)
})
```

정상적으로 보냈음에도 불구하고 Content-Type 등을 비롯하여 여러가지 이유로 매칭되지 않아 {} 또는 undefined 를 뱉어내거나 할 때 요청 데이터를 파싱해준다.

```js
// body-parser 라이브러리는 구식화 (deprecated) 되어버렸다.
app.use(express.urlencoded({ extended: true }))
```

### express.Router()

> https://expressjs.com/en/4x/api.html#express.router

웹 서버에서 담당하는 기능이 많으면 많아질 수록 미들웨어 역시 비례해서 코드가 길어진다.  
하나의 파일에 수 많은 미들웨어가 있다면 어떻게 유지보수를 할 것인가. 기능 및 서비스 별로 분할 하고 싶다면 라우터를 이용해보자.

```js
// shopRoutes.js
const router = express.Router()
router.get('/main', (req, res) => {
    res.send({ title: 'shop' })
})
module.exports = router

// adminRoutes.js
const router = express.Router()
router.get('/main', (req, res) => {
    res.send({ title: 'admin' })
})
module.exports = router

// server.js
const adminRoutes = require('./routes/adminRoutes')
/* http:호스트/main */
app.use(myRoutes)
/* http:호스트/admin/main */
app.use('admin', myRoutes)
```

### express.static()

> https://expressjs.com/en/4x/api.html#express.static

소스파일 외에 이미지나 html 문서는 자원주소를 통해서 접근 가능해야 할 것이다.

```js
// app.js
const public = path.join(__dirname, 'public'));
app.use(express.static(public);
```

진입점을 app.js 라고 한다면 public 아래의 문서파일은 누구나 접근가능하도록 처리한다.
