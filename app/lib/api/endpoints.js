export const ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login/",
        LOGOUT: "/auth/logout/",
    },
    USER: {
        PROFILE: "/auth/profile/",
    },
    COURSES: {
        LIST: "/courses/",
        DETAIL: (slug) => `/courses/${slug}/`,
    },
};
