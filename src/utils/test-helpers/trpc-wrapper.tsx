import React from 'react'
import { trpc } from '../trpc'

interface Props {
	pageProps: object
}

export const withTrpcMock = <P extends object>(
	Component: React.ComponentType<P>
) =>
	class withTrpcMock extends React.Component<P & Props> {
		Trpc = trpc.withTRPC(Component)
		render() {
			return <this.Trpc {...(this.props as P)} />
		}
	}
