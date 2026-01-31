import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { Resend } from 'resend';

// Lazy initialization to avoid build errors when env vars are not set
function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

function getServiceAccountAuth() {
  return new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const now = new Date();
    const timestamp = now.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // 1. Save to Google Sheets
    if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      try {
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, getServiceAccountAuth());
        await doc.loadInfo();

        // Get or create the Contact sheet
        let sheet = doc.sheetsByTitle['Contact'];
        if (!sheet) {
          sheet = await doc.addSheet({
            title: 'Contact',
            headerValues: ['Timestamp', 'Name', 'Email', 'Subject', 'Message']
          });
        }

        // Add the row
        await sheet.addRow({
          'Timestamp': timestamp,
          'Name': data.name,
          'Email': data.email,
          'Subject': data.subject,
          'Message': data.message,
        });

        console.log('✅ Contact data saved to Google Sheets');
      } catch (sheetError) {
        console.error('❌ Google Sheets error:', sheetError instanceof Error ? sheetError.message : sheetError);
        // Continue even if Sheets fails - we'll still try to send email
      }
    } else {
      console.warn('⚠️ Google Sheets not configured - skipping');
    }

    // 2. Send email notification to admin via Resend
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        await getResend().emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Contact Form <onboarding@resend.dev>',
          to: process.env.NOTIFICATION_EMAIL,
          subject: `📩 New Contact Message: ${data.subject}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #222120; border-bottom: 2px solid #C4A962; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>

              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background: #f9f9f9;">
                  <td style="padding: 12px; border: 1px solid #eee; font-weight: bold; width: 140px;">Name</td>
                  <td style="padding: 12px; border: 1px solid #eee;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #eee; font-weight: bold;">Email</td>
                  <td style="padding: 12px; border: 1px solid #eee;">
                    <a href="mailto:${data.email}" style="color: #222120;">${data.email}</a>
                  </td>
                </tr>
                <tr style="background: #f9f9f9;">
                  <td style="padding: 12px; border: 1px solid #eee; font-weight: bold;">Subject</td>
                  <td style="padding: 12px; border: 1px solid #eee;">${data.subject}</td>
                </tr>
              </table>

              <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
                <h3 style="margin: 0 0 10px 0; color: #222120;">Message:</h3>
                <p style="margin: 0; color: #444; line-height: 1.6;">${data.message}</p>
              </div>

              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px;">
                Submitted on ${timestamp} IST
              </p>
            </div>
          `,
        });

        console.log('✅ Admin notification sent');
      } catch (emailError) {
        console.error('❌ Admin email error:', emailError);
      }
    } else {
      console.warn('⚠️ Resend not configured - skipping email notification');
    }

    // 3. Send confirmation email to sender
    if (process.env.RESEND_API_KEY && data.email) {
      try {
        await getResend().emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Protect The People Foundation <onboarding@resend.dev>',
          to: data.email,
          subject: `We've Received Your Message! ✉️`,
          html: `
            <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #222120 0%, #3d3a38 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Message Received!</h1>
                <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 16px;">Thank you for reaching out to us</p>
              </div>

              <!-- Message -->
              <div style="padding: 30px;">
                <p style="color: #333; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0;">
                  Dear <strong>${data.name}</strong>,
                </p>
                <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;">
                  Thank you for contacting <strong>Protect The People Foundation</strong>. We've received your message and our team will review it promptly.
                </p>
                <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 25px 0;">
                  You can expect to hear back from us within <strong>24-48 hours</strong>.
                </p>

                <!-- Message Summary -->
                <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 25px 0;">
                  <h3 style="margin: 0 0 15px 0; color: #222120; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Message Summary</h3>
                  <table style="width: 100%; font-size: 14px;">
                    <tr>
                      <td style="padding: 8px 0; color: #666;">Subject</td>
                      <td style="padding: 8px 0; color: #222120; text-align: right; font-weight: 500;">${data.subject}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666;">Submitted</td>
                      <td style="padding: 8px 0; color: #222120; text-align: right;">${timestamp}</td>
                    </tr>
                  </table>
                </div>

                <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 25px 0 0 0;">
                  With gratitude,<br>
                  <strong style="color: #222120;">The Protect The People Foundation Team</strong>
                </p>
              </div>

              <!-- Footer -->
              <div style="background: #f8f9fa; padding: 25px 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #eee;">
                <p style="margin: 0 0 10px 0; color: #888; font-size: 13px;">
                  Questions? Simply reply to this email - we're happy to help!
                </p>
                <p style="margin: 0; color: #aaa; font-size: 12px;">
                  © ${new Date().getFullYear()} Protect The People Foundation. All rights reserved.
                </p>
              </div>
            </div>
          `,
        });

        console.log('✅ Contact confirmation email sent to:', data.email);
      } catch (emailError) {
        console.error('❌ Contact email error:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit message. Please try again.' },
      { status: 500 }
    );
  }
}
