export class ConfidenceService {
  calculate(
    distances: number[],
  ): number {
    if (distances.length === 0) {
      return 0;
    }

    const validDistances =
      distances.filter(
        distance =>
          Number.isFinite(
            distance,
          ),
      );

    if (
      validDistances.length === 0
    ) {
      return 0;
    }

    const bestDistance =
      Math.min(
        ...validDistances,
      );

    /*
      Convert vector distance into
      a bounded similarity score.

      Lower distance = higher confidence.

      Examples:
      distance 0.2 -> 83%
      distance 0.5 -> 67%
      distance 1.0 -> 50%
      distance 2.0 -> 33%
    */

    const confidence =
      1 /
      (1 + bestDistance);

    return Number(
      Math.max(
        0,
        Math.min(
          1,
          confidence,
        ),
      ).toFixed(2),
    );
  }

  shouldEscalate(
    confidence: number,
  ): boolean {
    return confidence < 0.5;
  }

  getLevel(
    confidence: number,
  ) {
    if (
      confidence >= 0.8
    ) {
      return 'HIGH';
    }

    if (
      confidence >= 0.5
    ) {
      return 'MEDIUM';
    }

    return 'LOW';
  }
}

export const confidenceService =
  new ConfidenceService();