const fetcher = async (...args) => {
    const response = await fetch(...args)

    if (!response.ok) {
        const error = new Error("An error occurred while fetching the data.")
        throw error
    }
    return response.json()
}

export { fetcher }
