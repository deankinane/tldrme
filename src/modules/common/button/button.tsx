import React from 'react'
interface Props
    extends React.ComponentProps<'button'> {

}
export const Button = (props: Props) => {
    return (
        <button {...props} className={`${props.className} py-4 px-8 rounded-md font-semibold bg-indigo-600 transition-colors text-white duration-500 hover:bg-indigo-500 shadow-2xl`}>
            {props.children}
        </button>
    )
}
