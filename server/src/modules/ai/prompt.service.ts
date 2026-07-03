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

Answer ONLY using:

1. Conversation history
2. Retrieved context

If the answer cannot be determined, reply:

"I don't have enough information to answer this question."

------------------------
Conversation
------------------------

${conversation}

------------------------
Knowledge
------------------------

${context.join('\n\n')}

------------------------
Current Question
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