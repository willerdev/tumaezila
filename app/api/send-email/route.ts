import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const formData = await req.json();

  // Create a transporter using SMTP
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content
  let mailOptions = {
    from: `"Tuma ezila" <${formData.email}>`,
    to: formData.email,
    subject: "Your Order Details - Tuma ezila",
    text: `
      Thank you for your order!

      Order Details:
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Address: ${formData.address}
      Product: ${formData.product}
      Brand: ${formData.brand}
      Color: ${formData.color}
      Memory: ${formData.memory}
      RAM: ${formData.ram}
      Price Range: ${formData.priceRange}
      Payment Method: ${formData.paymentMethod}

      We'll process your order soon and contact you with further details.

      Best regards,
      Tuma ezila Team
    `,
    html: `
      <h1>Thank you for your order!</h1>
      <h2>Order Details:</h2>
      <ul>
        <li><strong>Name:</strong> ${formData.name}</li>
        <li><strong>Email:</strong> ${formData.email}</li>
        <li><strong>Phone:</strong> ${formData.phone}</li>
        <li><strong>Address:</strong> ${formData.address}</li>
        <li><strong>Product:</strong> ${formData.product}</li>
        <li><strong>Brand:</strong> ${formData.brand}</li>
        <li><strong>Color:</strong> ${formData.color}</li>
        <li><strong>Memory:</strong> ${formData.memory}</li>
        <li><strong>RAM:</strong> ${formData.ram}</li>
        <li><strong>Price Range:</strong> ${formData.priceRange}</li>
        <li><strong>Payment Method:</strong> ${formData.paymentMethod}</li>
      </ul>
      <p>We'll process your order soon and contact you with further details.</p>
      <p>Best regards,<br>Tuma ezila Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
