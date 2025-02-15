---
title: 톰캣서버 설치하기
publishedAt: 2020-01-21
---

# 톰캣서버 설치하기

## Mac OS 에서 설치

```
brew update
brew install tomcat
```

최신 톰캣 버전으로 **/usr/local/Cellar** 위치에 설치된다.<br>

## 이클립스 설정

개발 툴을 이클립스를 사용한다면 톰캣 서버를 설정 할 때 아래 경로로 지정해야한다.

```
/usr/local/Cellar/tomcat/${TOMCAT_VERSION}/libexec
```
