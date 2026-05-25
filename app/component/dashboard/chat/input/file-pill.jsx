import Spinner from '@/app/component/ui/spinner'
import { X } from 'lucide-react'
import React from 'react'

const FilePill = ({ fileName, onClick,isReady, uploadingFile }) => {
  return (
    // relative: anchors the absolute close button
    // inline-block: keeps the pill size tight around its content
    <div className='relative inline-block m-4'>
      
      {/* Absolute positioning with -50% -50% offsets via translate */}
      <button 
        onClick={onClick}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full p-0.5 z-10"
        aria-label="Remove file"
      >
        <X className='size-3.5' />
      </button>

      {/* Flex container for the pill text */}
      <div className='inline-flex w-28 max-w-30 h-30 px-4 bg-accent rounded-lg text-sm items-center justify-center border border-input'>
        {/* Inner span handles the text truncation perfectly */}
        {uploadingFile?<Spinner/>:<span className='truncate block max-w-full'>
          {fileName}
        </span>}
      </div>
    </div>
  )
}

export default FilePill
