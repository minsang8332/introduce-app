---
title: PHP/Symfony Framework 테스트하기
publishedAt: 2019-12-31
---

# PHP/Symfony Framework 기능테스트

## 개요 (Summary)

-   테스트 실행

```
bin/phpunit
```

-   테스트 설치

```
composer require --dev symfony/test-pack
```

```
bin/console make:unit-test
bin/console make:functional-test
```

-   테스트 케이스 작성

```php
use PHPUnit\Framework\TestCase;

class SampleControllerTest extends WebTestCase {

    public function testSomething() {

        $client = statc::createClient();
        $crawler = $client->request('GET', '/')

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'hello World');

    }
}
```

## 예제

#### A. 검증 관련 메소드

```php

// 매개변수가 TRUE인지 검증
assertTrue($client->getResponse()->headers->contains('Content-Type', 'application/json'), 'MESSAGE');

assertTrue($client->getResponse()->isSuccessful());

assertTrue($client->getResponse()->isNotFound());

// 매개변수들이 같은지 검증
assertEquals($a, $b);

// 매개변수들이 같은지 검증
assertSame(200, $client->getResponse()->getStatusCode());

// 매개변수가 있는지 검증
assertContains('Hello World', $crawler->filter('h1')->text());

assertContains('foo', $client->getResponse->getContent());

// 상대 매개변수보다 많은지 검증
assertGreaterThan(0, $crawler->filter('html:contains("Hello World")')->count());

// 카운트한 매개변수 개수 검증
assertCount(0, $crawler->filter('h1'));

```

#### B. 클릭 예제

```php
$link = $crawler
    ->filter('a:contains("login")')

    ->link();

$crawler = $client->click($link);

$this->assertContains('Remember me', $client->getResponse()->getContent());
```

: 클릭 후 'Remember me'라는 텍스트가 포함되어 있는지 검증

#### C. 폼 작성 예제

```php
$form = $crawler->selectButton('Sign in')->form();
$form['email'] = 'user@user.com';
$form['password'] = 'passw';

$crawler = $client->submit($form);
$crawler = $clinet->followRedirect();

$this->assertEquals(1, $crawler->filter('a:contains("logout")')->count());
```

: 로그인 후 'logout' a태그 갯수가 1개인지 검증

#### D. 데이터 공급자 (Data Providers)

```php
// 수급자 컨트롤러 메소드
/**
 * @dataProvider provideUrls
 */
public function testSomething($url) {

    $client = static::createClient();
    $crawler = $client->request('GET', $url);

    $this->assertTrue($client->getResponse()->isSuccessful());
}
```

```php
// 공급자 메소드
public function provideUrls() {
    return [
        ['/home'],
        ['/login']
    ];
}
```

## 테스트를 위한 데이터베이스 설정

## 격리 (Isolation)

```php
private $entityManager;

public function setUp() {

    parent::setUp();

    $this->client = static::createClient();

    $this->entityManager = $this->client->getContainer()->get('doctrine.orm.entity_manager');

    $this->entityManager = beginTransaction();

    $this->entityManager->getConnection()->setAutoCommit(false);

}
```

```php
/**
 * 파괴하다 ...
 * @access public
 */
public function tearDown() {

    parent::tearDown();

    // $this->entityManager->rollback();

    $this->entityManager->close();
    $this->entityManager = NULL;
}
```

## 취재 보고 (Coverage Report)

-   설치

```
sudo apt-get install php-xdebug
```

-   실행

```
phpunit --coverage-text
```

## 유닛 테스트 예제

```php
use PHPUnit\Framework\TestCase;

// 비지니스 로직등 국소적인 부분만을 테스트 한다.
class SampleTest extends TestCase {

    public function test1() {}
    public function test2() {}
    // ... 메소드 순서대로 테스트를 실행한다.
}
```
