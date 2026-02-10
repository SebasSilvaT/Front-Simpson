export const fetchCharacter = async (id) => {
    try {
        const response = await fetch(`https://thesimpsonsapi.com/api/characters/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Handle array vs object response just in case
        if (Array.isArray(data)) {
            return data[0];
        }
        return data;
    } catch (error) {
        console.error('Error fetching character:', error);
        throw error;
    }
};

export const fetchCharacters = async () => {
    try {
        const response = await fetch('https://thesimpsonsapi.com/api/characters');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.results || (Array.isArray(data) ? data : []);
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
};

export const fetchEpisodes = async () => {
    try {
        const response = await fetch('https://thesimpsonsapi.com/api/episodes');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.results || (Array.isArray(data) ? data : []);
    } catch (error) {
        console.error('Error fetching episodes:', error);
        throw error;
    }
};

export const fetchLocations = async () => {
    try {
        const response = await fetch('https://thesimpsonsapi.com/api/locations');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.results || (Array.isArray(data) ? data : []);
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};
