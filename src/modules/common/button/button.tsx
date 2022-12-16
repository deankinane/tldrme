import Link from 'next/link'
import React, { useMemo } from 'react'
interface Props
    extends React.ComponentProps<'button'> {
    href?: string
}
export const Button = ({ href = '', ...props }: Props) => {

    return (
        <Link href={href}>
            <button {...props} className={`${props.className} py-4 px-8 rounded-md font-semibold bg-indigo-600 transition-colors text-white duration-500 hover:bg-indigo-500 shadow-2xl`}>{props.children}</button>
        </Link>
    )
}
