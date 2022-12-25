import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { trpc } from '../utils/trpc'
import '../styles/globals.css'

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<div className="h-full bg-gradient-to-bl from-indigo-800 to-black">
				<Component {...pageProps} />
			</div>
		</SessionProvider>
	)
}

export default trpc.withTRPC(MyApp)
