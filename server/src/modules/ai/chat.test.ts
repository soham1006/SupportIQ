import { chatService } from './chat.service';

async function run() {
  const response = await chatService.ask(
    'What technologies are used in this project?',
    'cmr0d3rzq0000pd2g9fh2pfvm',
    'cmr0cyi3s0000pd5ouofy8ndd',
  );

  console.log(JSON.stringify(response, null, 2));
}

run();