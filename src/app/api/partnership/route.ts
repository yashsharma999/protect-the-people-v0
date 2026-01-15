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

interface PartnershipData {
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  partnershipType: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: PartnershipData = await request.json();

    // Validate required fields
    if (!data.organizationName || !data.contactPerson || !data.email || !data.phone || !data.partnershipType || !data.message) {
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

        // Get or create the Partnerships sheet
        let sheet = doc.sheetsByTitle['Partnerships'];
        if (!sheet) {
          sheet = await doc.addSheet({
            title: 'Partnerships',
            headerValues: ['Timestamp', 'Organization Name', 'Contact Person', 'Email', 'Phone', 'Partnership Type', 'Message/Proposal']
          });
        }

        // Add the row
        await sheet.addRow({
          'Timestamp': timestamp,
          'Organization Name': data.organizationName,
          'Contact Person': data.contactPerson,
          'Email': data.email,
          'Phone': data.phone,
          'Partnership Type': data.partnershipType,
          'Message/Proposal': data.message,
        });

        console.log('✅ Partnership inquiry saved to Google Sheets');
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
        // Format partnership type for display
        const partnershipTypeMap: Record<string, string> = {
          'csr': 'CSR Initiative',
          'sponsorship': 'Sponsorship',
          'collaboration': 'Collaboration',
          'other': 'Other',
        };
        const formattedType = partnershipTypeMap[data.partnershipType] || data.partnershipType;

        await getResend().emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Partnership Inquiry <onboarding@resend.dev>',
          to: process.env.NOTIFICATION_EMAIL,
          subject: `🤝 New Partnership Inquiry: ${data.organizationName}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #222120; border-bottom: 2px solid #C4A962; padding-bottom: 10px;">
                New Partnership Inquiry
              </h2>

              <div style="background: linear-gradient(135deg, #E85A4F 0%, #c4483f 100%); color: white; padding: 15px 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
                <p style="margin: 0; font-size: 18px; font-weight: bold;">${data.organizationName}</p>
                <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">${formattedType}</p>
              </div>

              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background: #f9f9f9;">
                  <td style="padding: 12px; border: 1px solid #eee; font-weight: bold; width: 140px;">Organization</td>
                  <td style="padding: 12px; border: 1px solid #eee;">${data.organizationName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #eee; font-weight: bold;">Contact Person</td>
                  <td style="padding: 12px; border: 1px solid #eee;">${data.contactPerson}</td>
                </tr>
                <tr style="background: #f9f9f9;">
                  <td style="padding: 12px; border: 1px solid #eee; font-weight: bold;">Email</td>
                  <td style="padding: 12px; border: 1px solid #eee;">
                    <a href="mailto:${data.email}" style="color: #222120;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #eee; font-weight: bold;">Phone</td>
                  <td style="padding: 12px; border: 1px solid #eee;">
                    <a href="tel:${data.phone}" style="color: #222120;">${data.phone}</a>
                  </td>
                </tr>
                <tr style="background: #f9f9f9;">
                  <td style="padding: 12px; border: 1px solid #eee; font-weight: bold;">Partnership Type</td>
                  <td style="padding: 12px; border: 1px solid #eee;">${formattedType}</td>
                </tr>
              </table>

              <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
                <h3 style="margin: 0 0 10px 0; color: #222120;">Message / Proposal:</h3>
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

    // 3. Send confirmation email to partner
    if (process.env.RESEND_API_KEY && data.email) {
      try {
        // Format partnership type for display
        const partnershipTypeMap: Record<string, string> = {
          'csr': 'CSR Initiative',
          'sponsorship': 'Sponsorship',
          'collaboration': 'Collaboration',
          'other': 'Other',
        };
        const formattedType = partnershipTypeMap[data.partnershipType] || data.partnershipType;

        await getResend().emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Protect The People Foundation <onboarding@resend.dev>',
          to: data.email,
          subject: `Partnership Inquiry Received - ${data.organizationName} 🤝`,
          html: `
            <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #222120 0%, #3d3a38 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Inquiry Received! 🎉</h1>
                <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 16px;">Thank you for your interest in partnering with us</p>
              </div>

              <!-- Partnership Type Badge -->
              <div style="background: linear-gradient(135deg, #E85A4F 0%, #c4483f 100%); padding: 20px; text-align: center; margin: -1px 0;">
                <p style="margin: 0; font-size: 16px; color: white; font-weight: 600;">🤝 ${formattedType} Partnership</p>
              </div>

              <!-- Message -->
              <div style="padding: 30px;">
                <p style="color: #333; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0;">
                  Dear <strong>${data.contactPerson}</strong>,
                </p>
                <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;">
                  Thank you for reaching out to <strong>Protect The People Foundation</strong> regarding a potential partnership with <strong>${data.organizationName}</strong>. We're excited to explore how we can work together to create meaningful impact.
                </p>
                <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 25px 0;">
                  We've received your inquiry and our partnerships team will review it carefully. You can expect to hear back from us within <strong>2-3 business days</strong>.
                </p>

                <!-- Inquiry Summary -->
                <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 25px 0;">
                  <h3 style="margin: 0 0 15px 0; color: #222120; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Inquiry Summary</h3>
                  <table style="width: 100%; font-size: 14px;">
                    <tr>
                      <td style="padding: 8px 0; color: #666;">Organization</td>
                      <td style="padding: 8px 0; color: #222120; text-align: right; font-weight: 500;">${data.organizationName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666;">Partnership Type</td>
                      <td style="padding: 8px 0; color: #222120; text-align: right; font-weight: 500;">${formattedType}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666;">Submitted</td>
                      <td style="padding: 8px 0; color: #222120; text-align: right;">${timestamp}</td>
                    </tr>
                  </table>
                </div>

                <!-- What's Next -->
                <div style="background: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                  <h4 style="margin: 0 0 10px 0; color: #2e7d32; font-size: 14px;">What happens next?</h4>
                  <ol style="margin: 0; padding-left: 20px; color: #555; font-size: 14px; line-height: 1.8;">
                    <li>Our partnerships team reviews your inquiry</li>
                    <li>We'll schedule a call to discuss your proposal</li>
                    <li>Together, we'll explore collaboration opportunities</li>
                  </ol>
                </div>

                <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 25px 0 0 0;">
                  We look forward to the possibility of working together to make a positive impact in communities.
                </p>

                <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 25px 0 0 0;">
                  Warm regards,<br>
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

        console.log('✅ Partnership confirmation email sent to:', data.email);
      } catch (emailError) {
        console.error('❌ Partnership email error:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Partnership inquiry submitted successfully'
    });

  } catch (error) {
    console.error('Partnership submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry. Please try again.' },
      { status: 500 }
    );
  }
}
