---
title: JAVA 인터페이스란 무엇인가
publishedAt: 2020-01-02
---

# JAVA 인터페이스란 무엇인가

```java
/**
 * 인터페이스는 기본적으로 [public] 이다.
 */
public interface 인터페이스 {
  /**
   * 상수 필드 (Constant Field)
   * [default = public static final]
   */
  public static final 타입 필드 = 0;

  /**
   * 추상 메소드 (Abstract Method)
   * [default = public abstract]
   */
   public abstract 리턴타입 메소드();

  /**
   * 디폴트 메소드 (Default Method)
   * [default = public]
   */
   public default 리턴타입 메소드() {}

  /**
   * 정적 메소드(Static Method)
   * [default = public]
   */
   public static 리턴타입 메소드() {}
}
```

-   추상 메소드
    : 실제 실행부는 구현 객체가 가지고 있다.
-   디폴트 메소드
    : 인터페이스를 확장시켜 기능을 추가하기 위한 공통 인스턴스 메소드이다.
-   정적 메소드
    : 객체가 없어도 인터페이스만으로 호출 가능하다.

## 익명 구현 객체

구현 클래스를 만들어 사용하는게 보편적이고 재사용 가능하지만
일회성으로 쓰일 클래스를 작성하는건 비효율적이다. 소스를 작성하지 않아도 구현 객체를 만들수 있는 방법이 있는데
이것이 바로 익명 구현 객체이다.

```
인터페이스 변수 = new 인터페이스() {
    // 인터페이스에 선언된 추상 메소드의 실체 메소드 선언.
};
```

## 중첩 인터페이스

UI 프로그래밍을 할 때 이벤트처리용도로 자주 사용한다.

```java
public class Button {

  public OnClickListener onClickListener;

  public void setOnClickListener(OnClickListener listener) {
    this.listener = listener;
  }

  public void touch() {
    listener.onClick();
  }

  // 중첩 인터페이스
  interface OnClickListener {
    void onClick();
  }
}
```

```java
public class CallListener implements Button.OnClickListener {
  @Override
  public void onClick() {
    System.out.println("전화를 겁니다.");
  }
}
```

```java
public class MessageListener implements Button.OnClickListener {
  @Override
  public void onClick() {
    System.out.println("메시지를 보냅니다.");
  }
}
```

```java
public class ButtonExample {
  public static void main(String[] args) {

    Button btn = new Button();

    btn.setOnClickListener(new CallListener());
    btn.touch(); // 전화를 겁니다.

    btn.setOnClickListener(new MessageListener());
    btn.touch(); // 메시지를 보냅니다.
  }
}
```
