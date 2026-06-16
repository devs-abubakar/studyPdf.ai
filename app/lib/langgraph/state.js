import { AIMessage, HumanMessage, SystemMessage, ToolMessage } from "@langchain/core/messages";
import { messagesStateReducer, Annotation } from "@langchain/langgraph";

export function convertToLangChainMessages(messages) {
    if (!Array.isArray(messages)) return [];

    return messages.map((msg) => {
        if (!msg || !msg.role) { 
            console.warn("Message is empty or missing role", msg);
            return null;
        }

        switch (msg.role) {
            case "user":
                return new HumanMessage(msg.content);
            
            case "system":
                return new SystemMessage(msg.content);
            
            case "assistant":
                // CRITICAL FIX: Preserve tool_calls made by the AI
                return new AIMessage({
                    content: msg.content,
                    tool_calls: msg.tool_calls || [], 
                    invalid_tool_calls: msg.invalid_tool_calls || []
                });
            
            case "tool":
                // Validation is good, keep it
                if (!msg.tool_call_id) {
                    throw new Error(`Missing tool_call_id in tool message: ${JSON.stringify(msg)}`);
                }
                return new ToolMessage({
                    content: msg.content,
                    tool_call_id: msg.tool_call_id,
                    name: msg.name || "unknown_tool" // Good practice to include the tool name
                });
            
            default:
                console.warn("Unknown message role:", msg.role);
                return null;
        }
    }).filter(Boolean);
}

export function convertFromLangChainMessages(messages) {
    if (!Array.isArray(messages)) return [];

    return messages.map((msg) => {
        const type = msg._getType?.();
        
        const roleMap = {
            human: "user",
            ai: "assistant",
            system: "system",
            tool: "tool",
        };
    
        // Construct the base object
        const serializedMsg = {
            role: roleMap[type] ?? "user",
            content: msg.content 
        };

        // CRITICAL FIX: Conditionally attach tool metadata if it exists
        // This ensures the data survives a round-trip to your database and back
        if (msg.tool_calls && msg.tool_calls.length > 0) {
            serializedMsg.tool_calls = msg.tool_calls;
        }
        if (msg.tool_call_id) {
            serializedMsg.tool_call_id = msg.tool_call_id;
        }
        if (msg.name) {
            serializedMsg.name = msg.name;
        }

        return serializedMsg;
    });
}

export const GraphState = Annotation.Root({
    messages: Annotation({
        reducer: messagesStateReducer,
        default: () => [],
    }),
});