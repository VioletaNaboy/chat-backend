import axios from 'axios';

export async function getRandomQuote(): Promise<string> {
    try {
        const response = await axios.get('https://api.quotable.io/random');
        return response.data.content;
    } catch (err) {
        return 'Error fetching quote';
    }
}
