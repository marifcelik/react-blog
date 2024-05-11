import { useState, useEffect } from "react"
import { ShareIcon, HeartIcon } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useParams } from "react-router-dom"
import { API_URL } from "@/lib/config"

function Post() {
  /** @type {[{author: string, title: string, content: string, updatedAt: string}, Function]} */
  const [post, setPost] = useState({})
  const { id } = useParams()

  useEffect(() => {
    async function getPost() {
      const res = await fetch(`${API_URL}/posts/${id}`)

      if (res.ok) {
        const data = await res.json()
        console.log(data)
        setPost(data)
        return
      }
      console.log(res)
      const text = await res.text()
      console.error(text)
    }

    getPost()
  }, [])

  if (post.author === undefined) return (<div>Loading...</div>)

  return (
    <article className="bg-white rounded-lg shadow-md dark:bg-gray-700 overflow-hidden max-w-[52rem] mx-auto">
      <img
        alt="Featured Blog Post"
        className="w-full h-[200px] md:h-[500px] object-cover aspect-[1200/600]"
        src="/placeholder.svg"
      />
      <div className="p-6 md:p-8 lg:p-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>
                {post.author?.length > 1 ? post.author.charAt(0) : '?'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50">{post.author}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(new Date(post.updatedAt))}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <ShareIcon className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
            <Button size="icon" variant="ghost">
              <HeartIcon className="h-5 w-5" />
              <span className="sr-only">Save</span>
            </Button>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 my-5">{post.title}</h1>
        <div className="prose prose-gray max-w-none dark:prose-invert leading-7 [&_p]:my-4">
          {post.content.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  )
}

export default Post