import { assignmentService } from './assignment.service';

async function run() {
  const agent =
    await assignmentService.findBestAgent(
      'cmr0cyi3s0000pd5ouofy8ndd',
      ['Node.js', 'PostgreSQL'],
    );

  console.log(agent);
}

run();