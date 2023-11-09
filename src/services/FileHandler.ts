class FileHandler {
    private jsonFileType: string = ".json"
    private jsonType: string = "application/json"

    public ExportJson(filename: string, data: string) {
        const link = document.createElement("a")
        const file = new Blob([data], {type: this.jsonType});
        link.href = URL.createObjectURL(file);
        link.download = this.GenerateJsonFilename(filename)
        link.click()
    }

    public ImportJson(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });
    }

    private GenerateJsonFilename(filename: string): string {
        return filename + this.jsonFileType
    }
}

export default new FileHandler