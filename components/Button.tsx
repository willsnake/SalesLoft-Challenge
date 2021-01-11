import React from 'react'

interface ButtonProps {
  display: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disabled?: boolean
}

export default function Button({
  display = 'submit',
  onClick = () => {},
  disabled = false,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      onClick={onClick}
    >
      {display}
    </button>
  )
}
