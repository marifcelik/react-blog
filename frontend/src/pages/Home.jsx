import { Link } from "react-router-dom"
import { ArrowRightIcon } from "lucide-react"

function Home() {
  const placeholderPosts = [
    {
      title: "Mastering React Hooks",
      description: "Dive into the power of React Hooks and learn how to build more efficient and maintainable components.",
      imageUrl: "/placeholder.svg",
    },
    {
      title: "Optimizing Website Performance",
      description: "Learn proven techniques to improve the speed and responsiveness of your website.",
      imageUrl: "/placeholder.svg",
    },
    {
      title: "Building a Scalable API with Node.js",
      description: "Discover best practices for designing and implementing a robust and scalable API using Node.js.",
      imageUrl: "/placeholder.svg",
    },
    {
      title: "The Future of Web Development",
      description: "Explore the latest trends and technologies shaping the future of web development.",
      imageUrl: "/placeholder.svg",
    },
    {
      title: "Getting Started with Tailwind CSS",
      description: "Learn how to quickly build beautiful websites using the utility-first CSS framework Tailwind CSS.",
      imageUrl: "/placeholder.svg",
    },
    {
      title: "Creating a Modern E-Commerce Website",
      description: "Follow a step-by-step guide to build a modern e-commerce website using React and Next.js.",
      imageUrl: "/placeholder.svg",
    }
  ]

  return (
    <div className="container mx-auto px-4 md:px-6">
      <section className="mb-12 md:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden">
            <img
              alt="Featured Blog Post"
              className="w-full h-full object-cover"
              height={500}
              src="/placeholder.svg"
              style={{
                aspectRatio: "800/500",
                objectFit: "cover",
              }}
              width={800}
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">The Future of Web Development</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Explore the latest trends and technologies shaping the future of web development.
            </p>
            <Link
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500"
              href="#"
            >
              Read More
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-gray-50">Recent Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {placeholderPosts.map((post, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md dark:bg-gray-700">
              <img
                alt={`Blog Post ${i + 1}`}
                className="w-full h-48 object-cover"
                height={250}
                src={post.imageUrl}
                style={{
                  aspectRatio: "400/250",
                  objectFit: "cover",
                }}
                width={400}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-gray-50">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{post.description}</p>
                <Link
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 mt-4"
                  href="#"
                >
                  Read More
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home