import React from 'react'
import Image from 'next/image'

interface UserCardProps {
  name: string
  jobTitle: string
  email: string
}

export default function UserCard({
  name = 'Name',
  jobTitle = 'Job Title',
  email = 'conact@salesloft.com',
}: UserCardProps) {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex h-full">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-user-pattern"
        title="User"
      ></div>
      <div className="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{jobTitle}</p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
