import { cookies } from "next/headers";

export async function GET(req, context) {
    const {courseSlug, lessonId} = await context.params;
    const backendUrl = `http://localhost:8000/api/courses/${courseSlug}/lessons/${lessonId}/stream/`;
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(backendUrl, {
        headers: {
            authorization: token ? `Token ${token}` : "",
            cookie: req.headers.get("cookie") || "",
            range: req.headers.get("range") || "",
        },
        credentials: "include",  // ✅ ensures cookies are respected
    });

    // Copy headers
    const headers = new Headers();
    response.headers.forEach((value, key) => {
        headers.set(key, value);
    });

    return new Response(response.body, {
        status: response.status,
        headers,
    });
}
