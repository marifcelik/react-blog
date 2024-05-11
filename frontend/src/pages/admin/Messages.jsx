import { useEffect, useState } from "react"
import { toast } from "sonner"
import { z } from 'zod'
import { Trash2Icon } from 'lucide-react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { fetchWithToken } from "@/lib/utils"

function Messages() {
  const messageSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    message: z.string(),
    createdAt: z.string().datetime(),
  })
  /** @typedef {z.infer<typeof messageSchema>} Message */

  /** @type {[Message[], Function]} */
  const [messages, setMessages] = useState([])
  /** @type {[Message, Function]} */
  const [openedMessage, setOpenedMessage] = useState(null)
  const [deleteMessage, setDeleteMessage] = useState(-1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [render, setRender] = useState(0)

  useEffect(() => {
    async function getMessages() {
      const resp = await fetchWithToken('/messages')

      if (!resp.ok) {
        const text = await resp.text()
        toast.error(text, { description: resp.status })
        return
      }

      const data = await resp.json()
      console.log(data)
      setMessages(data)
    }

    getMessages()
  }, [render])

  function openMessageDialog(message) {
    setOpenedMessage(message)
    setDialogOpen(true)
  }

  function openDeleteDialog(e, id) {
    e.preventDefault()
    e.stopPropagation()
    setDeleteMessage(id)
    setAlertDialogOpen(true)
  }

  async function handleDelete() {
    const res = await fetchWithToken(`/messages/${deleteMessage}`, {
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
    setDeleteMessage(-1)
  }

  return (
    <div className="w-full md:w-2/3 mx-auto mt-28 px-3 md:px-0">
      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete the message permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message from {openedMessage?.name}</DialogTitle>
            <DialogDescription asChild>
              {openedMessage && (
                <div className="grid gap-4 pt-3 text-sm text-muted-foreground"> 
                  <p>{openedMessage.message}</p>
                  <a href={`mailto:${openedMessage.email}`}>{openedMessage.email}</a>
                  <p>Sent at {(new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' })).format(new Date(openedMessage.createdAt))}</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <h1 className="mb-16 text-4xl font-bold">Messages</h1>
      <Table className="dark:[&_tr]:border-b-slate-600">
        <TableCaption>Messages</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id} onClick={() => openMessageDialog(message)}>
              <TableCell>{message.id}</TableCell>
              <TableCell>{message.name}</TableCell>
              <TableCell>{message.email}</TableCell>
              <TableCell className="text-ellipsis overflow-hidden whitespace-nowrap max-w-48">
                {message.message}
              </TableCell>
              <TableCell>
                {(new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' })).format(new Date(message.createdAt))}
              </TableCell>
              <TableCell>
                <Button className="hover:bg-destructive hover:text-white" variant="outline" size="icon" onClick={(e) => openDeleteDialog(e, message.id)}>
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Messages