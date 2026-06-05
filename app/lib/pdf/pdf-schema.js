import {z} from 'zod'

export const PdfSchema=z.object({
    filename:z.string().describe('Name of the file, must end in .pdf (e.g., cell_biology_notes.pdf)'),
    title: z.string().describe('The primary heading at the top of the document'),
    modules: z.array(z.object({
        subHeading: z.string().describe("The specific concept or term name"),
        keyPoints: z.array(z.string().describe("Bullet points breaking down the details")),
        importantNotes: z.string().optional().describe('Crucial callout, equation, or warning box')
    }))
})