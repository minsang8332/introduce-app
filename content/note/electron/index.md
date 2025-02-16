---
title: NODE로 윈도우 어플리케이션 만들기
publishedAt: 2022-05-10
---

# NODE로 윈도우 어플리케이션 만들기

## 설치하기

https://www.electronjs.org/

```
yu@yuminsangnoMacBook-Air electron (master) $ ls -l node_modules/.bin/electron
lrwxr-xr-x  1 yu  staff  18  2 15 10:29 node_modules/.bin/electron -> ../electron/cli.js
```

💡 devDependencies로 설치하면 .bin 아래에서 찾을 수 있다

### 핫로딩 설정하기

```json
// nodemon
{
    "watch": "nodemon --exec electron 시작점"
}
```

## 구조

일렉트론은 node.js 기반으로 이루어져 있으며 2가지의 프로세스로 구분할 수 있다.

메인프로세스 (Main Process) 는 node.js 프로세스를 의미하며 일렉트론 실행시 메인으로 시작되는 프로세스를 뜻한다. (서버)

렌더러 프로세스는 일렉트론으로부터 생성되는 크로늄 브라우저이다. 크로늄은 html, css, js 를 실행시키기 위함이다. (클라이언트)

## 시작하기

일렉트론은 최초로 package.json 을 읽는다.  
package.json의 main 속성은 일렉트론을 실행할 시작점 (Etnry Point) 이다. 구조에서 설명한 메인프로세스이기도 하다.

```js
// BrowserWindow는 렌더러 프로세스 즉, 크로늄이다.
const { app, BrowserWindow } = require('electron')

// 쓰레기 수집기 (Garbage Collector)가 수행하는 일련의 행동을 방지하기 위한 전역변수
let mainWindow

// 렌더러 프로세스를 생성하기전 어떻게 준비할지 서술해야하는 콜백 함수
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            /*
            nodeIntegration을 허용하기 위해서는 contextIsolation 을 꺼야함
            contextIsolation 은 일렉트론 12 부터 기본값이 true 임
            preload.js 에서 exposeInMainWorld 안에서 통신하니까
            nodeIntegration은 지양하는게 맞지 않나 싶다.
        */
            contextIsolation: false,
            nodeIntegration: true,
        },
    })

    // 브라우저에서 출력할 파일
    mainWindow.loadFile('index.html')

    // 개발자도구. 제품에서는 당연히 있으면 안되겠지?
    mainWindow.webContents.openDevTools()

    // Listen for window being closed
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

// 메인프로세스가 시작되고 준비되었음을 알려주기 위한 이벤트바인딩
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
    if (mainWindow === null) createWindow()
})
```

위의 간단한 일렉트론 생성예시에서 index.html 파일 안에는 렌더러 프로세스에 접근하기 위한 스크립트가 존재한다.

```html
...
<script>
    require('./renderer.js')
</script>
```

대게, node.js 는 common.js 가 표준인데 우리가 일반적으로 사용하고 있는 바닐라 자바스크립트와 호환이 불가하다. 그러나, 일렉트론에서는 접근이 가능하다.

```js
// 노드에서만 확인 할 수 있는 환경변수를 브라우저에서도 확인 할 수 있다는 뜻.
console.log(process.env.NODE_ENV)
```

## [app](https://www.electronjs.org/docs/latest/api/app)

> 앱 생명 주기를 제어

```js
// 앱 종료 직전 실행 이벤트
app.on('before-quit', (event) => {
    event.preventDefault()
    console.log('앱 종료를 막음')
})
// 앱 브라우저에 포커스 이벤트
app.on('browser-window-focus', (event, window) => {
    console.log('포커스 되었습니다.')
})
// 앱 브라우저에 포커스 해제 이벤트
app.on('browser-window-blur', (event, window) => {
    console.log('포커스 해제 되었습니다.')
})
```

### Methods

#### app.quit()

모든 윈도우를 닫으려 할 때 before-quit 이벤트가 실행되고,  
정상적으로 닫혀졌을 때 will-quit 이벤트가 실행되면서 기본적으로 앱은 종료될 것이다.

이 함수의 팁은 모든 beforeunload와 unload 이벤트 핸들러가 정상적으로 실행된다. beforeunload 이벤트 핸들러에서 false를 반환하여 종료가 취소될 수 있다.

#### app.exit()

exitCode와 함께 즉시 종료. 기본값은 0

유저에게 묻지 않고 즉시 모든 윈도우가 닫힐 것이다. 그리고 before-quit 와 will-quit 이벤트는 실행되지 않는다.

#### app.isReady()

반환형은 boolean. 일렉트론의 초기화가 끝나면 true, 아니면 false. app.whenReady() 와 같다.

#### app.whenReady()

반환형은 Promise. 앱이 준비되었는지 확인할 수 있는 또 하나의 대안

#### app.getAppPath()

반환형은 String. 현재 앱의 경로를 반환

#### [app.getPath(name)](https://www.electronjs.org/docs/latest/api/app#appgetpathname)

반환형은 String. name과 연관된 특정 경로 또는 파일이다. 실패의 경우 예외가 발생된다.

-   home 유저의 홈 경로
-   documents 유저의 My Documents 경로
-   desktop 유저의 바탕화면

## [BrowserWindow](https://www.electronjs.org/docs/latest/api/browser-window)

> 브라우저 윈도우의 제어와 생성

### [options](https://www.electronjs.org/docs/latest/api/browser-window#new-browserwindowoptions)

```js
const parentWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    backgroundColor: '#fff',
    webPreferences: {
        nodeIntegration: true,
    },
})
const childWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    parent: parentWindow,
    backgroundColor: '#fff',
    webPreferences: {
        nodeIntegration: true,
    },
})
```

### [Instance Methods](https://www.electronjs.org/docs/latest/api/browser-window#instance-methods)

#### win.close()

윈도우를 닫게 한다. 이는 유저가 닫기버튼을 누른 것과 같은 효과이다.  
웹페이지는 닫으려해도 취소될 수 있다.

### [Static Methods](https://www.electronjs.org/docs/latest/api/browser-window#instance-methods)

#### BrowserWindow.getAllWindows()

생성된 브라우저 윈도우들을 배열 (BrowserWindow[])로 반환.

### [Instance Properties](https://www.electronjs.org/docs/latest/api/browser-window#instance-properties)

#### win.id

윈도우의 고유한 ID를 정수로 표현. 각각의 ID는 전체 어플리케이션의 브라우저 객체 사이에서 고유하다.

## webContents

webContents는 이벤트반환기. 브라우저 윈도우의 프로퍼티이자 웹페이지를 렌더링하고 제어하는 역할이다.  
💡 웹페이지의 자바스크립트를 이 프로퍼티를 통해 다룰 수 있다!

### [Methods](https://github.com/mawie81/electron-window-state)

#### contents.executeJavaScript(code, [, userGesture])

실행된 코드의 결과를 프로미스로 받을 수 있다.

### [Instance Events](https://www.electronjs.org/docs/latest/api/web-contents#instance-events)

#### did-finish-load

네비게이션이 완료됐을 때 동작한다. i.e 에서 탭의 스피너가 멈추었을 때 onload 이벤트가 전달된다.  
모든 컨텐츠가 불러와졌을 때 실행되는 이벤트 인 듯하다.

#### dom-ready

도큐먼트의 상위레벨이 불러와졌을 때 동작된다.

## [session](https://www.electronjs.org/docs/latest/api/session)

브라우저의 새션, 쿠키, 캐시, 프록시 설정, 기타 등등을 관리

```js
const { session } = require('electron')
const windowSession = mainWindow.webContents.session
const defaultSession = session.defaultSession
console.log(Object.is(windowSession, defaultSession)) // true
```

💡 각 윈도우의 webContents 에 속한 session은 다 같은 객체이다. (같은 세션을 공유)  
💡 defaultSession 를 사용 할 수도 있는데 이 역시 같은 session 을 공유하기에 이 접근법을 권장한다.

### Methods

#### [session.fromPartition](https://www.electronjs.org/docs/latest/api/session#sessionfrompartitionpartition-options)

-   partition string
-   options object (선택)
    -   cache boolean 캐시 사용여부

파티션 문자로부터 세션객체를 반환한다. 같은 파티션에 세션이 존재 할 경우 리턴 될 것이다. 이와 달리 새로운 세션 객체를 옵션과 함께 생성한다.  
만약, 파티션 문자가 persist: 로 시작된다면 페이지는 영구 세션을 사용한다.  
접두사가 없다면 in-memory 세션을 사용할 것이다.  
만약 partition이 비었다면 앱의 default session 으로 반환된다.

```js
// persist: 가 붙으면 앱을 재시작해도 세션이 보존되더라!
const customSession = session.fromPartition('persist:custom')
const window = new BrowserWindow({
    ...
    webPreferences: {
        ...
        session: customSession
    }
})
console.log(Object.is(defaultSession, window.webContents.session)) // false
```

```js
const window = new BrowserWindow({
    ...
    webPreferences: {
        ...
        partition: 'persist:custom'
    }
})
console.log(Object.is(defaultSession, window.webContents.session)) // false
```

### Properties

#### session.defaultSession

앱의 기본 세션 객체

### Instance Methods

#### ses.clearStorageData

스토리지 데이터를 지울 때 쓴다.

#### ses.clearCache

캐시를 지울 때 쓴다.

## debugging

일렉트론 앱에서 디버깅하는 법은 다음과 같다.

```
electron . --inspect=[포트]
```

chrome://inspect 에 접속하여 위 포트를 연결하면 콘솔 창을 확인 할 수 있다.

## electron-rebuild

일렉트론이 사용하는 v8 엔진과 라이브러리를 컴파일 한 v8 엔진의 버전이 다를 경우 충돌을 일으킨다. 충돌을 개선하려 할 때 사용되는 패키지.

```
npm i -g electron-rebuild

electron-rebuild [라이브러리]
```

상세 내용은 아래의 문서를 참조하는 것이 좋다.  
http://electron.ebookchain.org/ko-KR/tutorial/using-native-node-modules.html

## [electron-window-state](https://github.com/mawie81/electron-window-state)

윈도우를 닫은 후 다시 열 때 그 상태를 보존해 주는 라이브러리

```js
const winState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeightL 800
})
// 예를 들어, 특정 위치에 옮긴 후 앱을 닫고 다시 열 때 그 위치에 생성되게 한다.
const mainWindow = new BrowserWindow({
    width: winState.width,
    height: winState.height,
    x: winState.x,
    y: winState.y
})

winState.manage(mainWindow)
```
