---
title: SSH Key 생성하기
publishedAt: 2020-04-18
---

# SSH Key 생성하기

## 개요

시큐어 셸(Secure Shell, SSH)은 네트워크 상의 다른 컴퓨터에 로그인하거나 원격 시스템에서 명령을 실행하고 다른 시스템으로 파일을 복사할 수 있도록 해 주는 응용 프로그램 또는 그 프로토콜을 가리킨다. 기존의 rsh, rlogin, 텔넷 등을 대체하기 위해 설계되었으며, 강력한 인증 방법 및 안전하지 못한 네트워크에서 안전하게 통신을 할 수 있는 기능을 제공한다. 기본적으로는 22번 포트를 사용한다.

Mac OS, Windows, Linux에서 SSH 키 쌍을 생성 할 수 있게 된다.

## 시작하기

터미널에서 **ssh-keygen**을 입력한다.

### Key-Name 입력

```
Generating public/private rsa key pair. Enter file in which to save the key (/Users/USER/.ssh/id_rsa):
```

키 쌍의 명칭을 id_rsa로 해도 좋을지 물어보는데 생략 가능하다. default는 id_rsa

### PW 입력

```
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

생성된 공개 키, 비밀 키의 위치는 아래와 같다.

#### Mac OS

```
~/.ssh/*.pub

```
