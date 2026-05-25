const retrievalKeywords=[  "pdf",
"document",
"file",
"chapter",
"according to",
"summarize",
"explain this",
"what does it say"
]
export function matchingKeywords(message){
    const lower = message.toLowerCase()
    return retrievalKeywords.some(keyword=>lower.includes(keyword))
}