import express from "express";
import { Application, Request, Response } from "express";
import { Step1Service } from "./core/step1.service";
import { Step2Service } from "./core/step2.service";
import { Step3Service } from "./core/step3.service";

/**
 * Creates an express application that can be used to listen incoming requests
 * @returns Application
 */
const createServer = (): Application => {
    const app = express();
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    return app;
}

const port = 3000;

createServer()
    .get("/", (req: Request, res: Response) => {
        res.send({status: "ok"});
    })
    .post("/", (req: Request, res: Response) => {
        const res1: any = new Step1Service().forward(req.body as any);
        const res2: any = new Step2Service().forward(res1 as any);
        const res3: any = new Step3Service().forward(res2 as any);
        res.send(res3 as any);
    })
    .listen(port, () => {
        console.log(`Start listening port ${port}`);
    });

process.version