function Error({ err }: { err: any }) {
	return (
		<p>
			{err
				? `An error occurred on server`
				: 'An error occurred on client'}
			{err}
		</p>
	)
}

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
	return { err }
}

export default Error
