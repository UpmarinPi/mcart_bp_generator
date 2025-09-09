export class Singleton {
    private static instance: Singleton;

    private static CreateSingleton(): void {
        Singleton.instance = new Singleton();
    }

    constructor() {
        Singleton.CreateSingleton();
    }
    public static get<T extends typeof Singleton>(this: T): InstanceType<T> {
        if (!Singleton.instance) {
            Singleton.CreateSingleton();
        }
        return Singleton.instance as InstanceType<T>;
    }
}