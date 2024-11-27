// API Route: /(api)/userListings

import { neon } from '@neondatabase/serverless';

export async function GET(request: Request) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);

        // Parse `clerkID` from the query parameters
        const url = new URL(request.url);
        const clerkID = url.searchParams.get('clerkID');

        if (!clerkID) {
            return new Response(JSON.stringify({ error: 'clerkID is required' }), { status: 400 });
        }

        // Query the users table to get user_id based on clerkID
        const userResponse = await sql`
            SELECT user_id FROM users WHERE clerk_id = ${clerkID}
        `;

        if (userResponse.length === 0) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        // Use the user_id to query listings
        const userId = userResponse[0].user_id;

        const listingsResponse = await sql`
            SELECT * FROM listings WHERE user_id = ${userId}
        `;

        if (listingsResponse.length === 0) {
            return new Response(JSON.stringify({ error: 'No listings found for this user' }), { status: 404 });
        }

        // Combine the user data with their listings data (if needed)
        const userListingData = {
            user_id: userId,
            listings: listingsResponse, // The listings for this user
        };

        return new Response(JSON.stringify({ data: userListingData }), { status: 200 });
        
    } catch (error) {
        console.error('Error fetching user listings:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
