import React from 'react'

import Button from './Button'

interface ModalPossibleDuplicatesProps {
  onCloseSvg: () => void
  onCloseButton: () => void
  emails: string[]
}

export default function ModalPossibleDuplicates({
  onCloseSvg = () => {},
  onCloseButton = () => {},
  emails = [],
}: ModalPossibleDuplicatesProps) {
  return (
    <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 z-50">
      <div className="bg-white bg-opacity-100 rounded w-1/2">
        <div className="flex flex-col items-start p-4 ">
          <div className="flex items-center w-full">
            <div className="text-gray-900 font-medium text-lg">
              Possible Duplicates
            </div>
            <svg
              onClick={onCloseSvg}
              className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
            </svg>
          </div>

          <hr />
          <div className="">
            <p>
              {emails.map((email: string) => {
                return `${email}, `
              })}
            </p>
          </div>
          <div className="ml-auto">
            <Button display="Close" onClick={onCloseButton} />
          </div>
        </div>
      </div>
    </div>
  )
}
