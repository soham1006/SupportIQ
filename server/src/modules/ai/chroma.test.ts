import 'dotenv/config';

import { getCollection } from './chroma.service';

async function testChroma() {
  try {
    const collection =
      await getCollection();

    const count =
      await collection.count();

    console.log(
      'Collection:',
      collection.name,
    );

    console.log(
      'Total vectors:',
      count,
    );

    const data =
      await collection.peek({
        limit: 5,
      });

    console.log(
      'Sample IDs:',
      data.ids,
    );

    console.log(
      'Sample documents:',
      data.documents,
    );

    console.log(
      'Sample metadata:',
      data.metadatas,
    );
  } catch (error) {
    console.error(error);
  }
}

testChroma();