import { useEffect, useState } from "react"
import { toast } from "sonner"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  ArrowUpDownIcon,
  PlusCircleIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable } from "@/components/ui/data-table"
import { Textarea } from "@/components/ui/textarea"
import { fetchWithToken } from "@/lib/utils"

const postSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  authorId: z.number().nonnegative(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})
/** @typedef {z.infer<typeof postSchema>} Post */

const postFormSchema = postSchema.omit({ authorId: true, createdAt: true, updatedAt: true })
/** @typedef {z.infer<typeof postFormSchema>} PostForm */

function Posts() {
  const form = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      content: ''
    },

  })

  /** @type {import('@tanstack/react-table').ColumnDef<Post>[]} */
  const columns = [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <Button variant="ghost" size="icon" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            ID
            <ArrowUpDownIcon className="ml-2 w-4 h-4" />
          </Button>
        )
      }
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Title
            <ArrowUpDownIcon className="ml-2 w-4 h-4" />
          </Button>
        )
      }
    },
    {
      accessorKey: 'content',
      header: 'Content',
      cell: ({ row }) => {
        const data = row.getValue('content')
        return data.length > 50 ? data.substring(0, 50) + '...' : data
      }
    },
    { accessorKey: 'authorId', header: 'Author ID' },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Created At
            <ArrowUpDownIcon className="ml-2 w-4 h-4" />
          </Button>
        )
      },
      sortingFn: 'datetime',
      cell: ({ row }) => {
        const data = row.getValue('createdAt')
        const formatted = (new Intl.DateTimeFormat('en-GB', {
          dateStyle: 'short',
          timeStyle: 'short'
        })).format(new Date(data))

        return formatted
      }
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Updated At
            <ArrowUpDownIcon className="ml-2 w-4 h-4" />
          </Button>
        )
      },
      sortingFn: 'datetime',
      cell: ({ row }) => {
        const data = row.getValue('updatedAt')
        const formatted = (new Intl.DateTimeFormat('en-GB', {
          dateStyle: 'short',
          timeStyle: 'short'
        })).format(new Date(data))

        return formatted
      }
    }, {
      id: 'actions',
      cell: ({ row }) => {
        const post = structuredClone(row.original)
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openUpdateDialog({ id: post.id, title: post.title, content: post.content })}>
                <PencilIcon className="w-4 h-4 mr-2" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openDeleteDialog(post.id)} className="hover:!bg-destructive/90">
                <Trash2Icon className="w-4 h-4 mr-2" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  /** @type {[Post[], Function]} */
  const [posts, setPosts] = useState([])
  const [openedForUpdate, setOpenedForUpdate] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deletePost, setDeletePost] = useState(-1)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [render, setRender] = useState(0)

  useEffect(() => {
    async function getPosts() {
      const resp = await fetchWithToken('/posts')

      if (!resp.ok) {
        const text = await resp.text()
        toast.error(text, { description: resp.status })
        return
      }

      const data = await resp.json()
      setPosts(data)
      console.log(data)
    }

    getPosts()
  }, [render])

  useEffect(() => {
    if (!dialogOpen) {
      setOpenedForUpdate(false)
      form.reset({ title: '', content: '' })
    }
    if (!alertDialogOpen) {
      setDeletePost(-1)
    }
  }, [dialogOpen, alertDialogOpen])

  function openDeleteDialog(id) {
    console.log(id)
    setDeletePost(id)
    setAlertDialogOpen(true)
  }

  async function handleDelete() {
    const res = await fetchWithToken(`/posts/${deletePost}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      const text = await res.text()
      toast.error(text)
      console.log(res)
      return
    }

    const text = await res.text()
    toast.success(text)

    setRender(render + 1)
    setDeletePost(-1)
  }

  function openUpdateDialog(post) {
    setOpenedForUpdate(true)
    form.reset(post)
    setDialogOpen(true)
  }

  /** @param {PostForm} data */
  async function onSubmit(data) {
    console.log(data)
    const resp = await fetchWithToken(`/posts/${openedForUpdate ? data.id : ''}`, {
      method: openedForUpdate ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (resp.ok) {
      const text = await resp.text()
      toast.success(text)
      form.reset()
      setDialogOpen(false)
      setOpenedForUpdate(false)
      setRender(render + 1)
    } else {
      const text = await resp.text()
      toast.error(text, { description: resp.statusText })
      console.log(resp)
    }
  }

  return (
    <div className="w-full md:w-4/5 mx-auto mt-12 px-3 md:px-0">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{openedForUpdate ? 'Update post' : 'Add post'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <FormControl>
                          <Input {...field} id="title" placeholder="Enter title" className="dark:border-slate-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="content">Content</FormLabel>
                        <FormControl>
                          <Textarea {...field} id="content" className="resize-none min-h-56 dark:border-slate-600" placeholder="Enter post content" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full flex items-center justify-end">
                <Button type="submit" className='mt-3'>{openedForUpdate ? 'Update post' : 'Add post'}</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete post</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to delete this post?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="w-full flex items-center justify-between mb-7">
        <h1 className="text-4xl font-bold">Posts</h1>
        <Button size="icon" onClick={() => setDialogOpen(true)}>
          <PlusCircleIcon />
        </Button>
      </div>
      <DataTable columns={columns} data={posts} />
    </div>
  )
}

export default Posts