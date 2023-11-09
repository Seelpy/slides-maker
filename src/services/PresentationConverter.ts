import { Presentaion } from "../models/types";

class PresentaionConverter {
    public ConvertToJson(presentaion: Presentaion): string{
        return JSON.stringify(presentaion)
    }
}

export default new PresentaionConverter