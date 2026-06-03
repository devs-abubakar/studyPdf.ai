import {TavilySearch} from "@langchain/tavily"

export const searchTool = new TavilySearch({
    maxResults:5,
    description:`Search for current information.
    Use only when:
    - The answer is not available in uploaded documents.
    - The question requires recent information.
    - The user explicitly asks for web search.

    Do not use for questions about uploaded PDFs.
    `
})