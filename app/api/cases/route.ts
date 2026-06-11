import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data/cases.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const cases = JSON.parse(fileContents);
    return NextResponse.json(cases);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read cases' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const cases = JSON.parse(fileContents);
    
    // Generate a new ID (max id + 1)
    const newId = cases.length > 0 ? Math.max(...cases.map((c: any) => c.id)) + 1 : 1;
    const newCase = { id: newId, ...body };
    
    cases.push(newCase);
    fs.writeFileSync(dataFilePath, JSON.stringify(cases, null, 2));
    
    return NextResponse.json(newCase, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create case' }, { status: 500 });
  }
}
