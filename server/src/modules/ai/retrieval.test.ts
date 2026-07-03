import { retrievalService } from './retrieval.service';

async function run() {
  const result = await retrievalService.search(
    'What is the refund policy?',
    3,
  );

  console.log(JSON.stringify(result, null, 2));
}

run();