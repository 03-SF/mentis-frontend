import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Webhook endpoint for Strapi to trigger revalidation
 * When an article is published/updated/deleted in Strapi,
 * this endpoint will be called to refresh the blog pages
 */
export async function POST(request: NextRequest) {
  try {
    // Verify the request comes from Strapi (optional but recommended)
    const authHeader = request.headers.get('authorization');
    const webhookSecret = process.env.WEBHOOK_SECRET;

    // If webhook secret is configured, verify it
    if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse the webhook payload (optional)
    const body = await request.json();
    console.log('Revalidation triggered by Strapi:', body);

    // Revalidate blog pages
    revalidatePath('/blog');
    revalidatePath('/blog/[slug]', 'page');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({
      revalidated: true,
      message: 'Blog pages revalidated successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to revalidate',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Optional: Allow GET requests for manual testing
export async function GET(request: NextRequest) {
  // Verify authorization for manual triggers
  const authHeader = request.headers.get('authorization');
  const webhookSecret = process.env.WEBHOOK_SECRET;

  if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized - use POST with proper authorization' },
      { status: 401 }
    );
  }

  try {
    // Revalidate blog pages
    revalidatePath('/blog');
    revalidatePath('/blog/[slug]', 'page');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({
      revalidated: true,
      message: 'Manual revalidation triggered successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to revalidate',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
