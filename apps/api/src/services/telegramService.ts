import dotenv from 'dotenv';
dotenv.config();

// Simple mock/implementation of a Telegram bot service
export class TelegramService {
  private static botToken = process.env.TELEGRAM_BOT_TOKEN;

  static async sendBudgetAlert(telegramHandle: string, instanceName: string, cost: number, budget: number) {
    if (!telegramHandle) return;

    const message = `🚨 *ClawCloud Budget Alert*\n\nYour instance **${instanceName}** has exceeded your daily budget!\nSpend today: $${cost.toFixed(4)}\nBudget: $${budget.toFixed(2)}`;

    // If we have a bot token, we can use the Telegram HTTP API directly
    if (this.botToken) {
      try {
        console.log(`[TelegramService] Sending alert to ${telegramHandle}`);
        // This is a stub for the real HTTP call: 
        // await fetch(\`https://api.telegram.org/bot\${this.botToken}/sendMessage\`, { method: 'POST', body: JSON.stringify({ chat_id: telegramHandle, text: message }) })
      } catch (error) {
        console.error('Failed to send Telegram alert', error);
      }
    } else {
      console.log(`[TelegramService MOCK] Alert meant for ${telegramHandle}: ${message.replace(/\n/g, ' ')}`);
    }
  }
}
