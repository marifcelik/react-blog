import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRightIcon } from "lucide-react"
import { API_URL } from "@/lib/config"

function Home() {
  const [posts, setPosts] = useState([])
  const [firstPost, setFirstPost] = useState({})

  useEffect(() => {
    async function getPosts() {
      const res = await fetch(API_URL + "/posts")

      if (res.ok) {
        const data = await res.json()
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          if (data[i].content.length > 100)
            data[i].content = data[i].content.substring(0, 97) + "..."
        }
        if (data.length > 1) {
          setFirstPost(data.shift())
        }
        setPosts(data)
        return
      }
      console.log(res)
      const text = await res.text()
      console.error(text)
    }

    getPosts()
  }, [])

  return (
    <>
      <section className="mb-12 md:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden">
            <img
              alt="Featured Blog Post"
              className="w-full h-full object-cover aspect-[800/500]"
              width={800}
              height={500}
              src="/placeholder.svg"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
              {firstPost.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {firstPost.content}
            </p>
            <Link
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500"
              to={`/posts/${firstPost.id}`}
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
          {posts.map((post, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md dark:bg-gray-700">
              <img
                alt={`Blog Post ${i + 1}`}
                className="w-full h-48 object-cover aspect-[400/250]"
                width={400}
                height={250}
                src="/placeholder.svg"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-gray-50">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{post.content}</p>
                <Link
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 mt-4"
                  to={`/posts/${post.id}`}
                  
                >
                  Read More
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home