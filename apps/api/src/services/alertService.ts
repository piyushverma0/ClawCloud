// Simple service for sending alerts via Telegram

export class AlertService {
  private static botToken: string = process.env.TELEGRAM_BOT_TOKEN || '';
  private static chatId: string = process.env.TELEGRAM_CHAT_ID || '';

  static async sendAlert(message: string): Promise<boolean> {
    if (!this.botToken || !this.chatId) {
      console.warn('[AlertService] Telegram credentials not configured. Skipping alert.');
      return false;
    }

    try {
      const url = \`https://api.telegram.org/bot\${this.botToken}/sendMessage\`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: \`🚨 ClawCloud Security Alert 🚨\\n\\n\${message}\`,
          parse_mode: 'HTML',
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('[AlertService] Failed to send Telegram alert:', error);
      return false;
    }
  }

  static async notifyAuthFailure(instanceId: string, attemptedIp: string) {
    await this.sendAlert(\`Multiple authentication failures detected on instance <code>\${instanceId}</code> from IP <code>\${attemptedIp}</code>.\`);
  }

  static async notifyUnusualActivity(instanceId: string, activityType: string) {
    await this.sendAlert(\`Unusual API activity (<strong>\${activityType}</strong>) detected on instance <code>\${instanceId}</code>.\`);
  }
}
