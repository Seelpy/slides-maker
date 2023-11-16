import { Presentaion } from '../models/types'

class PresentaionConverter {
  public ConvertToJson(presentaion: Presentaion): string {
    return JSON.stringify(presentaion)
  }
  public ConvertFromJson(json: string): Presentaion {
    let jsonObj = {}
    try {
      jsonObj = JSON.parse(json)
    } catch (e) {
      console.error('Ошибка при загрузке JSON: ' + e)
    }
    return jsonObj as Presentaion
  }
}

export default new PresentaionConverter()
