import React from 'react'
import { ColorPicker } from './components/color-picker/color-picker'

export const Sidebar = () => {
    return (
        <div className='hidden xl:block w-80 bg-[#00000033] h-full shrink-0'>
            <div className='p-8 text-white'>
                <p className='font-semibold text-lg'>Section Styles</p>
                <div className='my-4'>
                    <div className='flex items-center'>
                        <label htmlFor='title-color'>Title Colour</label>
                        <ColorPicker />
                    </div>
                </div>
            </div>
        </div>
    )
}
