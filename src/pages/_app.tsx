import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { trpc } from '../utils/trpc'
import '../styles/globals.css'
import { AnimatePresence, motion as m } from 'framer-motion'
import { useRouter } from 'next/router'

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	const router = useRouter()
	return (
		<SessionProvider session={session}>
			<AnimatePresence mode="wait">
				<m.div
					className="h-full bg-gradient-to-bl from-indigo-800 to-black"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					key={router.route}
				>
					<Component {...pageProps} />
				</m.div>
			</AnimatePresence>
		</SessionProvider>
	)
}

export default trpc.withTRPC(MyApp)
