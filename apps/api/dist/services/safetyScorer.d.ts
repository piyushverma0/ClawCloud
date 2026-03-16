export declare class SafetyScorer {
    /**
     * Mocks a static analysis of a submitted skill.
     * Returns a score 0-100 and a detailed report.
     */
    static analyzeSkill(repoUrl: string, codeMock: string): {
        score: number;
        status: string;
        report: {
            warnings: string[];
            criticals: string[];
        };
    };
}
//# sourceMappingURL=safetyScorer.d.ts.map