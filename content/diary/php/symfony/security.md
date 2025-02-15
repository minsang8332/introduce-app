---
title: PHP/Symfony Framework 시큐리티
publishedAt: 2020-01-26
---

# PHP/Symfony Framework 시큐리티

## 회원등록 (Registration)

```
bin/console make:user
```

```
composer require symfony/orm-pack symfony/form symfony/security-bundle symfony/validator
```

```php
// 유저 엔티티
    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotBlank()
     * @Assert\Email()
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank()
     * @Assert\Length(max=64)
     */
    private $password;
```

```php
// 폼 타입
public function buildForm(FormBuilderInterface $builder, array $options) {
    $builder
        ->add('email', EmailType::class)
        ->add('password', RepeatedType::class, [
            'type' => PasswordType::class,
            'first_options'  => array('label' => 'Password'),
            'second_options' => array('label' => 'Repeat Password'),
        ])
        ->add('save', SubmitType::class, ['label' => 'Register'])
        ;
    }
```

```php
// 컨트롤러 메소드
$user = new SecurityUser();

$form = $this->createForm(RegisterUserType::class, $user);
$form->handleRequest($request);

if($form->isSubmitted() && $form->isValid()) {

   $user->setPassword(
        $passwordEncoder->encodePassword($user, $form->get('password')->getData())
   );

   $user->setEmail($form->get('email')->getData());

   $entityManager = $this->getDoctrine()->getManager();
   $entityManager->persist($user);
   $entityManager->flush();

   return $this->redirectToRoute('home');
}
```

## 로그인 (Login)

```yaml
# security.yaml

form_login:
    login_path: LOGIN_PATH
    check_path: CHECK_PATH

    username_parameter: 'email'
    password_parameter: 'password'
    csrf_token_generator: security.csrf.token_manager
```

```twig
<form method="post">
    {% if error %}
        <div class="alert alert-danger">{{ error.messageKey|trans(error.messageData, 'security') }}</div>
    {% endif %}

    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label for="inputEmail" class="sr-only">Email</label>
    <input type="email" value="{{ last_username }}" name="email" id="inputEmail" class="form-control" placeholder="Email" required autofocus>
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required>

    <input type="hidden" name="_csrf_token"
           value="{{ csrf_token('authenticate') }}"
    >

    <button class="btn btn-lg btn-primary" type="submit">
        Sign in
    </button>
</form>
```

```php
// 컨트롤러
public function login(AuthenticationUtils $authenticationUtils) {

    $error = $authenticationUtils->getLastAuthenticationError();
    $lastUsername = $authenticationUtils->getLastUsername();

    return $this->render('security/login.html.twig', [
      'last_username' => $lastUsername,
      'error' => $error
    ]);
}
```

## 로그아웃 (Logout)

```yaml
# security.yaml
logout:
    path: /LOGOUT_PATH
    target: /REDIRECT_PATH
```

```twig
{% if app.user %}
    <a href="{{ path('logout') }}">LOGOUT</a>
{% endif %}
```

## CSRF

```twig
<input type="hidden" name="_csrf_token" value="{{ csrf_token('authenticate') }}" >
```

```yaml
# security.yaml

form_login:
    csrf_token_generator: security.csrf.token_manager
```

## 기억하기 (Remember Me)

```yaml
# security.yaml

remember_me:
    secret: '%kernel.secret%'
    lifetime: 604800 # 1 week in seconds
    #always_remember_me: true
    path: /
```

: Template

```twig
<input type="checkbox" name="_remember_me"> Remember me
```

## 인가 (Authorization)

#### 지역 범위

```php
// 컨트롤러 샘플

/**
 *  @Security("has_role('ROLE_ADMIN')")
 */
public function index(Request $request) {
    // 생략
}
```

#### 전역 범위

```yaml
# security.yaml
# /admin 으로 시작되면 관리자만 접근 할 수 있다.

access_control:
    - { path: ^/admin, roles: ROLE_ADMIN }
```

#### 도메인 계층

```php
$this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY')

$this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED')

// 관리자 외 접근 시 예외발생
$this->denyAccessUnlessGranted('ROLE_ADMIN')

```

#### 웹 계층

```
{% is_granted('ROLE_ADMIN') %}
{% endif %}

{% is_granted('IS_AUTHENTICATED_FULLY') %}
{% endif %}

...
```

## 시큐리티 검사(Security Check)

```
composer require sensiolabs/security-check
```

```
bin/console security:check
```
