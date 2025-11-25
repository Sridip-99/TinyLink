import { useState } from 'react'
import { motion } from 'framer-motion'

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  const slideFade = (dir = 1, axis = 'y') => {
    const initial = { opacity: 0, [axis]: 60 * dir }
    const whileInView = { opacity: 1, [axis]: 0 }
    return {
      initial,
      whileInView,
      viewport: { once: true, amount: 0.4 },
      transition: { duration: 0.15, ease: 'easeInOut' }
    }
  }

  const faqItems = [
    {
      question: "What is TinyLink?",
      answer:
        "TinyLink is a fast and secure URL shortener that lets you convert long links into short, shareable ones."
    },
    {
      question: "Is TinyLink free to use?",
      answer:
        "Yes, TinyLink is completely free. You can shorten unlimited URLs without creating an account."
    },
    {
      question: "Are my shortened links permanent?",
      answer:
        "Yes! Your links stay active unless you manually delete them or violate our safety policies."
    },
    {
      question: "Does TinyLink track link analytics?",
      answer:
        "Yes, analytics features like click count and last clicked are available for now — more coming soon."
    },
    {
      question: "Is TinyLink safe?",
      answer:
        "Absolutely. We automatically scan harmful or suspicious URLs to ensure safe redirection."
    }
  ]

  return (
    <section id="faq" className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        
        <motion.h2
          {...slideFade()}
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              {...slideFade(1)}
              className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
            >
              <button
                onClick={() => handleClick(index)}
                className="w-full px-5 py-4 flex justify-between items-center text-left"
              >
                <span className="text-gray-100 dark:text-gray-100 font-semibold">
                  {item.question}
                </span>

                <span className="text-gray-500 dark:text-gray-400 transition-transform duration-300 ease-in-out"
                  style={{
                    transform: activeIndex === index ? "rotate(180deg)" : "rotate(0deg)"
                  }}
                >
                  ▼
                </span>
              </button>

              {/* Answer Dropdown */}
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.15, ease: 'easeInOut' }}
                  className="px-5 pb-4 mt-2 text-gray-700 dark:text-gray-300"
                >
                  {item.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ