import { Score } from "./score.js";
import { Foodable } from "./interfaces.js";

export class Food implements Foodable {
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