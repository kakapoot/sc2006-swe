import useSWR from 'swr';
import { useState, useEffect } from 'react';

/* Utility function to fetch data from an API*/
export const fetcher = async (...args) => {
    const response = await fetch(...args)

    if (!response.ok) {
        const error = new Error("An error occurred while fetching the data.")
        throw error
    }
    return response.json()
}

/* Utility function to fetch available tags from database */
export const useTags = () => {
    // fetch available tags in database
    const { data, error, isLoading } = useSWR(`http://localhost:5000/get_tags`, fetcher)

    return ({
        data,
        error,
        isLoading
    })
}

/* Utility function to fetch user rights for the given user and group from database */
export const useUserRights = (username, groupId) => {
    // fetch user rights for group based on currently authenticated user
    const { data, error, isLoading, mutate } = useSWR(`http://localhost:5000/get_user_rights/${username}?groupId=${groupId}`, fetcher)

    const [userRights, setUserRights] = useState({
        isGroupOwner: false,
        isGroupMember: false,
        isFetched: false
    })

    // set user rights based on fetched data
    useEffect(() => {
        // data not fetched yet
        if (!data) {
            return
        }

        switch (data.message) {
            case "user is an owner":
                setUserRights({
                    isGroupOwner: true,
                    isGroupMember: true,
                    isFetched: true
                })
                break

            case "user is a member":
                setUserRights({
                    isGroupOwner: false,
                    isGroupMember: true,
                    isFetched: true
                })
                break

            case "user is not owner or member":
                setUserRights({
                    isGroupOwner: false,
                    isGroupMember: false,
                    isFetched: true
                })
                break
            default:
            // error

        }
    }, [data])

    return ({
        data,
        error,
        isLoading,
        mutate,
        userRights
    })
}

/* Utility function to fetch given group data from database */
export const useGroup = (groupId) => {
    // fetch group data based on group ID
    const { data, error, isLoading, mutate } = useSWR(`http://localhost:5000/get_group/${groupId}`, fetcher)

    return ({
        data,
        error,
        isLoading,
        mutate
    })
}

/* Utility function to fetch current user data from database */
export const useUserProfile = (username) => {
    // fetch user profile data based on username
    const { data, error, isLoading, mutate } = useSWR(`http://localhost:5000/get_user/${username}`, fetcher)

    return ({
        data,
        error,
        isLoading,
        mutate
    })
}

/* Utility function to fetch list of group members for given group from database */
export const useGroupMembers = (groupId) => {
    // fetch list of members details based on group ID
    const { data, error, isLoading, mutate } = useSWR(`http://localhost:5000/get_group_members/${groupId}`, fetcher)

    return ({
        data,
        error,
        isLoading,
        mutate
    })
}

/* Utility function to fetch list of groups the given user is currently in from database */
export const useUserGroups = (username) => {
    // fetch groups data from firebase based on currently authenticated user
    const { data, error, isLoading, mutate } = useSWR(`http://localhost:5000/get_my_groups/${username}`, fetcher)

    return ({
        data,
        error,
        isLoading,
        mutate
    })
}

/* Utility function to fetch all available study areas data from database */
export const useStudyAreas = () => {
    // fetch available study areas data
    const { data, error, isLoading, mutate } = useSWR(`http://localhost:5000/get_available_places`, fetcher)

    return ({
        data,
        error,
        isLoading,
        mutate
    })
}