class FileManager {
  // File validation
  validateImageFile(file: File): { valid: boolean; error?: string } {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: "Please select a valid image file (JPEG, PNG, WebP, or GIF)" }
    }

    if (file.size > maxSize) {
      return { valid: false, error: "Image file size must be less than 5MB" }
    }

    return { valid: true }
  }

  validatePdfFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (file.type !== "application/pdf") {
      return { valid: false, error: "Please select a valid PDF file" }
    }

    if (file.size > maxSize) {
      return { valid: false, error: "PDF file size must be less than 10MB" }
    }

    return { valid: true }
  }

  // Image compression
  async compressImage(file: File, maxWidth = 800, quality = 0.8): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        try {
          // Calculate new dimensions
          let { width, height } = img
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }

          canvas.width = width
          canvas.height = height

          // Draw and compress
          ctx?.drawImage(img, 0, 0, width, height)
          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality)
          resolve(compressedDataUrl)
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => reject(new Error("Failed to load image"))
      img.crossOrigin = "anonymous"
      img.src = URL.createObjectURL(file)
    })
  }

  // File upload simulation (in real app, this would upload to a server)
  async uploadFile(file: File, type: "image" | "pdf"): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          resolve(result)
        }
        reader.onerror = () => reject(new Error("Failed to read file"))
        reader.readAsDataURL(file)
      } catch (error) {
        reject(error)
      }
    })
  }

  // File download
  downloadFile(url: string, filename: string): void {
    try {
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading file:", error)
      // Fallback: open in new tab
      window.open(url, "_blank")
    }
  }

  // Get file size from data URL
  getFileSize(dataUrl: string): string {
    try {
      const base64 = dataUrl.split(",")[1]
      const bytes = (base64.length * 3) / 4
      const sizes = ["Bytes", "KB", "MB", "GB"]
      if (bytes === 0) return "0 Bytes"
      const i = Math.floor(Math.log(bytes) / Math.log(1024))
      return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
    } catch (error) {
      return "Unknown size"
    }
  }

  // Convert file to base64
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(new Error("Failed to convert file to base64"))
      reader.readAsDataURL(file)
    })
  }

  // Create blob URL from base64
  base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64.split(",")[1])
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mimeType })
  }

  // Generate thumbnail from image
  async generateThumbnail(file: File, size = 150): Promise<string> {
    return this.compressImage(file, size, 0.7)
  }

  // Validate and process multiple files
  async processFiles(files: FileList, type: "image" | "pdf"): Promise<string[]> {
    const results: string[] = []
    const maxFiles = type === "image" ? 10 : 1

    if (files.length > maxFiles) {
      throw new Error(`Maximum ${maxFiles} ${type} file(s) allowed`)
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const validation = type === "image" ? this.validateImageFile(file) : this.validatePdfFile(file)

      if (!validation.valid) {
        throw new Error(validation.error)
      }

      const url = await this.uploadFile(file, type)
      results.push(url)
    }

    return results
  }
}

export const fileManager = new FileManager()
