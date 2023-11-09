import { PresentationInfo } from "../models/types";

class PresentaionConverter {
    public ConvertToJson(presentaion: PresentationInfo): string {
        return JSON.stringify(presentaion)
    }
    public ConvertFromJson(json: string): PresentationInfo {
        const jsonObj = JSON.parse(json);
        return jsonObj as PresentationInfo
    }
}

export default new PresentaionConverter