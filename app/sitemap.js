export default function sitemap() {
  const baseUrl = 'https://إتقان.com';
  
  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  // Dynamic routes - you can fetch from your API
  // const courses = await fetch('your-api-endpoint/courses').then(res => res.json());
  // const courseRoutes = courses.map(course => ({
  //   url: `${baseUrl}/courses/${course.slug}`,
  //   lastModified: new Date(course.updated_at),
  //   changeFrequency: 'weekly',
  //   priority: 0.8,
  // }));

  return [...staticRoutes];
}
