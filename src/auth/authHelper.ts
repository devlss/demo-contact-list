const AUTH_KEY = 'auth';

export function getAuthKey() {
	return window && window.localStorage.getItem(AUTH_KEY);
}

export function setAuthKey(authKey: string) {
	window && window.localStorage.setItem(AUTH_KEY, authKey);
}

export function removeAuthKey() {
	window && window.localStorage.removeItem(AUTH_KEY);
}

export function encodeAuthKey(login: string, password: string) {
	return btoa(`${login}:${password}`);
}
