import { Link } from 'react-router-dom'
import { ArrowRightIcon, GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function About() {
  const team = [
    {
      name: 'John Doe',
      role: 'Editor-in-Chief',
      avatar: '/avatars/01.png',
      twitter: '#',
      linkedin: '#',
      github: '#'
    },
    {
      name: 'Jane Smith',
      role: 'Senior Writer',
      avatar: '/avatars/02.png',
      twitter: '#',
      linkedin: '#',
      github: '#'
    },
    {
      name: 'Michael Johnson',
      role: 'Technical Editor',
      avatar: '/avatars/03.png',
      twitter: '#',
      linkedin: '#',
      github: '#'
    },
    {
      name: 'Sarah Brown',
      role: 'Contributing Writer',
      avatar: '/avatars/04.png',
      twitter: '#',
      linkedin: '#',
      github: '#'
    },
    {
      name: 'David Wilson',
      role: 'Contributing Writer',
      avatar: '/avatars/05.png',
      twitter: '#',
      linkedin: '#',
      github: '#'
    },
    {
      name: 'Emily Davis',
      role: 'Contributing Writer',
      avatar: '/avatars/06.png',
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  ]

  return (
    <>
      <section className="mb-12 md:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">About Our Blog</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome to our blog, where we share the latest insights, trends, and best practices in the world of
              web development. Our mission is to provide a platform for developers, designers, and tech enthusiasts
              to learn, grow, and stay up-to-date with the ever-evolving landscape of the industry.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Our team of experienced writers and contributors are passionate about their craft and are dedicated to
              delivering high-quality, informative, and engaging content. From in-depth tutorials and case studies
              to thought-provoking articles and interviews, we cover a wide range of topics that cater to the
              diverse needs of our readers.
            </p>
            <Link className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500" to="#">
              Learn More
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              alt="About Blog"
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
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-gray-50">Meet the Team</h2>
        <div className="grid grid-cols-1 mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-8 w-fit md:w-[inherit]">
          {team.map((member, i) => (
            <div className="flex items-center gap-4" key={i}>
              <Avatar>
                <AvatarImage alt={member.name} src={member.avatar} />
                <AvatarFallback>
                  {member.name.split(' ').map((name) => name[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-gray-50">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
                <div className="flex items-center gap-2 mt-4">
                  <Link className="text-primary" to={member.twitter}>
                    <TwitterIcon className="h-5 w-5" />
                  </Link>
                  <Link className="text-primary" to={member.linkedin}>
                    <LinkedinIcon className="h-5 w-5" />
                  </Link>
                  <Link className="text-primary" to={member.github}>
                    <GithubIcon className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default About