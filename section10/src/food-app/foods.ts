import { Food } from "./food.js";
import { Foodsable } from "./interfaces.js";

export class Foods implements Foodsable {
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