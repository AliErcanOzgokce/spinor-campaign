import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    project_id: "nativ-445421",
  },
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file',
  ],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    try {
      const sheet = await sheets.spreadsheets.get({
        spreadsheetId: process.env.SHEET_ID,
      });
      
      const sheetName = sheet.data.sheets?.[0].properties?.title || 'Sheet1';
      
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,
        range: `${sheetName}!A:B`,
        insertDataOption: 'INSERT_ROWS',
        valueInputOption: 'RAW',
        requestBody: {
          values: [[email, new Date().toISOString()]],
        },
      });

    } catch (error) {
      console.error('Sheet access error:', error);
      return NextResponse.json(
        { error: 'Cannot access spreadsheet. Please check permissions.' },
        { status: 403 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Successfully subscribed!' 
    });
    
  } catch (error: any) {
    console.error('Subscription error:', error);
    
    const errorMessage = error.message || 'Failed to subscribe';
    const statusCode = error.code || 500;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
} 