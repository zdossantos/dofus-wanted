export default async function sitemap() {
	return [
		{
			url: process.env.app_url ,
			lastModified: new Date(),
		},
	]
}