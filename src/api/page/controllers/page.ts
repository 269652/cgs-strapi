import { factories } from "@strapi/strapi";
import { isEmpty, merge } from "lodash";

interface ModelAttribute {
	type: string;
	component?: string;
	components?: string[];
	target?: string;
}

interface Model {
	uid: string;
	attributes: Record<string, ModelAttribute>;
}

const SYSTEM_FIELDS = [
	'createdBy', 'updatedBy', 'roles', 'permissions', 'localizations', 'publishedAt', 'createdAt', 'updatedAt', 'documentId', 'id'
];

const getPopulationAttributes = (
	model: Model
): Record<string, ModelAttribute> => {
	if (model.uid === "plugin::upload.file") {
		const { related, ...attrs } = model.attributes;
		return attrs;
	}
	return Object.fromEntries(
		Object.entries(model.attributes).filter(([key]) => !SYSTEM_FIELDS.includes(key))
	);
};

const getDeepPopulate = (
	modelUid: string,
	maxDepth: number = 4,
	strapi: any,
	visited: Set<string> = new Set()
	): any => {
		if (maxDepth <= 1 || visited.has(modelUid)) return true;
		visited.add(modelUid);

		const model = strapi.contentTypes[modelUid] || strapi.components[modelUid];
		if (!model) return true;

		const populate: Record<string, any> = {};

		for (const [key, attr] of Object.entries(getPopulationAttributes(model))) {
			if (!attr) continue;

			switch (attr.type) {
				case "component":
					populate[key] = getDeepPopulate(attr.component!, maxDepth - 1, strapi, new Set(visited));
					break;

				case "dynamiczone":
					const onPopulate: Record<string, any> = {};
					attr.components?.forEach((compUid: string) => {
						onPopulate[compUid] = getDeepPopulate(compUid, maxDepth - 1, strapi, new Set(visited));
					});
					populate[key] = { on: onPopulate };
					break;

				case "relation":
					populate[key] = getDeepPopulate(attr.target!, maxDepth - 1, strapi, new Set(visited));
					break;

				case "media":
					populate[key] = true;
					break;

				default:
					break;
			}
		}

		// Special handling for image-gallery.image-gallery and image.image components
		if (modelUid === 'image-gallery.image-gallery' && populate.images === undefined) {
			// Ensure images field is deeply populated
			populate.title = true;
			populate.images = getDeepPopulate('image.image', maxDepth - 1, strapi, new Set(visited));
		}
		if (modelUid === 'image.image' && populate.file === undefined) {
			// Ensure file field is populated
			populate.file = true;
		}

		return isEmpty(populate) ? true : { populate };
	};

export default factories.createCoreController(
	"api::page.page",
	({ strapi }: { strapi: any }) => ({
		async find(ctx) {
			const deepPopulate = getDeepPopulate("api::page.page", 10, strapi);
			ctx.query = {
				...ctx.query,
				...(typeof deepPopulate === "object" ? deepPopulate : { populate: deepPopulate })
			};
			return await super.find(ctx);
		},
	})
);
