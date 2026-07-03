export class ConfidenceService {
  calculate(
    distances: number[],
  ): number {
    if (distances.length === 0) {
      return 0;
    }

    const average =
      distances.reduce(
        (sum, value) => sum + value,
        0,
      ) / distances.length;

    const confidence = Math.max(
      0,
      Math.min(1, 1 - average),
    );

    return Number(confidence.toFixed(2));
  }

  shouldEscalate(
    confidence: number,
  ): boolean {
    return confidence < 0.65;
  }
}

export const confidenceService =
  new ConfidenceService();