import React from 'react'
const colors = [
    'bg-[#334155]',
    'bg-[#b91c1c]',
    'bg-[#b45309]',
    'bg-[#15803d]',
    'bg-[#0f766e]',
    'bg-[#0369a1]',
    'bg-[#1d4ed8]',
    'bg-[#4338ca]',
    'bg-[#a21caf]',
    'bg-[#be123c]',
    'bg-[#000000]'
]
export const ColorPicker = () => {

    return (
        <div className='w-60 p-2 rounded-md bg-white border-black border grid grid-cols-4 grid-rows-2'>
            {
                colors.map(c =>
                    <div key={c} className='p-1 rounded-full border border-gray-100 bg-white m-1'>
                        <div className={`${c} h-6 w-6 rounded-full`}></div>
                    </div>)
            }
        </div>
    )
}
