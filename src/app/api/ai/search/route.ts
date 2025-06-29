import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { aiService } from '@/lib/ai-service';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string })?.id;
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { query, data } = await request.json();
    
    const searchResults = await aiService.searchData(query, data);
    
    return NextResponse.json({ results: searchResults });
  } catch (error) {
    console.error('AI Search Error:', error);
    return NextResponse.json(
      { message: 'AI search failed' },
      { status: 500 }
    );
  }
}
