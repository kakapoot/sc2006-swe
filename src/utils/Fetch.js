import useSWR from 'swr';
import { useState, useEffect } from 'react';

export const fetcher = async (...args) => {
    const response = await fetch(...args)

    if (!response.ok) {
        const error = new Error("An error occurred while fetching the data.")
        throw error
    }
    return response.json()
}

export const useTags = () => {
    // fetch available tags in database
    const { data, error, isLoading } = useSWR(`http://localhost:5000/get_tags`, fetcher)

    return ({
        data,
        error,
        isLoading
    })
}

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