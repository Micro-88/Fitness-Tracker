import jwt from 'jsonwebtoken';

//added password field in UserProfileModel

export function GetUserProfileInToken(): UserProfileModel {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) return { age: '', gender: '', id: '', username: '', password: '' };

    const userProfile = jwt.decode(token) as UserProfileModel;

    return userProfile;
}

export interface UserProfileModel {
    id: string,
    username: string,
    password: string,
    gender: string,
    age: string,
}