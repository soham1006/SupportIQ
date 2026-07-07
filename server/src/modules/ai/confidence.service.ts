export class ConfidenceService {
  calculate(
    distances: number[],
  ): number {
    if (distances.length === 0) {
      return 0;
    }

    const bestDistance =
      Math.min(...distances);

    const confidence =
      Math.max(
        0,
        Math.min(
          1,
          1 - bestDistance,
        ),
      );

    return Number(
      confidence.toFixed(2),
    );
  }

  shouldEscalate(
    confidence: number,
  ) {
    return confidence < 0.5;
  }

  getLevel(
    confidence: number,
  ) {
    if (confidence >= 0.8) {
      return 'HIGH';
    }

    if (confidence >= 0.5) {
      return 'MEDIUM';
    }

    return 'LOW';
  }
}

export const confidenceService =
  new ConfidenceService();