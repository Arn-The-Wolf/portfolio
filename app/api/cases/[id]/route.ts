import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data/cases.json');

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    let cases = JSON.parse(fileContents);
    
    const caseIndex = cases.findIndex((c: any) => c.id === id);
    if (caseIndex === -1) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }
    
    cases[caseIndex] = { ...cases[caseIndex], ...body, id };
    fs.writeFileSync(dataFilePath, JSON.stringify(cases, null, 2));
    
    return NextResponse.json(cases[caseIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update case' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    let cases = JSON.parse(fileContents);
    
    const newCases = cases.filter((c: any) => c.id !== id);
    if (newCases.length === cases.length) {
       return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }
    
    fs.writeFileSync(dataFilePath, JSON.stringify(newCases, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete case' }, { status: 500 });
  }
}
