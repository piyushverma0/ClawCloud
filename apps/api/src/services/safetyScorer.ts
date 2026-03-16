import { prisma } from '@clawcloud/db';

export class SafetyScorer {
  /**
   * Mocks a static analysis of a submitted skill.
   * Returns a score 0-100 and a detailed report.
   */
  static analyzeSkill(repoUrl: string, codeMock: string) {
    let score = 100;
    const warnings: string[] = [];
    const criticals: string[] = [];

    // 1. Check for basic Data Exfiltration patterns
    if (codeMock.includes('fetch(') || codeMock.includes('http')) {
      score -= 20;
      warnings.push('Contains HTTP requests: Potential data exfiltration.');
    }
    
    // 2. Check for File System access
    if (codeMock.includes('fs.') || codeMock.includes('readFileSync')) {
      score -= 40;
      criticals.push('File system access detected: Highly dangerous for unvetted skills.');
    }

    // 3. Prompt Injection / Override attempts
    if (codeMock.toLowerCase().includes('ignore previous instructions')) {
      score -= 50;
      criticals.push('Prompt Injection signature detected.');
    }
    
    if (codeMock.includes('eval(')) {
       score -= 60;
       criticals.push('Dynamic code execution (eval) is strictly prohibited.');
    }

    // Ensure score bounded 0-100
    score = Math.max(0, Math.min(100, score));

    const status = score > 80 ? 'APPROVED' : score < 50 ? 'REJECTED' : 'PENDING';

    return {
      score,
      status,
      report: { warnings, criticals }
    };
  }
}
