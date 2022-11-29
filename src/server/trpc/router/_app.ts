import { router } from '../trpc'
import { authRouter } from './auth'
import { editorRouter } from './editor'

export const appRouter = router({
	editor: editorRouter,
	// auth: authRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
