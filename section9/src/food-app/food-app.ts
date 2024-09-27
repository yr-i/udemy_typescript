interface Scoreable {
    readonly totalScore: number;
    render(): void;
}
interface Foodable {
    element: HTMLDivElement;
    clickEventHandler(): void;
}
interface Foodsable {
    elements: NodeListOf<HTMLDivElement>;
    readonly activeElements: HTMLDivElement[];
    readonly activeElementsScore: number[];
}

class Score implements Scoreable {
    // シングルトンパターン
    // clickEventHandlerで何回もnewされることを避けるため
    private static instance: Score;
    get totalScore() {
        const foods = Foods.getInstance();
        return foods.activeElementsScore.reduce((total, score) => total + score, 0);
    }
    render() {
        document.querySelector('.score__number')!.textContent = String(this.totalScore);
    }
    private constructor(){}
    static getInstance() {
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
    }
}
// 個々の単体の処理はこっちで持ちたい
class Food implements Foodable {
    constructor(public element: HTMLDivElement) {
        element.addEventListener('click', this.clickEventHandler.bind(this));
    }
    clickEventHandler() {
        // スタイルの切り替え
        // コールバック関数の中では、thisは今回の場合、addEventListenerが付いているエレメントを示している
        // そのため、使用したいthisを明示的に示したい場合は、.bind(this)をする必要がある
        this.element.classList.toggle('food--active');
        // 合計の更新
        // const score = new Score();
        const score = Score.getInstance();
        score.render();

    }
}
// 一覧だけを持っている
class Foods implements Foodsable {
    // シングルトンパターン
    private static instance: Foods;
    elements = document.querySelectorAll<HTMLDivElement>('.food');
    private _activeElements: HTMLDivElement[] = [];
    private _activeElementsScore: number[] = [];
    // アクティブになっている要素のみ取得する
    get activeElements() {
        this._activeElements = [];
        this.elements.forEach(element => {
            if(element.classList.contains('food--active')) {
                this._activeElements.push(element);
            }
        });
        return this._activeElements;
    }
    // アクティブになっている要素の点数を取得する
    get activeElementsScore() {
        this._activeElementsScore = [];
        this.activeElements.forEach(element => {
            const foodScore = element.querySelector('food__score');
            if (foodScore) {
                this._activeElementsScore.push(Number(foodScore.textContent));
            }
        });
        return this._activeElementsScore;
    }
    private constructor() {
        this.elements.forEach(element => {
            new Food(element);
        })
    }
    static getInstance() {
        if (!Foods.instance) {
            Foods.instance = new Foods();
        }
        return Foods.instance;
    }
}
const foods = Foods.getInstance();