import { getCollection } from './chroma.service';

async function run() {
  const collection = await getCollection();

  console.log('Collection:', collection.name);
}

run();