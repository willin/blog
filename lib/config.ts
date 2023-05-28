export const BaseURL = process.env.BASE_URL || 'https://willin.wang';
// email, uid, username
export const AdminType: 'email' | 'uid' | 'username' = (process.env.ADMIN_TYPE as 'username') || 'username';
export const AdminId = process.env.ADMIN_ID || 'willin';
