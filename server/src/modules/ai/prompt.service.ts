export class PromptService {
  buildPrompt(
    question: string,
    context: string[],
    history: {
      role: string;
      content: string;
    }[],
  ): string {
    const conversation = history
      .map(
        (m) =>
          `${m.role}: ${m.content}`,
      )
      .join('\n');

return `
You are SupportIQ AI.

You are answering questions using a company's knowledge base.

Instructions:
- Read all retrieved knowledge.
- Ignore any knowledge that is unrelated to the user's question.
- Answer ONLY using the relevant information.
- Do NOT include unrelated topics.
- Keep the answer concise and well formatted.
- If the answer cannot be found in the knowledge, reply exactly:

"I don't have enough information to answer this question."

------------------------
Conversation History
------------------------

${conversation}

------------------------
Retrieved Knowledge
------------------------

${context.join('\n\n------------------------\n\n')}

------------------------
User Question
------------------------

${question}

------------------------
Answer
------------------------
`;
  }
}

export const promptService =
  new PromptService();