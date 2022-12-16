import Link from 'next/link'
import React from 'react'
import { Button } from '../button/button'
interface Props
    extends React.ComponentProps<'button'> {
    href: string
}
export const LinkButton = ({ href, ...props }: Props) => {
    return (
        <Link href={href}>
            <Button {...props}>
                {props.children}
            </Button>

        </Link>
    )
}
