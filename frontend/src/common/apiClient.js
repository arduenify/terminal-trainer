const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

const handleResponse = async (response) => {
    const json = await response.json();

    if (!response.ok) {
        const error = new Error(
            `${response.status} ${response.statusText} - ${json.message}`,
        );

        error.responseJson = json;
    }

    return json;
};

const apiClient = {
    get: async (path) => {
        const response = await fetch(`/api${path}`, {
            headers,
        });

        return handleResponse(response);
    },

    post: async (path, data) => {
        const response = await fetch(`/api${path}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        return handleResponse(response);
    },

    put: async (path, data) => {
        const response = await fetch(`/api${path}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data),
        });

        return handleResponse(response);
    },

    delete: async (path) => {
        const response = await fetch(`/api${path}`, {
            method: 'DELETE',
            headers,
        });

        return handleResponse(response);
    },
};

export default apiClient;
