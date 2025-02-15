# Translation
Updated 2019.12.17.Tue
```
composer require symfony/translation
```
```yaml
# translation.yaml

framework:

    default_locale: '%locale%'

    translator:
        #  언어 파일이 있는 디폴트 디렉토리
        default_path: '%kenel.project_dir%/translations'

        fallbacks:
            - '%locale%'
```
```yaml
# services.yaml

    parameters:
        # ...
        # 지정할 언어 
        locale: 'en'
```
## 1. 템플릿에서는 ..
```twig
<html lang="{{ app.request.locale }}"></html>
```
: %locale%에 해당하는 언어셋이 지정된다.

```twig
<html lang="{{ app.request.locale }}">

{% trans %}

{% endtrans %}

</html>
```
: {% trans %} 안의 내용은 'messages.xx.yaml'의 키값으로 변환된다.

##
```yaml
# messages.en.yaml

some:
    key: Hello <b>Symfony</b>
```
: 계층 형식으로 이용하고 싶은데 ...
```twig
{{ some.key|trans }}
```
: 템플릿에서 컴마로 사용하면 된다!
## 
```twig
{{ some.key|trans|raw }}
```
: raw를 사용한다면 html 태그를 반영해서 출력 할 수 있다.
## 2. 컨트롤러에서는 ..
```php
// 컨트롤러 샘플

use Symfony\Component\Translation\TranslatorInterface;

/**
 * @Route()
 */
public function index(TranslatorInterface $translator) {

// messages.xx.yaml의 'some.key'를 번역한다.
$message = $translator->trans('some.key');

}
```
## 3. 경로를 통해 국적별로 분기하기!
```yaml 
# annotations.yaml

prefix:
    en: '' # 기본설정
    ko: '/ko'
    jp: '/jp'

    # ...
```
: 접두사로 설정되는 경로.
```php
// 컨트롤러 샘플
/**
 * @Route(
 * "en": "/test",
 * "ko": "/test",
 * "jp": "/test"
 * }, name="test", methods={"GET", "POST"})
 */
public function index() { // ... }
```
: '/ko/test'로 접속하면 한국어로 번역이 되고, '/jp/test'로 접속하면 일본어로 번역된다.
## 복수화(Pluralization)
```php
// 컨트롤러 샘플
return $this->render(
    'count' => $number
);
```
```yaml
# messages.xx.yaml

test: "{0}A|{1}B|{2}C|{3}D|{4}E"
```
: 숫자에 해당하는 텍스트가 출력된다. 예를 들면, 'count'가 0이면 A가 출력된다.