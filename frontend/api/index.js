const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');
const { BASE_PROMPT, getSystemPrompt } = require('./src/prompts');
const { basePrompt: nodeBasePrompt } = require('./src/defaults/node');
const { basePrompt: reactBasePrompt } = require('./src/defaults/react');
const { TextBlock } = require('@anthropic-ai/sdk/resources');

const anthropic = new Anthropic();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/template', async (req, res) => {
    const prompt = req.body.prompt;
    const response = await anthropic.messages.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 200,
        system: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
    });
    const answer = (response.content[0]).text; // react or node
    if (answer == "react") {
        res.json({
            prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [reactBasePrompt]
        });
        return;
    }
    if (answer === "node") {
        res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [nodeBasePrompt]
        });
        return;
    }
    res.status(403).json({ message: "You cant access this" });
});

app.post('/api/chat', async (req, res) => {
    const messages = req.body.messages;
    const response = await anthropic.messages.create({
        messages: messages,
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 8000,
        system: getSystemPrompt()
    });
    res.json({
        response: (response.content[0]).text
    });
});

module.exports = app; 