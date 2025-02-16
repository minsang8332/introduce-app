---
title: JAVA 스레드란 무엇인가
publishedAt: 2022-07-01
---

# JAVA 스레드란 무엇인가

스레드가 무엇인지 이해하기 쉽게 요약했다.

```java
Thread threadA = new Thread(() -> {
  System.out.println("A");
});
Thread threadB = new Thread(() -> {
  System.out.println("B");
});
threadA.start();
threadB.start();
```

하나의 프로세스에서 여러 작업을 동시에 수행하도록 한다.

## 동시성과 병렬성

동시성은 하나의 코어에서 다중 스레드가 번갈아가며 실행하는 성질.  
병렬성은 여러개 코어에서 단일 스레드를 동시에 실행하는 성질.

## 메인 스레드

```java
public static void main(String[] args) {
  System.out.println(Thread.currentThread());
}
우리가 흔히 사용하고 있는 main 함수는 메인스레드이다.
```

## 작업 스레드

### Thread 직접 생성

```java
Thread thread = new Thread(Runnable runnable)
```

Runnable은 인터페이스이다. 작업스레드 객체를 만들기 위해서 구현 클래스는 run 함수를 재정의하여야 한다.

```java
// 익명객체로 생성하기
Thread thread = new Thread() {
  @Override
  public void run() {
    ...
  }
};
// 람다식으로 생성하기
Thread thread = new Thread(() -> {
  ...
});

// Runnable 구현객체로 생성하기
class WorkThread implements Runnable {
  public void run() {
    ...
  }
}
```

## 스레드 풀

| 메소드명                          | 초기 스레드 수 | 코어 스레드 수 | 최대 스레드 수    |
| --------------------------------- | -------------- | -------------- | ----------------- |
| newCachedThreadPool()             | 0              | 0              | Integer.MAX_VALUE |
| newFixedThreadPool(int n Threads) | 0              | nThreads       | nThreads          |

병렬 작업처리를 작업 큐에서 처리 할 수 있도록 자바는 java.util.concurrent 패키지의 ExecutorService 인터페이스와 Executors 클래스를 제공한다. <br>

ExecutorService 구현 객체는 다음과 같이 얻을 수 있다.

```java
ExecutorService executorService = Executors.스레드풀 메소드(매개변수)
```

매개변수에는 CPU의 코어 갯수 만큼 정의 할 수도 있는데

```java
Runtime.getRuntime().availableProcessors()
```

를 이용하면 CPU의 코어 값을 이용하여 스레드 풀을 생성 할 때 매개변수로 건낼 수 있다.

## 스레드 이름

스레드는 고유의 이름을 가지고 있다. 로깅 할 때 유용하게 사용함.

```java
...
@Overirde
public void run() {
  setName("Thread-A")
  System.out.println(getName());
}
```
