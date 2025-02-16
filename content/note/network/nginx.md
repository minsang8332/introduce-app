---
title: NGINX 깊게 다루어 봤습니다
publishedAt: 2020-05-25
---

# NGINX 깊게 다루어 봤습니다

## 개요

NGINX는 웹 서버 소프트웨어로, 가벼움과 높은 성능을 목표로 한다. <br>
**더 적은 자원으로 더 빠르게 데이터를 서비스 할 수 있다.** <br>
기초 내용을 기록하기 위해 기술한다.

## 시작하기

웹 서버 Nginx를 설치하기에 앞서 운영체제가 필요하다.
보편적으로 배포용 서버는 리눅스(Linux) 계통을 이용한다.

1. 센토스(CentOS)
2. 페도라(Fedora)
3. 우분투(Ubuntu)

## 설치하기

### 1-1. 패키지 매니저를 통한 설치

간편하게 All-In-One으로 Nginx를 설치 할 수 있다는 장점이 있다.

#### 우분투(Ubuntu)

APT를 이용하여 설치한다.

```
apt-get update && apt-get install nginx
```

우분투 계열에서는 설치 한 후 실행 중인 프로세스를 확인 해보면 곧 바로 서비스가 시작 됨을 알 수 있다.

```
ps aux | grep nginx

root      1997  0.0  0.1 141112  1576 ?        Ss   17:27   0:00 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
www-data  2000  0.0  0.6 143788  6212 ?        S    17:27   0:00 nginx: worker process
root     13662  0.0  0.1  14856  1024 pts/0    S+   19:30   0:00 grep --color=auto nginx
```

#### 센토스(CentOS)

Yum을 이용하여 설치한다.

```
yum install nginx
```

만약 nginx를 참조 혹은 설치 할 수 없다고 한다면 (구 CentOS)

```
yum install epel-release
```

epel-release를 설치 해주어야 한다. 그리고 난 후 <br>
nginx를 다시 설치하고 센토스에서는 자동적으로 nginx를 실행시키지 않기에 <br>
커맨드로 실행 시켜 주어야 한다. <br>

```
service nginx start
```

### 1-2. 소스(Source)를 통한 설치법

운영체제 내에서 소스를 다운 받는다.
(예제 환경은 리눅스 Ubuntu 18 에서 진행 했다.)

```
wget http://nginx.org/download/파일.tar.gz

tar -zxvf 파일.tar.gz
```

### 2. 의존성 패키지 설치

##### PCRE (Perl Compatible Regular Expressions)

펄 프로그래밍 언어의 정규 표현식 기능에 착안하여 만든, 정규 표현식 C 라이브러리

```
# Ubuntu
apt-get install libpcre3 libpcre3-dev
# CentOS
yum install pcre pcre-devel
```

##### zlib

C로 작성된 데이터 압축 라이브러리의 일종

```
# Ubuntu
apt-get install zlib1g zlib1g-dev
# CentOS
yum install zlib zlib-devel
```

##### libssl

TLS (SSL과 TLS 프로토콜) 을 지원하는 Open SSL 라이브러리이다.

```
apt-get install libssl-dev
yum install openssl-devel
```

### 3. 환경 설정

nginx 폴더 하의 **configure** 파일을 통해 명령어로 환경설정을 해야 한다.

```
# 각각의 경로는 입맛에 맞게 수정 할 것.
./configure

--sbin-path=/usr/bin/nginx
--conf-path=/etc/nginx/nginx.conf
--error-log-path=/var/log/nginx/error.log
--http-log-path=/var/log/nginx/access.log
--with-pcre
--pid-path=/var/run/nginx.pid
--with-http_ssl_module
```

뭘 해야 할 지 모를 때는 <br>
**--help** 플래그를 붙인다. 어떻게 환경설정을 해야 할 지 상세히 설명 해준다. <br>
<small>[!] --with-http_ssl_module와 같은 정적모듈은 NGINX 서버가 자동으로 로드 한다.</small><br>
<small>[!] --with는 포함이고 --without은 기존에 있는 모듈을 제거.</small><br>
http://nginx.org/en/docs/configure.html <br>

### 4. 컴파일

컴파일 하기 위해서는 C, C++ 컴파일러가 필요하다.

```
# Ubuntu
apt-get install build-essential
# CentOS
yum groupinstall "Development Tools"
```

```
# 컴파일 명령어
make

# 설치 명령어
make install
```

### 5. 서비스 등록

Nginx를 편리하게 이용하기 위해서 서비스를 등록 할 수 있다.

### systemd

```
- start & restart
- stop
- reload (configuration)
```

https://www.nginx.com/resources/wiki/start/topics/examples/initscripts/ <br>

```
systemctl start nginx
systemctl stop nginx
systemctl status nginx (상태 조회)
systemctl enable nginx (symlink 생성)
```

symlink를 생성하면 운영체제를 재시작 시켜줘야한다.

```
# Ubuntu
reboot
```

## Context

NGINX의 소스코드를 작성하기 위해서 규약(Term)을 이해해야한다.

```conf
# /etc/nginx/nginx.conf (default)

http {

  # 타입 블록
  type {}

  # 서버 블록
  server {

    listen      포트;
    server_name 도메인;
    root        공개루트 경로

    # 로케이션 블록
    location {}
  }
}
```

컨텍스트는 일반적인 프로그래밍 문법의 Scope 개념과 동일하다. <br>

-   http 컨텍스트에는 http와 관련된 것들을 기술하며
-   server 컨텍스트에는 서버 가상호스트 관련 한 것들을 기술한다.
-   location 컨텍스트에는 부모 서버로 접근하는 요청들에 관련해 기술한다.
    <br><br>

NGINX 검사는 아래 명령어로 수행한다.

```
nginx -t
```

## Directive

컴파일러가 입력을 처리하는 방법을 지정하는 언어 구조. **지시자** 라고 한다. <br>

```
# 어떤 것을 포함 시킬 지 지시하는 include
include mime.types

# 접근 기록을 지시하는 access_log
access_log /var/log/nginx/access.log
```

지시자의 종류에는 넓은 의미로 세가지를 꼽을 수 있다. <br>

### 1. Array Directive

**전역 컨텍스트에 위치하는 지시자**. <br>
기존 세팅의 오버라이딩 없이 중복 정의가 가능 하며, 모든 자식 컨텍스트에 영향을 끼친다. <br>
그리고, 그 자식 컨텍스트는 위 지시자를 다시 선언 함으로써 재정의 할 수도 있다.
<br>

### 2. Standard Directive

**전역 컨텍스트의 자식 컨텍스트 지시자**. <br>
단 한번만 선언 가능하며, 다시 선언 할 경우 오버라이딩 된다.
또한 부모 컨텍스트를 상속한다. <br>

### 3. Action Directive

**응답 또는 우회를 위한 지시자**. <br>
응답(return) 또는 우회(redirect)을 지시한다. 그리고 요청에 대한 응답(response)의 정지 또는
재작성(rewrite)은 상속이 불가하다.

```
# nginx.conf

# -- Array Directive --
access_log /var/log/nginx/access.log

# 두번 째 인수는 포맷양식 이다.
access_log /var/log/nginx/custom.log custom

http {

  server {

    # -- Standard Directive --
    access_log off

    location / {

      # -- Action Directive --
      return 200 "Hello Nginx";
    }
  }

  server {}

  server {}

  server {}
}
```

포괄적인 개념의 세부류로 나뉜다. 그렇다면 구체적인 지시자들의 종류는 무엇이 있을까?

### types

전역 블록에 선언하며 기본적으로 아래와 같이 types 블록을 선언하여 <br>
어떤 타입의 문서를 공개 할 지 선언하는 문법이다.

```
types {

  text/html;
  text/css;

  ...
}
```

또는, Nginx에서 기본적으로 제공하는 타입으로 간편하게 이용 할 수도 있다.

```
include mime.types;**
```

types {} 블록 위치에 선언하면 된다.

### location

클라이언트가 접근한 URI에 대한 전략을 기술하는 컨텍스트이다.

##### A. Prefix Match

```
location {

  location /url {

    return 200 'Nginx Prefix Match Test';
  }
}
```

**접두사에 해당되는 경로**에 액세스 할 때 리턴. <br>
('/url12345', '/url/abc'로 액세스 해도 설정한 값으로 리턴 된다.)

##### B. Exact Match

```
location {

  location = /url {

    return 200 'Nginx Exact Match Test';
  }
}
```

**정확한 경로**에 액세스 할 때 리턴.

##### C. Regex Match

```
location {

  location ~ /url[0-9] {

    return 200 'Nginx Regex Match Test';
  }
}
```

**정규식표현**에 해당되는 경로에 액세스 할 때 리턴. <br>
<small> ~ 는 정규식과 일치 할 때 리턴한다. </small><br>
<small> ^~ 는 지정한 패턴으로 시작 할때 리턴</small><br>
<small> ~\* 는 대소문자 구분없이 정규식과 일치 할 때 리턴한다.</small><br>

### rewrite

요청을 통해서 주어진 URL의 규칙을 변경해서 웹서비스를 보다 유연하게 만드는 방법.

```
server {

  # 예제1).
  # "/path1/문자열" 경로로 접근하면 "/test" 경로로 재작성.

  rewrite ^/path1/\w+ /test;

  # 예제2).
  # "/path2/문자열" 경로로 접근하면 "/test/문자열" 경로로 재작성.

  rewrite ^/path2/(\w+) /test/$1;

  # 재작성 된 경로를 확인하고 200을 응답 할 지 결정.
  location = /test {
    return 200 "hello nginx";
  }

}
```

### try_files

요청이 있을 때 **파일이 존재하면 응답하고 그렇지 않으면 다음 경로로 재작성(rewrite)** 한다.

```
server {

  try_files $uri image.png /path2 /path3;

  location = /path2 {
    return 200 "200";
  }

  location = /path3 {
    return 404 "404";
  }
}
```

위 예제를 설명하자면 <br>
첫번 째, 클라이언트가 접근한 URI($uri)가 서버에 존재하지 않으면 다음 인수로 변경. <br>
두번 째, 클라이언트가 접근한 image.png가 서버에 존재하지 않으면 다음 인수로 변경. <br>
세번 쨰, 재작성 되는건 **가장 마지막 인수**의 /path3이며 문자열 "404"를 응답한다.

### buffer_size

NGINX는 모든 요청과 응답을 RAM의 Buffer에 일시적으로 보존한다. <br>
그에 관련된 지시자들. <br>

```
client_body_buffer_size   10k;

# 최대 8M을 초과하면 413 에러를 발생시킴.
client_max_body_size      8m;

# 클라이언트로부터 요청된 헤더의 크기 1K는 대부분의 요청을 수용하기에 충분하다.
client_header_buffer_size 1k;
```

### timeout

단순하게 클라이언트를 받은 요청을 끊기 위한 지시자. 무한한 데이터 스트림으로 부터 서버를 방어하기 위함.

```
# 클라이언트 헤더와 바디를 수용하는 최대 연결 시간. (ms,s,m,h,d)
client_body_timeout   12;
client_header_timeout 12;

# 커넥션 대기시간
keepalive_timeout     15;

# 클라이언트가 언제까지 응답을 받을 수 있는가
send_timeout          10;

# 버퍼에 정적파일을 보존 해도 되는가
sendfile              on;

# 송신되는 패킷 최적화
tcp_nopush            on;
```

<small>[!] milliseconds는 생략이다.</small>

### header & expires

웹자원을 효율적으로 쓰기 위해서 캐시(cache) 기능을 이용해야한다.

```
# 캐시를 어떤식으로 쓸지 설정하는 헤더
add_header Cache-Control [public, private, no-cache, no-store ..]

# 언제 만료되는지 설정하는 헤더
expires 1M;
```

### gzip

정적자원을 응답데이터로 보낼때 압축해서 전송하는 기술. <br>

```
gzip [on|off];

# 압축 레벨이 높을 수록 서버에 과부하를 일으킴
gzip_comp_level[1~10];

# 어떤 타입을 압축할지 설정
gzip_types [text/css|text/javascript ...]

```

### worker_processes

NGINX에서 실질적인 작업을 수행하는 프로세스.

```
root@yuu2:/sites/demo# systemctl status nginx
● nginx.service - The NGINX HTTP and reverse proxy server
  Process: 30904 ExecReload=/usr/bin/nginx -s reload (code=exited, status=0/SUCCESS)
 Main PID: 852 (nginx)
    Tasks: 2 (limit: 1152)
   CGroup: /system.slice/nginx.service
           ├─  852 nginx: master process /usr/bin/nginx

           # 이 부분에 해당함.
           └─30905 nginx: worker process
```

작업 프로세스의 설정은 .conf 파일에서 지정 할 수 있다.

```
worker_processes [숫자 또는 auto]

events {
  worker_connections [한계치]
}

http {
  ...
```

그리고 최대로 연결 할 수 있는 커넥션의 수 는 **작업 프로세스 X 작업 커넥션** 이다. <br>
<small> [!] 리눅스에서는 ulimit -n 를 이용하여 한계치를 찾을 수 있다. </small>

### server_tokens

Nginx의 서버 버전을 숨길지 설정한다.

```
http {

  server_tokens off;

}
```

### X-Frame-Options

다른 웹사이트에서 iframe과 같은 코드로 참조하는 것을 방어한다.

```
server {

  add_header X-Frame Options "SAMEORIGIN";

}
```

### X-XSS-Protection

크로스 사이트 스크립팅을 방어한다.

```
server {

  add_header X-XSS-Protection "1; mode=block";

}
```

### Reverse Proxy

클라이언트로 부터 받은 요청을 다른 서버로 전달 한 뒤 그 결과 값을 클라이언트에게 전달한다.

```
server {

  location / {

    # 클라이언트에 전달되는 프록시 요청임을 뜻하는 커스텀 헤더
    proxy_set_header proxied nginx;

    proxy_pass [다른 서버의 경로]/;

  }
}
```

## Variable

```
set $var [변수];
```

#### 1. Nginx에서 제공하는 변수

```
$host 호스트명
$uri  URI
$arg  파라미터 ($arg_test -> test=1234, $arg_name -> name=가나다라)
```

그 외에는 아래 링크를 참조 할 것.
https://nginx.org/en/docs/varindex.html

```
# 예제
location /test {
  return 200 "$host\n$uri\n";
}
```

#### 2. 조건문을 이용한 간단한 예제

```
# 예제 (?api=1234 또는 ?api=가나다라를 입력해야 200을 리턴)
server {
  if ($arg_api ~ 1234|가나다라) {

    return 200;
  }
}
```

## Logging

기본적으로 NGINX에서는 요청이 왔을 때 **access.log**와 에러가 발생 했을 때 **error.log** 두가지 로그를 기록한다. <br><br>
한 편, 커스텀 로그를 기록 하는 방법과 이러한 로그를 기록 하는 행위는 서버에 부하를 일으키므로 무효화 할 수도 있다.

```
...

location /test {
  # 커스텀 액세스 로그
  access_log /var/log/nginx/커스텀파일이름아무거나.log;

  # 무효화
  access_log off;

  return 200 "Hello Nginx";
}

```

## PHP-FPM

PHP FastCGI Process Manger의 약자로, CGI보다 빠른 버전이라고 말할 수 있다. CGI란, 웹 서버에서 요청을 받아 외부 프로그램에 넘겨주면, 외부 프로그램은 그 파일을 읽어 HTML로 변환하는 단계를 거치는 것.

#### 1. 설치하기

```
# ubuntu18

> apt-get install php-fpm

> systemctl list-units | grep php
php7.2-fpm.service                                                 loaded active     running         The PHP 7.2 FastCGI Process Manager
phpsessionclean.timer                                              loaded active     waiting         Clean PHP session files every 30 mins

> systemctl status php7.2-fpm
● php7.2-fpm.service - The PHP 7.2 FastCGI Process Manager
   Loaded: loaded (/lib/systemd/system/php7.2-fpm.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-05-18 20:17:38 UTC; 3min 6s ago
```

#### 2. 설정하기

```
user [PHP-FPM과 동일한 유저명]

http {

  # 루트 페이지
  index index.php

  server {

    location ~\.php {

      # 추가된 fastcgi.conf 파일을 포함
      include fastcgi.conf;

      # UNIX Socket
      fastcgi_pass unix:/run/php/php[버전]-fpm.sock;
    }
  }
}
```

location 컨텍스트에 PHP-FPM 소켓 지시자가 추가된 것을 확인 할 수 있다.

```
# PHP-FPM 소켓 찾기
find / -name *fpm.sock
```

<small> [!] **권한** 에러가 발생 할 경우 nginx의 user를 php-fpm.sock와 동일하게 해주어야 한다. </small>

### 3. Micro Cash

NGINX에서 응답이나 요청을 주고 건낼 때 PHP-FPM Cache는 마이크로 캐시 기능으로 퍼포먼스를 향상 시킬 수 있다.<br>
http://nginx.org/en/docs/http/ngx_http_fastcgi_module.html

```
# 캐시 경로 설정
fastcgi_cache_path /tmp/nginx_cache levels=1:2 keys_zone=ZONE_1:100m inactive=60m;
fastcgi_cache_key "$scheme$request_method$host$request_uri";
add_header X-Cache $upstream_cache_status;

set $no_cache 0;

if ($arg_skipcache = 1) {
  set $no_cache = 1;
}

server {

  location ~\.php$ {

    fastcgi_cache ZONE_1;

    # 상태코드에 따른 캐싱 시간 설정
    fastcgi_cache_valid 200 60m;

    fastcgi_cache_bypass $no_cache;
    fastcgi_no_cache     $no_cache;
  }
}
```

## Dynamic Module

NGINX를 직접 설치함으로서 얻는 이익중 하나는 바로 동적모듈을 설치하여 다양한 기능을 커스터마이즈 할 수 있다는 점이다. <br>
https://docs.nginx.com/nginx/admin-guide/dynamic-modules/dynamic-modules/ <br><br>

./configure를 통해 conf-path와 module등의 환경설정을 했던 것을 기억 할 것이다. 이 과정을 통해서 Dynamic Module을 추가 할 수 있다.

```
nginx -V
```

기존의 설정을 복사 한 후 **--modules-path=[모듈폴더위치]** 와
추가할 모듈을 추가한 후 컴파일하도록 하자. <br><br>

```
load_module [모듈폴더의 .sock]

http {}
```

<small>[!] NGINX의 환경에 따라 모듈 경로가 /usr/local/nginx로 설정 되는 경우가 있었다. <br>--modules-path=[모듈폴더경로] 대신에 --prefix=[모듈폴더상위경로] 로 수정하면 된다.</small>

## 9. HTTP2

NGINX는 HTTP2 모듈을 제공한다. <br>
문자열 기반으로 전송하는 HTTP1에 비하여 클라이언트-서버간의 전송 퍼포먼스를 향상 시킬 수 있다.

<small>**[!] NGINX HTTP2 모듈을 추가해야한다.**</small><br>
<small>**[!] HTTP2는 SSL 인증서가 필요하다.**</small>

```
server {

  listen 443 ssl http2;

  ssl_certificate     [인증서 경로]
  ssl_certificate_key [인증키 경로]

}
```

http://nginx.org/en/docs/http/ngx_http_v2_module.html

<br>

#### Server Push

인터넷 상에서 어떤 전송 요청이 중앙 서버에서 시작되는 정보 전달 방식.

```
# 테스트 툴
apt-get install nghttp2-client

nghttp -nys [URL]
```

asterisk가 붙어 있으면 서버 푸시가 된 상태.

```
# nginx.conf

server {

  location [경로] {
    http2_push [정적자원]
    http2_push [정적자원]
    ...
  }
}
```

## HTTPS

HTTP에 보안을 덧 붙인 형태. 오늘날에 HTTPS를 제공하는 방식은 두가지가 있다. <br>

<small>첫째, HTTP에서 HTTPS로 리다이렉팅</small> <br>

```
server {
  listen 80;
  return 301 https://$host/$request_uri;
}

server {
  listen 443 ssl https;
}
```

<small>둘째, HTTPS만 제공하는 것.</small><br><br>
당연한 소리 인 것 같지만 당연한 소리 맞다...

HTTPS를 제공하기 위해서는 다음과 같은 설정을 해야한다.

```
server {

  # TLS
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2

  # Cipher Suits 최적화
  ssl_prefer_server_ciphers on;

  # 헬만파라미터(DH Parameter) 이용
  ssl_ciphers [ 헬만파라미터 ];

  ssl_dhparam [ dhparam이 있는 경로 ];

  # HTTPS를 강제하기 위한 HSTS 적용. (max-age : 기한 1년)
  add_header Strict-Transport-Security "max-age=31356000" always;

  # SSL 세션 캐시
  # builtin은 worker process와 관계가 있고 shared는 메모리 성능과 관련이 있다.
  ssl_session_cache shared:SSL:40m;
  ssl_session_timeout 4h;
  ssl_session_ticket on;

  ...
}
```

<small>[!] ssl_ciphers '헬만파라미터'는 서버성능에 비례하게 높이도록 해야한다. 보안수준이 복잡하면 서버에 부하를 일으킨다.</small><br>

<small>[!] dhparam 키 얻는 법 'openssl dhparam -out [경로]'</small><br><br>

http://nginx.org/en/docs/http/configuring_https_servers.html

## Rate Limiting

서버에 트래픽이 몰릴 경우 커넥션을 거부하기 위한 방법. <br>
https://www.nginx.com/blog/rate-limiting-nginx/ <br>

```
# 우선 테스트를 위한 벤치마킹 툴 설치
apt-get install siege

# -r: 요청 횟수 / -c : 커넥션
siege -v -r 2 -c 5 [ 경로 ]

# 2 x 5 = 10회의 트랜잭션이 생성됨

HTTP/1.1 200     0.01 secs:   12627 bytes ==> GET  /index.html
HTTP/1.1 200     0.01 secs:   12627 bytes ==> GET  /index.html
HTTP/1.1 200     0.02 secs:   12627 bytes ==> GET  /index.html
HTTP/1.1 200     0.01 secs:   12627 bytes ==> GET  /index.html
HTTP/1.1 200     0.02 secs:   12627 bytes ==> GET  /index.html
HTTP/1.1 200     0.01 secs:   12627 bytes ==> GET  /index.html
HTTP/1.1 200     0.01 secs:   12627 bytes ==> GET  /index.html
HTTP/1.1 200     0.02 secs:   12627 bytes ==> GET  /index.html
HTTP/1.1 200     0.02 secs:   12627 bytes ==> GET  /index.html
HTTP/1.1 200     0.01 secs:   12627 bytes ==> GET  /index.html
```

커넥션 제한을 위한 설정도 필요하다.

```
# nginx.conf

http {


  limit_req_zone $request_uri zone=TESTZONE:10m rate=1r/s burst=5 nodelay;

  location / {
    limit_req_zone=TESTZONE;
  }
}
```

<small>rate : 60r/m 1분에 60번의 요청만 수행, 1r/s 1초에 1번의 요청만 수행</small><br>
<small>$server_name : 서버 명을 기준으로 제한</small><br>
<small>$request_uri : uri를 기준으로 제한</small><br>
<small>$binary_remote_addr : IP 를 기준으로 제한. 각각의 커넥션은 고유의 아이피를 가진다. brute force attack에 효과적 </small><br>
<small>burst : 즉시 거절이 아닌 버퍼에 보존하고 1초 한번씩 지연 응답한다.</small><br>
<small>nodelay : 1초당 지연 응답을 즉시 응답으로 설정한다.</small>

## Basic Auth

특정 경로에 접근 할 때 권한이 있는 유저에게만 접근을 허용하게 함 <br>
https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/ <br>

```
apt-get install apache2-utils

# -c : 신규생성을 의미한다.
htpasswd -c [DIR] [USER_NAME]
```

이후 암호를 입력하면 경로에 암호화 파일이 생성 된다.

```
# nginx.conf

location [URL] {
  auth_basic           [보여줄 메시지 아무거나 입력~?];
  auth_basic_user_file [DIR];
}
```

## Load Balancer

클라이언트들의 요청을 여러 앱서버로 분산하는 방법

```
http {

  upstream php_servers {

    # ip_hash;       처음 서버가 다운되면 다음 서버가 응답..
    # least_conn;    부하가 가장 적은 서버가 응답..
    server localhost:10001;
    server localhost:10002;
    server localhost:10003;
  }

  # HTTP
  server {

    listen 80;

    proxy_pass http://php_servers;
  }
}
```

## Reference

http://nginx.org/ <br>
https://docs.nginx.com/ <br>
