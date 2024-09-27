// いろんなクラスを受け取りたいが、classという型はないので指定できない
// クラス = コンストラクタ関数と捉えられるので、型にFunctionを指定できる
function Logging(constructor: Function) {
    console.log('Logging....');
    console.log(constructor);
}
// @関数名でデコレーションできる
// クラス全体をデコレーションする場合は、引数が一つ必要
// インスタンス生成時ではなく、クラスの定義時に実行される
@Logging
class User {
    name = 'user';
    constructor() {
        console.log('user created');
        
    }
}

/* デコレータファクトリ */
// デコレータに引数を渡す
// デコレータを返す関数
// クラス全体をデコレーションする場合は、引数が一つ必要だが、2つ持つことはできない
function Logging2(message: string) {
    return function (constructor: Function) {
        console.log(message);
        console.log(constructor);
    }
}
@Logging2('Logging User')
class User2 {
    name = 'user';
    constructor() {
        console.log('user created');
        
    }
}

/* 簡易版のフレームワークを作成する */
/*
    <div class="app">
        ここの中身にh1タグを入れたい
    </div>
 */
function Component(template: string, selector: string) {
    // Function型だと普通のファンクションとして扱われてしまうので、newはNGとなってしまう
    // そのため、コンストラクタシグネチャを使用して下記のような指定をする
    // constructor: {new(): object}だとインスタンスからnameにアクセスできない
    // →コンストラクタ関数の返す型がobjectになっているから
    // 引数はどんなクラスでも適用できるようにレストパラメータを使用する
    return function(constructor: {new(...args: any[]): {name: string}}) {
        const mountedElement = document.querySelector(selector);
        const instance = new constructor();
        if (mountedElement) {
            mountedElement.innerHTML = template;
            // nameの取得は下記
            mountedElement.querySelector('h1')!.textContent = instance.name;
        }
    }
}
@Component('<h1>{{ name }}</h1>', '#app')
@Logging2('Logging User')
class User3 {
    name = 'user';
    constructor() {
        console.log('user created');
        
    }
}

/* 戻り値にクラスを指定して、新しいクラスを作り出す */
function Component2(template: string, selector: string) {
    // User4にageが増えると、nameの情報しかない下記は、エラーとなってしまう
    // constructor: {new(...args: any[]): {name: string}}
    // →ジェネリクスを使用する
    return function<T extends {new(...args: any[]): {name: string}}>(constructor: T) {
        // ここでクラスを返すことで、新しいクラスに書き換える
        // インスタンスが生成された時に実行される
        // User4に入っているプロパティは全て必要になる
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                const mountedElement = document.querySelector(selector);
                const instance = new constructor();
                if (mountedElement) {
                    mountedElement.innerHTML = template;
                    mountedElement.querySelector('h1')!.textContent = instance.name;
                }
            }
        }
    }
}

@Component2('<h1>{{ name }}</h1>', '#app')
@Logging2('Logging User')
class User4 {
    name = 'user';
    constructor(public age: number) {
        console.log('user created');
        
    }
}
const user1 = new User4(32);

/* プロパティーデコレータを使う方法 */
// プロパティーに対してデコレーションする
// クラスデコレータより先に実行される
// 引数が2つ必要
function PropertyLogging(target: any, key: string) {
    console.log('PropertyLogging');
    console.log(target);
    console.log(key); // 対象のプロパティが入っている
}

@Logging2('Logging User')
@Component2('<h1>{{ name }}</h1>', '#app')
class User5 {
    @PropertyLogging
    // 対象のプロパティがstaticかそうではないかで、第一引数の値が変わる
    // static: クラス
    // staticではない: クラスが持っているプロトタイプ
    static name2 = 'user2';
    name = 'user';
    constructor(public age: number) {
        console.log('user created');
        
    }
}
const user2 = new User5(32);

/* メソッドデコレータを使う方法 */
// class内のデコレーターは上から順に実行される
// PropertyDecoratorを返すことができる
// 引数が3つ必要
// 対象のプロパティがstaticかそうではないかで、第一引数の値が変わる
// static: クラス
// staticではない: クラスが持っているプロトタイプ
function MethodLogging(target: any, key: string, descriptor: PropertyDecorator) {
    console.log('MethodLogging');
    console.log(target);
    console.log(key); // 対象のプロパティが入っている
    console.log(descriptor); // PropertyDecoratorが入っている
    
}

@Logging2('Logging User')
@Component2('<h1>{{ name }}</h1>', '#app')
class User6 {
    @PropertyLogging
    static name2 = 'user2';
    name = 'user';
    constructor(public age: number) {
        console.log('user created');
        
    }
    @MethodLogging
    greeting() {
        console.log('hello');
        
    }
}

/* アクセサーデコレータ */
// メソッドデコレータと同様
function AccessorLogging(target: any, key: string, descriptor: PropertyDecorator) {
    console.log('MethodLogging');
    console.log(target);
    console.log(key);
    console.log(descriptor);
}
@Logging2('Logging User')
@Component2('<h1>{{ name }}</h1>', '#app')
class User7 {
    @PropertyLogging
    static name2 = 'user2';
    name = 'user';
    constructor(public age: number) {
        console.log('user created');
        
    }
    @AccessorLogging
    get () {
        return this.age;
    }
    @MethodLogging
    greeting() {
        console.log('hello');
        
    }
}

/* 戻り値を使って、実践的なメソッドデコレータを使う */
function enumerable(isEnumerable: boolean) {
        return function (target: any, key: string, descriptor: PropertyDecorator) {
            return {
                enumerable: isEnumerable
            };
        }
    
}

@Logging2('Logging User')
@Component2('<h1>{{ name }}</h1>', '#app')
class User8 {
    @PropertyLogging
    static name2 = 'user2';
    name = 'user';
    constructor(public age: number) {
        console.log('user created');
        
    }
    @AccessorLogging
    get () {
        return this.age;
    }
    @MethodLogging
    @enumerable(false)
    greeting() {
        console.log('hello');
        
    }
}

/* パラメータデコレータ */
// 引数は3つ
// メソッドデコレータより先に実行される
function ParamLogging(target: any, key: string, i: number) {
    console.log('MethodLogging');
    console.log(target); // プロトタイプが入る
    console.log(key); // function名
    console.log(i); // 引数の番号
}
@Logging2('Logging User')
@Component2('<h1>{{ name }}</h1>', '#app')
class User9 {
    @PropertyLogging
    static name2 = 'user2';
    name = 'user';
    constructor(public age: number) {
        console.log('user created');
        
    }
    @AccessorLogging
    get () {
        return this.age;
    }
    @MethodLogging
    @enumerable(false)
    greeting( @ParamLogging message: string) {
        console.log(message);
        
    }
}