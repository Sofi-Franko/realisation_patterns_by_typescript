enum ImageFormat {
  Png = "png",
  Jpeg = "jpeg"
}

interface IResolution {
  width: number
  height: number
  isTuned: boolean
}

interface IImageConversion extends IResolution {
  format: ImageFormat
}

// ----------BUILD-------------
class ImageBuilder {
  private formats: ImageFormat[] = [];
  private resolutions: IResolution[] = []

  addPng() {
    if (this.formats.includes(ImageFormat.Png)) return this
    this.formats.push(ImageFormat.Png)

    return this
  }

  addJpeg() {
    if (this.formats.includes(ImageFormat.Jpeg)) return this
    this.formats.push(ImageFormat.Jpeg)

    return this
  }

  addResolution(width:number, height:number, isTuned:boolean) {
    this.resolutions.push({width, height, isTuned })

    return this
  }

  build(): IImageConversion[] {
    const result: IImageConversion[] = []
    for(const imgResolution of this.resolutions) {
      for(const imgFormat of this.formats) {
        result.push({...imgResolution, format: imgFormat})
      }
    }

    return result
  }
}
// --------------------------------

// ----------to test-------------

console.log(new ImageBuilder()
  .addPng()
  .addPng() // returns this
  .addJpeg()
  .addResolution(150, 200, true)
  .addResolution(300, 600, false)
  .build()
)
