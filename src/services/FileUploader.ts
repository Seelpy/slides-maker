class FileUploader {
    private base64Prefix: string = "'data:application/json;base64,"
    private jsonFileType: string = ".json"
    private jsonType: string = "application/json"

    public UploadPresentation(filename: string, data: string): void {
        const link = document.createElement("a")
        const file = new Blob([data], {type: this.jsonType});
        link.href = URL.createObjectURL(file);
        link.download = this.GenerateJsonFilename(filename)
        link.click()
    }

    private GenerateBase64(data: string): Promise<string> {
        return new Promise((resolve) => {
            const base64Data = btoa(data); // Используйте btoa для преобразования в base64
            resolve(this.base64Prefix + base64Data);
        });
    }

    private GenerateJsonFilename(filename: string): string {
        return filename + this.jsonFileType
    }
}

export default new FileUploader