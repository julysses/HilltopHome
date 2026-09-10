import { spawn } from "node:child_process";
// Translate supervised preview flags while preserving ordinary Next.js development.
const args = process.argv.slice(2);
const preview = args.includes("--strictPort");
const translated = args.filter(arg => arg !== "--strictPort").map(arg => arg === "--host" ? "--hostname" : arg);
const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", preview ? "start" : "dev", ...translated], { stdio: "inherit" });
child.on("exit", code => process.exit(code ?? 1));
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
