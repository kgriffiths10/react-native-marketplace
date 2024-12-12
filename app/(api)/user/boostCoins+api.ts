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

        const response = await sql`
            SELECT boost_coins FROM users WHERE clerk_id = ${clerkID}
        `;

        if (response.length === 0) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        const boostCoins = response[0].boost_coins;
        return new Response(JSON.stringify({ boostCoins }), { status: 200 });

    } catch (error) {
        console.error('Error fetching user listings:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
