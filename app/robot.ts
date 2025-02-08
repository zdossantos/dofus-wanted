export default function robots() {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: process.env.app_url + '/sitemap.xml',
	}
}