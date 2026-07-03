import { retrievalService } from './retrieval.service';
import { promptService } from './prompt.service';

async function run() {
  const result = await retrievalService.search(
    'What technology stack was used?',
    3,
  );

  const context = result.documents.filter(
    (doc): doc is string => doc !== null,
  );

  const prompt = promptService.buildPrompt(
    'What technology stack was used?',
    context,
    [],
  );

  console.log(prompt);
}

run();