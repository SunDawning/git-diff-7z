/*
 * 编译生成相应的可执行文件
 */
import{run}from"./run.js";
import{gitDiff7z}from"./main.js";
run("deno compile --allow-run --allow-read --allow-write --unstable --allow-net --output gitDiff7z.exe main.js")
