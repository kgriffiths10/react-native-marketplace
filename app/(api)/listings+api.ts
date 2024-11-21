import { neon } from '@neondatabase/serverless';

// API Route: /(api)/listings

export async function GET(request: Request) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);

        // Query the categories table to get all categories
        const response = await sql`
            SELECT listings.*, categories.category_name
            FROM listings
            JOIN categories ON listings.category_id = categories.category_id;

        `;


        if (response.length === 0) {
            return new Response(JSON.stringify({ error: 'listings not found' }), { status: 404 });
        }
        console.log('console.log response from api route:', response);
        return new Response(JSON.stringify({ data: response }), { status: 200 });

    } catch (error) {
        console.log('Error fetching listings:', error);
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
};