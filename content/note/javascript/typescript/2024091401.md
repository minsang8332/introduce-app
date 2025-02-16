---
title: 타입스크립트 unknown, any, never의 차이
publishedAt: 2024-09-14
---

# 타입스크립트 unknown, any, never의 차이

헷갈리는 세 종류의 타입에 대해 차이점을 정리했다.

## unknown 과 any

`unkown` 타입과 `any` 타입의 차이는 `재선언 가능` 여부이다.  
unkown 타입은 한번 타입이 선언되면 재차 할당시 동일한 타입이여야 한다. 예를 들어, number 타입의 값을 할당시 다음 번 할당의 경우 number 타입이 와야 한다.

```ts
let a: unknown
let b: string
// number 타입으로 선언
a = 5
b = 'b'
// 에러 발생! unkown 타입은 number 타입이 할당되었으므로 다른 타입이 와서는 안된다.
a = b
```

그러나, `any` 타입은 다르다. 어떤 타입이 와도 재선언이 가능하다.

```ts
let a: any
let b: string
// number 타입으로 선언
a = 5
b = 'b'
// ok
a = b
```

## never

`never` 타입은 함수 반환 값이 없는 경우 사용한다. 여기서 값이 없는 경우가 참 애매한데 자바스크립트 함수의 경우 리턴 값이 없는 경우 콘솔로 찍어보면 보통 `undefined` 가 찍힌다.  
그러나, never 타입은 `void` 도 `undefined` 도 아닌 예외가 발생시 선언한다.

```ts
const neverFunc = (flag: boolean = false): string | never => {
    if (flag) {
        throw new Error('never')
    }
    return 's'
}
```

## tsc

> 타입스크립트 컴파일러

```sh
# tsconfig.json 파일 생성
tsc --init
```

```json
{
    "compoilerOptions": {
        // 어떤 자바스크립트 코드를 컴파일 할건지 설정.
        "target": "es5",
        // 특정 라이브러리를 추가
        "lib": ["dom"]
    },
    // 파일을 포함. 패턴이 적용되지 않으며 exclude 을 덮어쓴다.
    "files": [],
    // 파일이나 폴더를 제외. include 을 재정의한다.
    "exclude": ["build/*"],
    // 파일이나 폴더만 포함
    "include": ["main.ts"]
}
```
