import { Presentaion } from "../models/types"

export function ConvertToJson(presentaion: Presentaion): string {
  return JSON.stringify(presentaion)
}

export function ConvertFromJson(json: string): Presentaion {
  let jsonObj = {}
  try {
    jsonObj = JSON.parse(json)
  } catch (e) {
    console.error("Ошибка при загрузке JSON: " + e)
  }
  return jsonObj as Presentaion
}
