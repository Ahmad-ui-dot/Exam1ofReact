import { useState } from "react"
import { useDispatch } from "react-redux"
import { useZustand } from "@/store/zustand"
import { EditUserR } from "@/store/TodoSlice"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function EditDialog({ open, setOpen, user }) {
  const { editUserZ } = useZustand()
  const dispatch = useDispatch()
  const [name, setName] = useState(user?.name ?? "")
  const [age, setAge] = useState(user ? String(user.age) : "")
  const [status, setStatus] = useState(user?.status ? "active" : "inactive")
  const [job, setJob] = useState(user?.job ?? "")
  const [photo, setPhoto] = useState(user?.photo ?? "")

  function handleSubmit(event) {
    event.preventDefault()
    if (!user) return
    editUserZ({
      id: user.id,
      name,
      age: Number(age),
      status: status === "active",
      job,
    })
    dispatch(EditUserR({
      id: user.id,
      status: status === "active",
      job,
      photo: photo || user.photo,
    }))
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
          <DialogDescription>
            Change the fields below and save.
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
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}