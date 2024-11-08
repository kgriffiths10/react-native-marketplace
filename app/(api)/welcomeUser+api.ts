// API Route: /(api)/welcomeUser

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

        // Query the users table to get first_name and last_name based on clerkID
        const response = await sql`
            SELECT first_name, last_name FROM users WHERE clerk_id = ${clerkID}
        `;

        if (response.length === 0) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        const userData = response[0];
        return new Response(JSON.stringify({ data: userData }), { status: 200 });

    } catch (error) {
        console.log('Error fetching user:', error);
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}


// Recieve a request, get data from database, and send back a response with user's info