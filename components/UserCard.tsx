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
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div
        className="lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        title="Woman holding a mug"
      >
        <Image
          src="/icons/user.svg"
          alt="Picture of the User"
          width={150}
          height={150}
        />
      </div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
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
