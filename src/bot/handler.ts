import fg from "fast-glob";
import path from "path";

export async function loadCommands() {
    const filePaths: string[] = await fg(
        `${__dirname.replace(/\\/g, '/')}/../commands/**/*{.ts,.js}`
    );
    return loadCommands;
}
