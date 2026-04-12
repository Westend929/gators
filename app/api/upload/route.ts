import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const bookingId = data.get('bookingId') as string;
    const documentType = data.get('documentType') as string; // 'passport', 'visa', 'insurance', etc.

    if (!file || !bookingId || !documentType) {
      return NextResponse.json(
        { error: 'Missing required fields: file, bookingId, or documentType' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and PDF files are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substr(2, 9);
    const fileExtension = file.name.split('.').pop();
    const filename = `${documentType}_${bookingId}_${timestamp}_${randomId}.${fileExtension}`;

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'uploads', bookingId);
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, continue
    }

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = join(uploadDir, filename);

    await writeFile(filePath, buffer);

    // In production, you might want to upload to cloud storage (AWS S3, Cloudinary, etc.)
    // and store the URL instead of local path

    const fileUrl = `/api/uploads/${bookingId}/${filename}`;

    return NextResponse.json({
      message: 'File uploaded successfully',
      file: {
        filename,
        originalName: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl,
        documentType,
        bookingId,
        uploadedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'File upload failed' },
      { status: 500 }
    );
  }
}

// Get uploaded files for a booking
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    // In a real application, you would query your database for uploaded files
    // For now, return a placeholder response
    const uploadedFiles: any[] = [
      // This would be populated from your database
    ];

    return NextResponse.json({
      files: uploadedFiles,
      bookingId,
    });
  } catch (error) {
    console.error('Files fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch uploaded files' },
      { status: 500 }
    );
  }
}