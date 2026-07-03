import { agentRepository } from './agent.repository';

export class AssignmentService {
  async findBestAgent(
    organizationId: string,
    requiredSkills: string[],
  ) {
    const agents =
      await agentRepository.getOrganizationAgents(
        organizationId,
      );

    if (agents.length === 0) {
      return null;
    }

   let bestAgent: (typeof agents)[number] | null = null;

let bestSkillScore = -1;
let lowestWorkload = Number.MAX_SAFE_INTEGER;

for (const agent of agents) {
  let score = 0;

  for (const skill of requiredSkills) {
    if (
      agent.skills.some(
        s => s.toLowerCase() === skill.toLowerCase(),
      )
    ) {
      score++;
    }
  }

  const workload =
    await agentRepository.getOpenTicketCount(
      agent.id,
    );

  if (
    score > bestSkillScore ||
    (score === bestSkillScore &&
      workload < lowestWorkload)
  ) {
    bestSkillScore = score;
    lowestWorkload = workload;
    bestAgent = agent;
  }
}

return bestAgent;
  }
}

export const assignmentService =
  new AssignmentService();