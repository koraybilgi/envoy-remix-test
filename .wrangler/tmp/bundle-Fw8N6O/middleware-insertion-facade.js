				import worker, * as OTHER_EXPORTS from "/home/vincaslt/remix-cf-demo-app/.wrangler/tmp/pages-zaAUPR/functionsWorker-0.5908403755061624.mjs";
				import * as __MIDDLEWARE_0__ from "/home/vincaslt/remix-cf-demo-app/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts";
				const envWrappers = [__MIDDLEWARE_0__.wrap].filter(Boolean);
				const facade = {
					...worker,
					envWrappers,
					middleware: [
						__MIDDLEWARE_0__.default,
            ...(worker.middleware ? worker.middleware : []),
					].filter(Boolean)
				}
				export * from "/home/vincaslt/remix-cf-demo-app/.wrangler/tmp/pages-zaAUPR/functionsWorker-0.5908403755061624.mjs";

				const maskDurableObjectDefinition = (cls) =>
					class extends cls {
						constructor(state, env) {
							let wrappedEnv = env
							for (const wrapFn of envWrappers) {
								wrappedEnv = wrapFn(wrappedEnv)
							}
							super(state, wrappedEnv);
						}
					};
				

				export default facade;