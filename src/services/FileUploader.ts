class FileUploader {
    private jsonFileType: string = ".json"
    private jsonType: string = "application/json"

    public UploadPresentation(filename: string, data: string): void {
        const link = document.createElement("a")
        const file = new Blob([data], {type: this.jsonType});
        link.href = URL.createObjectURL(file);
        link.download = this.GenerateJsonFilename(filename)
        link.click()
    }

    private GenerateJsonFilename(filename: string): string {
        return filename + this.jsonFileType
    }
}

export default new FileUploader