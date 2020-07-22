export class Helper {

    public static getRandomArbitrary(min: number, max: number) {
        return Math.round(Math.random() * (max - min) + min)
    }

}