import 'dotenv/config';
import express, { Request, Response } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { ContentBlock, TextBlock } from "@anthropic-ai/sdk/resources";
import {basePrompt as nodeBasePrompt} from "./defaults/node";
import {basePrompt as reactBasePrompt} from "./defaults/react";
import cors from "cors";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();

// Configure CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())

app.post("/template", async (req: Request, res: Response) => {
    const prompt = req.body.prompt;
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: 'system', content: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra" },
            { role: 'user', content: prompt }
        ],
        max_tokens: 20
    });
    const answer = response.choices[0].message.content?.trim();
    if (answer === "react") {
        res.json({
            prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [reactBasePrompt]
        })
        return;
    }
    if (answer === "node") {
        res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [nodeBasePrompt]
        })
        return;
    }
    res.status(403).json({ message: "You cant access this" })
    return;
})

app.post("/chat", async (req: Request, res: Response) => {
    const messages = req.body.messages;
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: getSystemPrompt() },
            ...messages
        ],
        max_tokens: 2048
    });

    console.log(response);

    res.json({
        response: response.choices[0].message.content
    });
})

// Start the server if this file is run directly
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

// Export the Express API
export default app;

