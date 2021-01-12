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
      className={`bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded ${
        disabled
          ? `opacity-50 cursor-not-allowed`
          : `hover:bg-blue-400 hover:border-blue-500`
      }`}
      onClick={onClick}
    >
      {display}
    </button>
  )
}
