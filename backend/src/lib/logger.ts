import chalk from "chalk";

// [9:55:10] [INFO] Hello world
export default class Logger {
    public static log(args: any) {
        this.info(args);
    }
    public static info(args: any) {
        console.log(
            chalk.blue(`[${this.getTime()}] [INFO]`),
            typeof args === "string" ? chalk.blueBright(args) : args
        );
    }
    public static warn(args: any) {
        console.log(
            chalk.yellow(`[${this.getTime()}] [WARN]`),
            typeof args === "string" ? chalk.yellowBright(args) : args
        );
    }
    public static error(args: any) {
        console.log(
            chalk.red(`[${this.getTime()}] [ERROR]`),
            typeof args === "string" ? chalk.redBright(args) : args
        );
    }
    private static getTime() {
        const time = new Date();

        return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    }
}
