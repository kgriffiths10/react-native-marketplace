// API Route: /(api)/listings/editListing
// Fetch detailed listing information by listing_id

import { neon } from '@neondatabase/serverless';

export async function GET(request: Request) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);

        // Parse `listing_id` from the query parameters
        const url = new URL(request.url);
        const listingId = url.searchParams.get('listing_id');

        if (!listingId) {
            return new Response(JSON.stringify({ error: 'listing_id is required' }), { status: 400 });
        }

        // Validate listingId is a valid UUID
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (!uuidRegex.test(listingId)) {
            return new Response(JSON.stringify({ error: 'Invalid listing_id format' }), { status: 400 });
        }

        // Query the listings table to fetch detailed information
        const listingResponse = await sql`
            SELECT * FROM listings WHERE listing_id = ${listingId}
        `;

        if (listingResponse.length === 0) {
            return new Response(JSON.stringify({ error: 'Listing not found' }), { status: 404 });
        }

        // Return the detailed listing data
        return new Response(JSON.stringify({ data: listingResponse[0] }), { status: 200 });
    } catch (error) {
        console.error('Error fetching listing details for edit:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
