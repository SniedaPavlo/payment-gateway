let token;

/**
 * set user token NOTe: it will only work on client side
 * @params string
 */
export const setToken = (t) => {
	if (typeof window !== "undefined") {
		token = t;
		localStorage.setItem("token", token);
	}
};
/**
 * Get current user token
 * @returns {string}
 */
export const getToken = () => {
	if (typeof window !== "undefined") {
		const t = localStorage.getItem("token");
		return t || token;
	}
};

export const removeToken = () => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("token");
	}
};
