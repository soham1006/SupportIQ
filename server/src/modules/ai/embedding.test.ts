import { embeddingService } from './embedding.service';

async function run() {
  const vector = await embeddingService.embed(
    'SupportIQ is an AI customer support platform.',
  );

  console.log('Dimensions:', vector.length);

  console.log(vector.slice(0, 10));
}

run();