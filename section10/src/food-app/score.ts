import { Foods } from "./foods.js";
import { Scoreable } from "./interfaces.js";

export class Score implements Scoreable {
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