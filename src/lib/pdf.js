import PdfPrinter from "pdfmake"

const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  }

export const getPDFReadableStream = data => {
    const printer = new PdfPrinter(fonts)
    const blogposturl = data.cover
    const docDefinition = {
        content: [ 
            {
                text: data.author.name, 
                style: "header",
            },
            { 
                text: data.title, 
                style: "title"
            },
            { 
                image: blogposturl, 
                width: 200
            },
            { 
                text: data.content, 
                style: "blogcontent" 
            }
        ],            
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 20, 0, 20]
            },
            title: {
                fontSize: 15, bold: true, margin: [0, 20, 0, 20] 
            },
            blogcontent: {
                fontSize: 15, italics: true , margin: [0, 10, 0, 10]
            }                           
        }
      }
      const options = {}
      const pdfReadableStream = printer.createPdfKitDocument(docDefinition, options)
    
      pdfReadableStream.end()
      return pdfReadableStream
}