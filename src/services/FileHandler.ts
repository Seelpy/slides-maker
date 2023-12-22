import html2pdf from "html2pdf.js"
import PDFSlide from "../components/Slide/PdfSlide.tsx"
import { renderToStaticMarkup } from "react-dom/server"
import { SlideInfo } from "../models/types.ts"

const pdfMargin = 0
const pdfWidth = 963
const pdfHeight = 543

export function ExportJson(filename: string, data:string ) {
  const link = document.createElement("a")
  const file = new Blob([data], { type: "application/json" })
  link.href = URL.createObjectURL(file)
  link.download = filename + ".json"
  link.click()
}

export function ImportJson(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })
}

export function ImportImage(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })
}

export function ExportPdf(slides: SlideInfo[], filename: string) {
  let result: string = ""
  for (const slide of slides) {
    result += renderToStaticMarkup(PDFSlide(slide))
  }
  const opt = {
    margin: pdfMargin,
    filename: filename + ".pdf",
    jsPDF: {
      format: [pdfWidth, (pdfHeight - pdfMargin) * slides.length],
      orientation: "p",
    },
  }

  html2pdf().from(result).set(opt).save()
}