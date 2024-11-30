import jwt from 'jsonwebtoken';

export function GetUserProfileInToken(): UserProfileModel {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if(!token) return { age:'', gender: '', id: '', username: '' };

    const userProfile = jwt.decode(token) as UserProfileModel;

    return userProfile;
}

export interface UserProfileModel {
    id: string,
    username: string,
    gender: string,
    age: string,
}