import { post } from "./post";
import { product } from "./product";
import { shopProduct } from "./shop-product";
import { appDevelopmentProject } from "./app-development-project";
import { graphicDesignProject } from "./graphic-design-project";
import { projectVideo } from "./project-video";
import { videoEditingProject } from "./video-editing-project";
import { virtualAssistantProject } from "./virtual-assistant-project";
import { webDevelopmentProject } from "./web-development-project";

export const schemaTypes = [
	post,
	product,
	shopProduct,
	projectVideo,
	videoEditingProject,
	graphicDesignProject,
	webDevelopmentProject,
	appDevelopmentProject,
	virtualAssistantProject,
];
