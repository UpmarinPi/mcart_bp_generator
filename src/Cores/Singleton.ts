export class Singleton {
    private static instance: Singleton;

    private static CreateSingleton() : void {
        Singleton.instance = new Singleton();
    }

    constructor() {
        Singleton.CreateSingleton();
    }

    public static get(): Singleton{
        if(!Singleton.instance){
            Singleton.CreateSingleton();
        }
        return Singleton.instance;
    }
}