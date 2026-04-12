import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for analytics - replace with database in production
let analyticsData: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const {
      event,
      page,
      userId,
      sessionId,
      userAgent,
      referrer,
      timestamp,
      metadata = {},
    } = await request.json();

    // Validate required fields
    if (!event || !page) {
      return NextResponse.json(
        { error: 'Missing required fields: event and page' },
        { status: 400 }
      );
    }

    // Create analytics entry
    const analyticsEntry = {
      id: `analytics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      event,
      page,
      userId: userId || null,
      sessionId: sessionId || generateSessionId(),
      userAgent,
      referrer,
      timestamp: timestamp || new Date().toISOString(),
      metadata,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    };

    analyticsData.push(analyticsEntry);

    // Clean up old data (keep last 1000 entries for demo)
    if (analyticsData.length > 1000) {
      analyticsData = analyticsData.slice(-1000);
    }

    return NextResponse.json({
      message: 'Analytics event recorded',
      eventId: analyticsEntry.id,
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to record analytics event' },
      { status: 500 }
    );
  }
}

// Get analytics data (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const event = searchParams.get('event');
    const page = searchParams.get('page');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = parseInt(searchParams.get('limit') || '100');

    let filteredData = analyticsData;

    // Filter by event type
    if (event) {
      filteredData = filteredData.filter(item => item.event === event);
    }

    // Filter by page
    if (page) {
      filteredData = filteredData.filter(item => item.page === page);
    }

    // Filter by date range
    if (startDate || endDate) {
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.timestamp);
        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date();
        return itemDate >= start && itemDate <= end;
      });
    }

    // Sort by timestamp (newest first)
    filteredData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Limit results
    const limitedData = filteredData.slice(0, limit);

    // Aggregate data for common metrics
    const metrics = {
      totalEvents: filteredData.length,
      uniqueSessions: new Set(filteredData.map(item => item.sessionId)).size,
      uniqueUsers: new Set(filteredData.map(item => item.userId).filter(Boolean)).size,
      pageViews: filteredData.filter(item => item.event === 'page_view').length,
      conversions: filteredData.filter(item => item.event === 'conversion').length,
      topPages: getTopPages(filteredData),
      eventsByType: getEventsByType(filteredData),
    };

    return NextResponse.json({
      data: limitedData,
      metrics,
      total: filteredData.length,
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

// Generate a simple session ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get top pages by views
function getTopPages(data: any[]): any[] {
  const pageCounts: { [key: string]: number } = {};

  data.filter(item => item.event === 'page_view').forEach(item => {
    pageCounts[item.page] = (pageCounts[item.page] || 0) + 1;
  });

  return Object.entries(pageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([page, count]) => ({ page, count }));
}

// Get events by type
function getEventsByType(data: any[]): any[] {
  const eventCounts: { [key: string]: number } = {};

  data.forEach(item => {
    eventCounts[item.event] = (eventCounts[item.event] || 0) + 1;
  });

  return Object.entries(eventCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([event, count]) => ({ event, count }));
}