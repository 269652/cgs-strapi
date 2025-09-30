export default ({ env }) => ({
  preview: {
    enabled: true,
    config: {
      allowedOrigins: env("CLIENT_URL"),
      async handler(uid, { documentId, locale, status }) {
        const clientUrl = env("CLIENT_URL");
        // Handler implementation coming in step 3
        // Fetch the complete document from Strapi
        const document = await strapi.documents(uid).findOne({ documentId });

        // Generate the preview pathname based on content type and document
        const pathname = "/";

        // Disable preview if the pathname is not found
        if (!pathname) {
          return null;
        }

        // Use Next.js draft mode passing it a secret key and the content-type status
        const urlSearchParams = new URLSearchParams({
          url: pathname,
          // secret: previewSecret,
          status,
        });

        return `${clientUrl}/api/preview?${urlSearchParams}`;
      },
    },
  },
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  secrets: {
    encryptionKey: env("ENCRYPTION_KEY"),
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
});
