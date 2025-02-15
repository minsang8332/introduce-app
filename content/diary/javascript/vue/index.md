---
title: Vue 개발자라면 알아야 할 내용들
publishedAt: 2022-05-02
---

# Vue 개발자라면 알아야 할 내용들

신입 때 공부했던 내용들 이젠 이미 다 아는 것들이지만 정리노트를 업로드해 둔다.

## 개요

vue.js 학습노트

## 시작하기

```sh
# 번들러 설치

npm install -g @vue/cli
yarn global add @vue/cli

vue create [프로젝트]
```

```js
// es6 이상
import { createApp } from 'vue';
import App from 'App.vue';
const app = createApp(App);
app.mount('#app');

// 그 외
var vue = new Vue({
    el: '#app',
    ...
});
```

## [computed]

> 메소드 와 유사하나 다른점은 <캐싱>

[computed]: (https://kr.vuejs.org/v2/guide/computed.html)

<p>computed 프로퍼티는 methods 와 같은 듯 보이나 다른 점이 있음</p>
<p><b>의존하고 있는 데이터가 변경되는 경우에만 재연산</b>된다는 점이다.</p>
<p>위 예제에서는 <i>this.answer</i> 를 의존하고 있는 데 이 값이 변경되는 경우에만 <i>myanswer</i>가 실행된다.</p>
<p>computed 프로퍼티를 사용 할 때에는 괄호를 붙여서는 안된다. 마치 데이터인것 처럼 사용해야한다. (괄호를 붙이지 말 것)</p>
<p>무언가를 출력하고자 할 때 주로 사용한다. 왜냐하면 캐싱되어 필요할 때에만 동작하기 때문에 methods 보다 성능상 낫기 때문이다.</p>

```html
<template>
    <div>
        <label>당신의 이름은?</label>
        <input v-model="myname" />
        <h1>{{ myname }}</h1>
    </div>
    <div>
        <label>레퍼런스 찾아보면 되는데 왜 필기하나요?</label>
        <input v-model="answer" />
        <h1>{{ myanswer }}</h1>
    </div>
</template>
<script>
    export default {
        data() {
            myname: '유민상',
            answer: '',
        },
        computed: {
            myanswer() {
                return '제가 입력한 값은: ' + this.answer;
            }
        }
    }
</script>
```

## 생명주기 (LifeCycle)

```
createApp({...})
    |
beforeCreate()
    |
created() ----------                        updated()               unmounted()
    |               |                           |                       |
beforeMount()   [템플릿 컴파일]             beforeUpdate()          beforeUnmount()
    |               |                           |                       |
mounted()-----------> [뷰 객체 생성] ----> [데이터 변경시] -------> 뷰 객체 소멸

```

## [Component]

> 재사용 가능한 스크립트

[Component]: (https://kr.vuejs.org/v2/guide/components-slots.html)

### 전역 컴포넌트

```js
// main.js
import ExpComponent from './components/ExpComponent.vue';

app.component('exp-component' ExpComponent);
app.mount('#app');
```

### 지역 컴포넌트

> 인스턴스 범위에서만 사용가능한 컴포넌트

```js
import ExpComponent from './components/ExpComponent';

export default () {
    components: {
        ExpComponent
    },
}
```

### [props]

> 컴포넌트에 데이터 전달

[props]: (https://kr.vuejs.org/v2/guide/components-props.html)

```html
# App.vue
<custom-button link to="/contact"></custom-button>

# CustomButton.vue
<template>
    <router-link v-if="link" :to="to">{{ label }}</router-link>
    <button v-eles>{{ label }}</button>
</template>
<script>
    export default {
        props: {
            link: {
                type: Boolean,
                required: false,
                default: false,
            },
            label: {
                type: String,
                required: false,
                default: '',
            },
            to: {
                type: String,
                required: false,
                default: '/',
            },
        },
    }
</script>
```

<p>💡 link 속성을 붙이게 되면 true 가 되어 router-link 로 분기된다. </p>

### 동적 컴포넌트

> 분기에 따른 컴포넌트 렌더링이 필요 할 때

```html
<template>
    <button @click="setSelected('A')">A</button>
    <button @click="setSelected('B')">B</button>
    <!-- 동적으로 A 또는 B 컴포넌트를 렌더링 -->
    <component :is="selected"></component>
</template>

<script>
    import A from './components/A.vue';
    import B from './components/A.vue';
    export default () {
        components: {
            A, B
        },
        data() {
            selected: null,
        },
        methods: {
            setSelected(selected) {
                this.selected = selected;
            }
        }
    }
</script>
```

### keep-alive

> unmount 되어도 컴포넌트를 기억하기

<p>기본적으로 컴포넌트가 교체 될 때 (updated) DOM의 노드가 제거된다.</p>
<p>vue 는 DOM 노드를 기억하고 싶을 때 'keep-alive' 태그를 이용하여 캐싱하도록 권장한다.</p>

```js
// App.vue
<template>
    <keep-alive>
        <!-- A 컴포넌트의 데이터는 캐싱 될 것-->
        <A />
    </keep-alive>
</template>

// A.vue
// 동적 컴포넌트를 통해 B 컴포넌트로 교체하였을 경우 A 컴포넌트가 제거되므로
// B -> A 로 다시 이동할 때 모든 노드는 새로이 생성되어 사실상 필드의 값은 사라짐
// 허나 keep-alive 태그 아래의 입력 값은 캐싱되게금 할 수 있다!
<template>
    <div>
        <input type="text" />
    </div>
</template>
```

### teleport

> 렌더링 되었을 때 특정 DOM에 위치시키기

```js
// teleport 태그는 DOM 이 렌더링 될 때 특정 선택자의 자식태그로 생성되게 한다.
<teleport to="#app">
    <template>선택자 아래에 렌더링 될 거야 #app 이니까 id가 app인 html 태그 하에 출력 될 것</template>
</teleport>
```

### scoped style

> 컴포넌트 단위 스타일시트

```html
<style scoped>
    ...;
</style>
```

### <b>slot</b>

> 컴포넌트에 HTML 끼워넣기

```js
// A.vue
// 만약 slot이 하나라면 default 슬롯이므로 v-slot 지시자를 생략해도 좋다.
<B>
    <template v-slot:default>
        <h1>슬롯1</h1>
    </template>
</B>

// B.vue
<template>
    <slot></slot>
</template>
```

<p>💡 이름 없는 슬롯은 자동으로 default 슬롯이 된다.</p>
<p>💡 v-slot 지시자는 # 으로 축약 할 수 도 있다. (v-slot:default -> #default)</p>

### name

```js
// v-slot 지시자를 통해서 어느 슬롯에 노드 앨리먼트를 넣을지 정할 수 있다.
// A.vue
<B>
    <template v-slot:named1>
        <h1>슬롯1</h1>
    </template>
    <template v-slot:named2>
        <h1>슬롯2</h1>
    </template>
</B>
// B.vue
<template>
    <slot name="named1"></slot>
    <slot name="named2"></slot>
</template>
```

### slotProps

> 슬롯의 데이터 바인딩

```html
// A.vue
<b>
    <template v-slot:default="slotProps">
        <h1>{{ slotProps.title }}</h1>
    </template>
</b>
// B.vue
<template>
    <ul>
        <li v-for="book in boks" :key="book.id">
            <slot></slot>
        </li>
    </ul>
</template>

<script>
    export default {
        data() {
            return {
                books: [
                    { id: 0, title: '미움받을 용기' },
                    { id: 1, title: '손자병법' },
                ],
            }
        },
    }
</script>
```

### $slots

> 슬롯 객체 목록

```html
// B.vue
<template>
    <slot name="named1"></slot>
    <slot name="named2"></slot>
    <slot></slot>
</template>
<script>
    export default {
        mounted() {
            // 컴포넌트가 마운트 될 때마다 콘솔을 찍게 될건데
            // 만약, 해당 슬롯에 아무런 템플릿이 안꽂히게 된다면
            // undefined 로 처리된다.
            console.log(this.$slots.named1)
            console.log(this.$slots.default)
        },
    }
</script>
```

## [Router]

> 라우터

[Router]: (https://router.vuejs.org/kr/)

### 설치하기

```sh
npm i vue-router
npm i vue-router@next
vue add router
```

Vue Router 버전에 따라 사용법이 상이하겠지만 Vue3 기준으로 기본적인 사용방법은 다음과 같다.

```js
import {createRouter, createWebHistory} from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    // 라우트 데이터가 들어가는 영역
    routes: [
        ...
    ],
    // router-link 에서 생성되는 a 태그 클래스명을 커스터마이징
    linkActiveClass: 'active',
});

app.use(router)
app.mount('#app');
```

💡 [createRouter](https://next.router.vuejs.org/guide/migration/)메소드는 Vue2 에서 new Router() 에 해당한다.  
💡 [createWebHistory](https://router.vuejs.org/kr/guide/essentials/history-mode.html) 메소드는 history 인자에 할당하는 모드 중에 HTML5 모드에 해당한다.

### 일반 라우트

**routes** 인자에 주소 객체를 할당하면 된다. 우선 간단한 메인 페이지를 예로 들어보자

```js
/*
    name:      라우트 객체의 명칭이자 식별키
    redirect:  path 값에서 redirect 값으로 리다이렉트 한다
    alias:     alias 값으로 와도 path 값으로 인식하게 한다
    meta:      아무 값이나 담아두고 사용 할 수 있다. (주로 네비게이션 가드에서 사용)
    component: router-view 에서 보여줄 컴포넌트
*/
{
    name: 'root',
    path: '/home',
    redirect: '/'
    alias: 'house',
    meta: {
        first_name: 'MINSANG',
        last_name: 'YU',
    },
    component: HomeComponent,
},

```

```html
<template>
    <nav>
        <router-link to="/home"><router-link>
    </nav>
    <main>
        <router-view></router-view>
    </main>
</template>
```

### 동적 라우트

보편적으로 자원주소는 (product/101, product/102) ... 와 같은 형태를 지니고 페이지들이 있다.  
흔히 **상세** 페이지라고들 하는데 끝자락의 숫자는 동적으로 변하는 ID 일 것이다.  
위와같은 페이지는 어떻게 구성해야 할까?

```js
/*
    props: 파라미터(params) 에 해당하는 값(:id)을 props로 받을지 여부.
    components: 여러개의 router-view 를 구성 할 때 사용
                ex). <router-view name="category"></router-view>
*/
{
    name: 'product-detail',
    path: '/product/:id',
    components: {
        default: ProductDetail,
        category: CategoryList,
    },
    props: true,
}
```

https://router.vuejs.org/kr/guide/essentials/dynamic-matching.html

### 중첩 라우트

자원주소로 접근하면 router-view 에서 컴포넌트를 렌더링 하는 것을 알고 있다. 그러나
**children** 에 속하는 컴포넌트까지 보여주지 않는다.  
그러므로, 부모컴포넌트 템플릿에서 한번 더 router-view 태그를 선언해야 한다.

```js
{
    name: 'home',
    path: '/home',
    component: HomeComponent,

    children: [
        { name: 'product-list', path: '/products', component: ProductList },
        { name: 'category-list', path: '/categories', component: CategoryList },
    ],
},

```

https://router.vuejs.org/kr/guide/essentials/nested-routes.html

### 스크롤 동작

라우트가 변경될 때마다 스크롤을 제어할 때 유용하다.

```js
const router = createRouter({
    routes: [
        ...
    ],

    scrollBehavior(to, from, savedPosition) {
        // 뒤로가기를 할 경우 savedPosition 가 존재 할 것. 이 경우 스크롤 위치로 이동
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0 }; // 아니면 상단으로 이동
    }
})
```

https://router.vuejs.org/kr/guide/advanced/scroll-behavior.html

### 네비게이션 가드

접근을 제어 할 때 주로 사용한다.  
라우팅 전체 (전역) 정의는 _**beforeEach**_, _**afterEach**_ 을 사용한다.

```js
const router = createRouter({ ... });

// 라우트가 변경되기 전 동작
router.beforeEach((to, from, next) => {
    to.name === 'secret' ? next(false) : next(true);
});

// 라우트가 변경된 후 동작
router.afterEach((to, from) => {
)};
```

_**beforeEnter**_ 라우트마다 개별적으로 사용 할 수도 있을 것이다.

```js
routes:[
    {
        name: 'secret',
        path: '/secret'
        ...
        beforeEnter: (to, from, next) => {
            // ...
        },
    }
]
```

더 나아가 컴포넌트 내부에서도 정의 할 수 있다.  
_**beforeRouteEnter**_, _**beforeRouteUpdate**_, _**beforeRouteLeave**_

```js
export default {
    // 라우트가 생성되어 진입 직전
    beforeRouteEnter() {
        console.log('before route enter');
    },
    // 라우트가 변경되기 전
    beforeRouteUpdate() {
        console.log('before route update');
    },
    // 다른 페이지로 이동하기전
    beforeRouteLeave(to, from, next) {
        console.log('before route leave');
    },
},

```

https://router.vuejs.org/kr/guide/advanced/navigation-guards.html

## 트랜지션

vue 지시자 중 _**transition**_ 을 이용해서 css의 애니매이션과 트랜지션을 다룰 수 있다.

```html
<transition>
    <h1>Hello Vue.js</h1>
</transition>
```

#### 생명주기

애니매이션에는 생명주기가 존재한다.  
[beforeMount] -> [mounted] -> [beforeUnmount] -> [mounted] 순으로 엘리먼트가 생성되었다가 사라지는 것은 이미 알고있을 것이다.

각 화살표에 해당하는 지점 사이에서 애니매이션이 동작하게 되는데 이를 위한 특별한 클래스명이 존재한다. 그것은 바로 _**v-enter-\***_ 와 _**v-leave-\***_ 이다.

```html
<style scoped>
    /* mount 가 되지 않았을 때 (시작) */
    .v-enter-from {
    }
    /* mount 될 때 까지 (시작 - 끝) */
    .v-enter-active {
        animation: my-animation 0.5s ease-out forwards;
    }
    /* mount 가 되기 직전 (끝) */
    .v-enter-to {
    }
    /* unmount 가 되지 않았을 때 (시작) */
    .v-leave-from {
    }
    /* unmount 될 때 까지 (시작 - 끝) */
    .v-leave-active {
        animation: my-animation 0.5s ease-in;
    }
    /* unmount 가 되기 직전 (끝) */
    .v-leave-to {
    }
</style>
```

### 커스텀 트랜지션

transtion 지시자의 속성으로 _**name**_ 에 값을 건내면 특별한 트랜지션을 만들 수 있다.  
그리고 스타일시트에서는 name 으로 시작하는 생명주기 클래스를 추가해야 한다.

예를 들어, 아래의 예시처럼 name 을 minsang 으로 하였을 경우 minsang-enter-* 또는 minsang-leave-*을 만들어서 트랜지션을 동작하게 할 수 있다.

```html
<transition name="minsang">
    <h1>내 이름은 민상</h1>
</transtion>

<style scoped>
    .minsang-enter-active {
        animation: measang 0.3s ease-out forwards;
    }
    .minsang-leave-active {
        animation: measang 0.3s ease-in;
    }
    @keyframes measang {
        0% {
            transform: translateY(0) scale(1);
        }
        100% {
            transform: translateY(100px) scale(2);
        }
    }
</style>
```

그리고 직접 속성에다가 클래스명을 넣어주는 방법도 있다.

```html
<transition enter-acitve-class="minsang-enter-active" leave-active-class="minsang-leave-active">
    <h1>내 이름은 민상</h1>
</transition>
```

### 트랜지션 자식요소

트랜지션은 기본적으로 여러개의 자식에 적용 할 수 없다. 오직 한개만 적용 가능하다.

```html
<transition enter-acitve-class="minsang-enter-active" leave-active-class="minsang-leave-active">
    <h1>내 이름은 민상</h1>
    <h1>h1 태그가 두개이니 트랜지션이 적용되지 않아</h1>
</transition>
```

그러나, 분기가 있다면 자식요소를 여러개가 있어도 Vue 가 알아서 판단해준다.

```html
<transition enter-acitve-class="minsang-enter-active" leave-active-class="minsang-leave-active">
    <h1 v-if="true">내 이름은 민상</h1>
    <h1 v-else>분기여서 괜찮아</h1>
</transition>
```

### v-on:css

트랜지션에 CSS 를 적용할지 말지 결정한다. (true|false)

### v-on:mode

만약 enter 애니메이션과 leave 애니메이션을 서로 변경해야 할 상황이 생긴다면 mode 속성을 사용하면 된다.  
mode 속성은 _**in-out**_ 과 _**out-in**_ 이 있는데 in-out은 enter 애니메이션을 먼저 수행 한 후 leave 애니매이션을 수행한다는 의미이고  
out-in 은 그 반대로 이해하면 된다.

```html
<transition enter-acitve-class="minsang-enter-active" leave-active-class="minsang-leave-active" mode="out-in">
    <h1 v-if="true">내 이름은 민상</h1>
    <h1 v-else>분기여서 괜찮아 그리고 leave 를 수행한 후 enter 를 수행하게 될거야</h1>
</transition>
```

### 스크립트 훅

트랜지션 사이클에서 스크립트를 실행부를 실행 시켜야 할 때 사용한다.  
예를 들면, before-enter 는 시작하기 직전에 스크립트를 실행 시킬 수 있다.

```html
<transtion
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
>
</transtion>
```

https://kr.vuejs.org/v2/guide/transitions.html#JavaScript-%ED%9B%85

### transition-group

_**transition-group**_ 은 여러 개의 요소들에 트랜지션을 적용할 때 사용한다.

```html
<transtion-group tag="ul" name="prod-list">
    <li v-for="product in products" :key="product.id">{{ product.name }}</li>
</transition-group>

<style scoped>
    .prod-list-enter-from { opacity: 0; }
    .prod-list-enter-active { transition: all 1s ease-out; }
    .prod-list-enter-to { opacity: 1; }
</style>
```

단일 컴포넌트인 transition 은 DOM 에서 렌더링되지 않으나 transition-group 은 DOM 에서 렌더링된다는 특징을 가지고 있다.

_**tag**_ 은 래퍼태그를 대체한다. 예를 들어, li 요소의 래퍼태그인 ul 을 지정하면 transition-group 바깥에 ul 태그를 지정하지 않아도 된다.

https://kr.vuejs.org/v2/guide/transitions.html#%EB%A6%AC%EC%8A%A4%ED%8A%B8-%ED%8A%B8%EB%9E%9C%EC%A7%80%EC%85%98

## Vuex

> 전역상태 관리를 위한 라이브러리
> state 는 즉, 데이터를 뜻한다. state 에는 지역 (local)과 전역 (global)으로  
> 구분 지을 수 있는데 지역 상태는 오직 하나의 컴포넌트만 영향을 끼친다.
> 예를 들면, 입력한 데이터라던가 모달을 열고 닫는 등은 지역 상태 일 수 있다.

왜, Vuex 를 써야 하는가?  
첫 째, **무거운 컴포넌트 방지**. 컴포넌트를 개발함에 있어 가벼움을 중시해야한다. 좋지 않은 예는 하나의 컴포넌트 안에 수 많은 데이터가 포함될 경우이다.  
둘 째, **예측 불가 데이터**. 매번 변경된 데이터를 가져올 수 있는지 명확하지않다.
셋 째, **에러 가능성**. 코딩하면서 다른 컴포넌트에 미처 상태를 업데이트 하지 못 할 가능성이 있다.

아무튼, **데이터는 별도로 관리**하기 위해서 사용한다고 이해하도록 하자.

https://vuex.vuejs.org/installation.html

### state

### getters

### mutations

### actions

### mappers

> 네가지의 Vuex 요소를 편리하게 사용하기 위한 부가 기능

```js
export default {
    computed: {
        ...mapGetters([GETTER1, GETTER2]),
    },
    methods: {
        ...mapActions([ACTION1, ACTION2]),
    },
}
```

### modules

> 전역상태 데이터를 분할하여 관리

actions, mutations, getters 는 하나로 병합할 수 있다.  
그러나, 모듈에서 내부 state 접근시 자기 자신의 상태만 접근가능하다.

### namespaced

> 이름공간 지정

actions, mutations, getters 는 하나로 병합되므로 모듈이 많으면 많을수록  
중복된 이름을 사용 할 수도 있다. 이러한 사고를 방지하기 위해 모듈의 이름을  
지정해야 한다.

```js
const createStore({
    namespaced: true,
    modules: {
        minsangModule
    },
    ...
})
```

이름공간을 지정한 후, 루트 스토어에서 지정한 키 값이 이름공간이다.  
사용법은 다음과 같다.

```js
export default {
    computed: {
        ...mapGetters('minsangModule', [GETTER1, GETTER2]),
    },
    methods: {
        ...mapActions('minsangModule', [ACTION1, ACTION2]),
        testNameSpaceAction() {
            this.$store.dispatch('minsangModule/setName')
        },
    },
}
```
