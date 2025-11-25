const Hero = () => {
  return (
    <section className='hero'>
        <div className='flex sm:flex-col'>
            <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center lg:py-20'>
                <h1 className='text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 dark:text-gray-100'>Welcome to <span className='text-indigo-300 dark: text-indigo-600'>TinyLink</span></h1>
                <p className='text-lg sm:text-xl text-gray-600 mb-8 dark:text-gray-300'>Shorten your URLs quickly and easily with our free URL shortening service.</p>
            </div>
        </div>
    </section>
  )
}

export default Hero