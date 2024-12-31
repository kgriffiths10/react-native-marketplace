// Fetch detailed listing information by listing_id

import { neon } from '@neondatabase/serverless';
import { validate as isUUID } from 'uuid'; // Import UUID validation function

export async function GET(request: Request) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);

        // Parse `listing_id` from the query parameters
        const url = new URL(request.url);
        const listingId = url.searchParams.get('listing_id');

        if (!listingId) {
            return new Response(JSON.stringify({ error: 'listing_id is required' }), { status: 400 });
        }

        if (!isUUID(listingId)) {
            return new Response(JSON.stringify({ error: 'Invalid listing_id format' }), { status: 400 });
        }

        // Query the listings table to fetch detailed information along with user details
        const listingResponse = await sql`
            SELECT l.*, u.first_name, u.last_name
            FROM listings l
            JOIN users u ON l.user_id = u.user_id
            WHERE l.listing_id = ${listingId}
        `;

        if (listingResponse.length === 0) {
            return new Response(JSON.stringify({ error: 'Listing not found' }), { status: 404 });
        }

        // Return the detailed listing data along with user details
        return new Response(JSON.stringify({ data: listingResponse[0] }), { status: 200 });
    } catch (error) {
        console.error('Error fetching detail marketplace listing details:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}

// listings table schema:
// listing_id: UUID
// user_id: 2

// users table schema:
// user_id: 2
// first_name: string
// last_name: string