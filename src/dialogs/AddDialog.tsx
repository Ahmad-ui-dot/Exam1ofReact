import { useState, type FormEvent } from "react"
import { useDispatch } from "react-redux"
import { useZustand, type AddUser } from "@/store/zustand"
import { AddUserR, type UserR } from "@/store/TodoSlice"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"

interface AddDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function AddDialog({ open, setOpen }: AddDialogProps) {
  const { dataZ, addUserZ } = useZustand()
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [status, setStatus] = useState<"active" | "inactive">("active")
  const [job, setJob] = useState("")
  const [photo, setPhoto] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextId = dataZ.reduce((max, el) => Math.max(max, el.id), 0) + 1
    const photoUrl = photo || `https://i.pravatar.cc/150?img=${(nextId % 70) + 1}`
    const user: AddUser = {
      id: nextId,
      name,
      age: Number(age),
      status: status === "active",
      job,
    }
    addUserZ(user)
    const userR: UserR = {
      id: nextId,
      status: status === "active",
      job,
      photo: photoUrl,
    }
    dispatch(AddUserR(userR))
    setName("")
    setAge("")
    setStatus("active")
    setJob("")
    setPhoto("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add user</DialogTitle>
          <DialogDescription>
            Fill in the fields below and click Add.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Soleh"
              />
            </Field>
            <Field>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="22"
              />
            </Field>
            <Field>
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(value) => value !== null && setStatus(value)}
              >
                <SelectTrigger id="status" className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="job">Job</Label>
              <Select
                value={job}
                onValueChange={(value) => value !== null && setJob(value)}
              >
                <SelectTrigger id="job" className="w-[180px]">
                  <SelectValue placeholder="Job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="programmer">Programmer</SelectItem>
                    <SelectItem value="disayner">Disayner</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          <Field>
              <Label htmlFor="photo">Photo URL</Label>
              <Input
                id="photo"
                name="photo"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="https://i.pravatar.cc/150?img=12"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}