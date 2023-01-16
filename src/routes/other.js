import express from "express";
const router = express.Router();
import { fork } from 'child_process';
import os from 'node:os';
import logger from "../loggers/Log4jsLogger.js";

router.get('/info', (_req, res) => {
    const processInfo = {
        platform: process.platform,
        version: process.version,
        title: process.title,
        execPath: process.execPath,
        processId: process.pid,
        rss: process.memoryUsage().rss,
        numberOfProcessors: os.cpus().length
    };
    //console.log(processInfo);
    res.status(200).json(processInfo);
})

// Api randoms
router.get("/randoms", (req, res) => {
	const randomNumbersGeneratorFork = fork("./functions/randomNumbersGenerator.js"); // AL HACER FORK ESPECIFICAR RUTA DESDE EL SERVER.JS
	randomNumbersGeneratorFork.send(req.query.cantidad || 500000000);
	randomNumbersGeneratorFork.on("message", (msg) => res.json(msg));
  });



export default router;