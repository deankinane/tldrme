import { router } from '../trpc'
import { editorRouter } from './editor'
import { viewerRouter } from './viewer'

export const appRouter = router({
	editor: editorRouter,
	viewer: viewerRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
