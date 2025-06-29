export class AIService {
  private apiKey: string;
  private baseUrl = 'https://openrouter.ai/api/v1/chat/completions';

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
  }

  async enhanceData(data: any[], dataType: 'clients' | 'workers' | 'tasks'): Promise<any[]> {
    const prompt = this.getEnhancementPrompt(data, dataType);
    
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://localhost:3000',
          'X-Title': 'Data Alchemist',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528:free',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      const result = await response.json();
      const enhancedDataText = result.choices[0]?.message?.content;
      
      // Parse the AI response and return enhanced data
      return this.parseAIResponse(enhancedDataText, data);
    } catch (error) {
      console.error('AI Enhancement Error:', error);
      return data; 
    }
  }

  async searchData(query: string, data: any[]): Promise<any[]> {
    const prompt = `
      Given this natural language query: "${query}"
      And this data: ${JSON.stringify(data.slice(0, 10))}
      
      Return only the items that match the query criteria. 
      Respond with valid JSON array format only.
    `;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://localhost:3000',
          'X-Title': 'Data Alchemist',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528:free',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      const result = await response.json();
      const searchResults = result.choices[0]?.message?.content;
      
      return JSON.parse(searchResults);
    } catch (error) {
      console.error('AI Search Error:', error);
      return [];
    }
  }

  async generateRule(description: string): Promise<any> {
    const prompt = `
      Convert this natural language rule description into a structured rule object:
      "${description}"
      
      Return a JSON object with this structure:
      {
        "type": "coRun|slotRestriction|loadLimit|phaseWindow|precedence",
        "name": "Rule Name",
        "description": "Rule Description",
        "parameters": {}
      }
    `;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://localhost:3000',
          'X-Title': 'Data Alchemist',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528:free',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      const result = await response.json();
      const ruleText = result.choices[0]?.message?.content;
      
      return JSON.parse(ruleText);
    } catch (error) {
      console.error('AI Rule Generation Error:', error);
      return null;
    }
  }

  private getEnhancementPrompt(data: any[], dataType: string): string {
    return `
      Analyze and enhance this ${dataType} data for quality and completeness:
      ${JSON.stringify(data.slice(0, 5))}
      
      Please:
      1. Fix any obvious data quality issues
      2. Standardize formats
      3. Fill in missing reasonable values where appropriate
      4. Ensure data consistency
      
      Return the enhanced data in the same JSON format.
    `;
  }

  private parseAIResponse(response: string, originalData: any[]): any[] {
    try {
      // Try to extract JSON from the AI response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return originalData;
    } catch (error) {
      console.log(error)
      return originalData;
    }
  }
}

export const aiService = new AIService();