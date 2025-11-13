import React from 'react'
import CustomQuoteForm from '../../Components/CustomQuoteForm/CustomQuoteForm'
import SectionHeading from '../../Components/Heading/SectionHeading'

function CustomQuote() {
  return (
    <div className='max-w-7xl mx-auto py-16 px-2 md:px-6'>
        <SectionHeading title={"Custom Quote"} align='left'/>
        <p className='text-[#6B7280] text-lg font-regular'>That's easy! Simply submit the form below and we'll contact you to discuss the best options!</p>
        <CustomQuoteForm/>

    </div>
  )
}

export default CustomQuote