const { i18n } = require('./next-i18next.config')
module.exports = {
	i18n
}
export default {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				search: ''
			},
			{
				protocol: 'https',
				hostname: '*.public.blob.vercel-storage.com',
				search: ''
			},
			{
				protocol: 'https',
				hostname: 'api.dofusdb.fr',
				search: ''
			}
		]
	}
};
