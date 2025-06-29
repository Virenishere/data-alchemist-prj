import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { validateData } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string })?.id;

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { data, dataType } = await request.json();

    if (!data || !dataType || !Array.isArray(data)) {
      return NextResponse.json({ message: 'Invalid or missing dataset' }, { status: 400 });
    }

    const payload: any = {
      clients: [],
      workers: [],
      tasks: []
    };

    payload[dataType] = data;

    const errors = await validateData(payload);
    return NextResponse.json({ errors });
  } catch (error: any) {
    console.error('Manual Validation Error:', error);
    return NextResponse.json(
      {
        message: 'Validation failed',
        error: error?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
