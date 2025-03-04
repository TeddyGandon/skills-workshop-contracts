import { IService } from "./service.interface";

export class Step1Service implements IService {
    forward(param: any): any {
        return param;
    }
}
