import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const configuration = new Configuration({
    organization: "org-zPA5wpcvsZ77uq8mPDK4ycFj",
    apiKey: process.env.OPENAI_API_KEY, 
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',  async (req, res) => {
    res.status(200).send({
        message: 'Hello from chat-completion-GPT',
    })
});

app.post('/', async(req, res) => {
    try {
        let messages = [];
        messages.push({"role": "user", "content": req.body.prompt});

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages
        });

        res.status(200).send({
            bot: response.data.choices[0].message.content
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        })
    }
})

app.listen(5000, () => {
    console.log('Server is running and listening to ' + `${process.env.API_URL}`)
})