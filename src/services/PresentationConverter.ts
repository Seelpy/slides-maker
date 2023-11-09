import { PresentationInfo } from "../models/types";

class PresentaionConverter {
    public ConvertToJson(presentaion: PresentationInfo): string {
        return JSON.stringify(presentaion)
    }
    public ConvertFromJson(json: string): PresentationInfo {
        let jsonObj = {};
        try {
            jsonObj = JSON.parse(json);
        } catch (e) {
            console.error("Ошибка при загрузке JSON: " + e)
        }
        return jsonObj as PresentationInfo
    }
}

export default new PresentaionConverter