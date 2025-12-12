import React from 'react'

// Make text optional
export type SectionHeaderProps = {
  text?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ text = 'Section Header' }) => {
  return (
    <p className='text-[16px] font-semibold'>{text}</p>
  )
}

export default SectionHeader