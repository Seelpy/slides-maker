// @ts-ignore
import html2pdf from "html2pdf.js"
import PDFSlide from "../components/Slide/PdfSlide.tsx";
import { renderToStaticMarkup } from "react-dom/server"
import { SlideInfo } from "../models/types.ts";

const pdfMargin = 800
const pdfWidth = 1280
const pdfHeight = 720
class FileHandler {
  private jsonFileType: string = '.json'
  private jsonType: string = 'application/json'

  public ExportJson(filename: string, data: string) {
    const link = document.createElement('a')
    const file = new Blob([data], { type: this.jsonType })
    link.href = URL.createObjectURL(file)
    link.download = this.GenerateJsonFilename(filename)
    link.click()
  }

  public ImportJson(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
    })
  }

  public ImportImage(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
    })
  }

  public ExportPdf(slides: SlideInfo[], filename: string) {
    let result: string = ""
    for (let slide of slides) {
      result += renderToStaticMarkup(PDFSlide(slide))
    }
    let opt = {
      margin: [0, 0, 0, pdfMargin],
      filename:     filename + '.pdf',
      jsPDF:        { format: [pdfWidth, pdfHeight*slides.length], orientation: "p"}
    };

    console.log(result)
    html2pdf().from(result).set(opt).save()
    console.log("asdasd")
  }

  private GenerateJsonFilename(filename: string): string {
    return filename + this.jsonFileType
  }
}

export default new FileHandler()
