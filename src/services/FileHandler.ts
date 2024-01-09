import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import PDFSlide from "../components/Slide/PdfSlide.tsx"
import { renderToStaticMarkup } from "react-dom/server"
import { SlideInfo } from "../models/types.ts"

export function ExportJson(filename: string, data: string) {
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

export async function ExportPdf(slides: SlideInfo[], filename: string) {
  const expectedSizePixels = [1280, 720]
  const convertedSizePoints = expectedSizePixels.map((a) => a * 0.75)

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: convertedSizePoints,
  })
  
  const width = pdf.internal.pageSize.getWidth()
  const height = pdf.internal.pageSize.getHeight()

  for (let i = 0; i < slides.length; i++) {
    const slideStr = renderToStaticMarkup(PDFSlide(slides[i]))
    const slideContainer = document.createElement("div")

    slideContainer.innerHTML = slideStr
    const slide = slideContainer.firstChild! as HTMLElement
    document.body.appendChild(slide)

    const canvas = await html2canvas(slide)
    if (i != 0) {
      pdf.addPage(convertedSizePoints)
      pdf.setPage(i + 1)
    }

    const img = canvas.toDataURL("image/png")
    pdf.addImage(img, "PNG", 0, 0, width, height, "", "FAST")

    document.body.removeChild(slide)
  }

  pdf.save(filename + ".pdf")
}
