/* Classとthisについて */
// classを定義する場合、最初の文字は大文字にすることが多い
class Person {
    name: string; // {name}フィールドとか呼ぶ
    constructor(initName: string) {
        // 予約語
        // Personという設計図からオブジェクトを作成するときに実行される関数（初期化とか）
        // thisにはフィールドとして指定されたものが入っている
        this.name = initName;
    }
    greeting() {
        // メソッド
        console.log(`hello ${this.name}.`);
    }
    // Personはクラスが生成するインスタンスの型としても使用可能
    greeting2(this: Person) {
        // メソッド
        console.log(`hello ${this.name}`);
    }
}
// 初期化は new で行う
const person_1 = new Person('person_1');
// console.log(quill);
// => Person { name: 'Quill' } 
// Personというクラスからできたインスタンスだよということを示すために、Personが出力されている

// メソッドの実行
person_1.greeting();

// thisは呼び出された場所・実行される場所で決まる
// なぜ、object定義の時点でanotherGreetingはエラーが起きないのか？: TSでは使うときまで考慮できず、anotherGreetingのように書いてもエラーは起きない
// 回避方法としては、Classのメソッドにて引数として thisを受け取り、型定義をする（greeting2()）
// class定義にてアロー関数を使用すると、定義時のthisが使用される
const anotherQuill = {
    name: 'name',
    anotherGreeting: () => person_1.greeting, // この場合thisは、anotherQuillを指すので、anotherQuillにnameが無いとエラーとなる
    anotherGreeting2: function () {
        // この場合は、anotherQuillのnameとなる
        console.log(`hello ${this.name}`);
    }
}

/* public, private修飾子 */
class Person_2 {
    name: string; // public はデフォルトで指定されている
    // private: classの中でしか使用できないようにする・読み込みも不可・メソッドにも指定可能
    private age: number; 
    constructor(initName: string, initAge: number) {
        this.name = initName;
        this.age = initAge;
    }
    incrementAge() {
        this.age += 1;
    }
    greeting(this: Person_2) {
        console.log(`hello ${this.name}. I'm ${this.age}years old.`);
    }
}
// 初期化は new で行う
const person_2 = new Person_2('person_2', 38);
person_2.incrementAge();
// annie.age = 39; は private によってできなくなる

/* 初期化処理の省略について */
class Person_3 {
    // name: string;
    // private age: number; 
    // constructor(initName: string, initAge: number) {
    //     this.name = initName;
    //     this.age = initAge;
    // }
    
    // public or private修飾子 + フォールド名: 型 と書くと省略できる
    constructor(public name: string, private age: number) {
    }
    incrementAge() {
        this.age += 1;
    }
    greeting(this: Person_3) {
        console.log(`hello ${this.name}. I'm ${this.age}years old.`);
    }
}

/* readOnly修飾子 */
// class内外かかわらず、変更不可・読み込みのみ可能
class Person_4 {
    readonly id: number = 32;
    constructor(public readonly name: string, private readonly age: number) {
        // コンストラクタ内では初期化の状態なので、変更可能
        // インスタンス化されたとき、下記の内容となる
        this.id = 31;
        this.name = 'hehh'
        this.age = 30;
    }
    incrementAge() {
        // this.age += 1; がreadonlyによってエラーとなる
    }
    greeting(this: Person_4) {
        console.log(`hello ${this.name}. I'm ${this.age}years old.`);
    }
}

/* extendsで継承を行う, protectedの使用 */
// 継承できるclassは一つのみ
class Person_5 {
    // privateなフィールドについては、継承したクラスでは使用できない
    // 継承先のクラス内では使用でき、外では使用できない protected を使うと良い
    constructor(public name: string, protected age: number) {
    }
    incrementAge() {
        this.age += 1;
    }
    greeting(this: Person_5) {
        console.log(`hello ${this.name}. I'm ${this.age}years old.`);
    }
}
class Teacher extends Person_5 {
    constructor(name: string, age: number, public subject: string) {
        // extendsされたclassのコンストラクタはsuper()が必要
        super(name, age);
    }
    // 継承したプロパティ・メソッドと同じものがある場合、上書きされる
    greeting() {
        console.log(`hello ${this.name}. I'm ${this.age}years old. I teach ${this.subject}`);
    }
}
const teacher = new Teacher('teacher', 45, 'math');
teacher.greeting();

/* ゲッター・セッター */
class Teacher_2 extends Person_5 {
    // 取得したときに何かを実行する場合に使用する
    get subject(): string {
        if (!this._subject) {
            throw new Error('there is no subject.')
        }
        return this._subject;
    }
    // 値を設定するときに何かを実行したい場合に使用する
    // getと同じ名前もOK
    // 同じ名前のゲッターがある場合、型が同じになる（別の型を定義することはできない）
    set subject(val) {
        if (val) {
            throw new Error('there is no subject.')
        }
        this._subject = val;

    }
    constructor(name: string, age: number, private _subject: string) {
        super(name, age);
    }
    greeting() {
        console.log(`hello ${this.name}. I'm ${this.age}years old. I teach ${this.subject}`);
    }
}
const teacher_2 = new Teacher_2('teacher_2', 45, 'math');
console.log(teacher_2.subject); // musicが出る
teacher.subject = 'set text'; // setで定義したfunctionが呼ばれ設定される

/* static */
// インスタンスを作らずにクラスを使う（ES6にもある）
class Person_6 {
        // this: インスタンス（設計図のクラスから作られたオブジェクト）を示すのがthisのため、staticの値はthisに出てこない
        static species = 'Homo sapiens';
        static isAdult(age: number) {
            if (age > 17) return true;
            return false;
        }
    constructor(public name: string, protected age: number) {
    }
    incrementAge() {
        // thisではstaticは出てこないので、下記のように使用する
        Person_6.species = '';
        this.age += 1;
    }
    greeting(this: Person_6) {
        console.log(`hello ${this.name}. I'm ${this.age}years old.`);
    }
}
class Teacher_3 extends Person_6 {
    get subject(): string {
        if (!this._subject) {
            throw new Error('there is no subject.')
        }
        return this._subject;
    }
    set subject(val) {
        if (val) {
            throw new Error('there is no subject.')
        }
        this._subject = val;

    }
    constructor(name: string, age: number, private _subject: string) {
        super(name, age);
    }
    greeting() {
        console.log(`hello ${this.name}. I'm ${this.age}years old. I teach ${this.subject}`);
    }
}
console.log(Person_6.species); // Homo sapiens
console.log(Person_6.isAdult(28)); // true
console.log(Teacher_3.species); // Homo sapiens
console.log(Teacher_3.isAdult(28)); // true

/* Abstract */
// 継承のみに使えるクラスを作成する
// abstractクラスではインスタンスは生成できない（abstractメソッドは継承先にのみ存在するため）
abstract class Person_7 {
    static species = 'Homo sapiens';
    static isAdult(age: number) {
        if (age > 17) return true;
        return false;
    }
    constructor(public name: string, protected age: number) {
    }
    incrementAge() {
        Person_6.species = '';
        this.age += 1;
    }
    greeting(this: Person_7) {
        console.log(`hello ${this.name}. I'm ${this.age} years old.`);
        // 継承先に必ず対象となるメソッドがあるよって保証できれば使用できる（= abstract）
        this.explainJob();
    }
    // abstractメソッドはabstractクラスの中でしか使用できない
    abstract explainJob(): void;
}
class Teacher_4 extends Person_7 {
    // 継承先でメソッドを指定する
    explainJob(): void {
        console.log(`I am a teach ${this.subject}`);
    }
    get subject(): string {
        if (!this._subject) {
            throw new Error('there is no subject.')
        }
        return this._subject;
    }
    set subject(val) {
        if (val) {
            throw new Error('there is no subject.')
        }
        this._subject = val;

    }
    constructor(name: string, age: number, private _subject: string) {
        super(name, age);
    }
}
const teacher_4 = new Teacher_4('teacher_4', 45, 'math');
teacher_4.greeting();

/* constructor関数へのprivateの付与 */
// シングルトンパターンを作成するために使用する
// シングルトンパターン: クラスからインスタンスを1つしか作れない
class Teacher_5 extends Person_7 {
    // クラスとして一つの値を持つ & 外部からアクセスできない
    // static: staticメソッドからstaticプロパティを呼び出すため
    // private: 外部からアクセスできないようにするため
    private static instance: Teacher_5;
    explainJob(): void {
        console.log(`I am a teach ${this.subject}`);
    }
    get subject(): string {
        if (!this._subject) {
            throw new Error('there is no subject.')
        }
        return this._subject;
    }
    set subject(val) {
        if (val) {
            throw new Error('there is no subject.')
        }
        this._subject = val;

    }
    private constructor(name: string, age: number, private _subject: string) {
        super(name, age);
    }
    static getInstance() {
        if (Teacher_5.instance) return Teacher_5.instance;
        Teacher_5.instance = new Teacher_5('teacher_5', 45, 'math');
        return Teacher_5.instance;
    }
}
// constructor に private がついていることによって new ができない
// クラスの定義内のみ使用できるようになっている
// const teacher_5 = new Teacher_5('teacher_5', 45, 'math');

// これだと何回も使用できてしまう
// そのためにプロパティ（今回であれば instance）を一つ用意して分岐処理をする
const teacher_5 = Teacher_5.getInstance();
const teacher_5_1 = Teacher_5.getInstance();
