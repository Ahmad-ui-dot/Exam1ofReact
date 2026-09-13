import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useZustand } from "./store/zustand"
import { deleteUserR } from "./store/TodoSlice"
import { Button } from "./components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import AddDialog from "./dialogs/AddDialog"
import EditDialog from "./dialogs/EditDialog"

export default function App() {
  const { dataZ, deleteUserZ } = useZustand()
  const { dataR } = useSelector((state) => state.data)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [editUser, setEditUser] = useState(null)

  const data = dataZ.map((el) => {
    const elR = dataR.find((e) => e.id === el.id)
    return {
      ...el,
      ...elR
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-sm text-gray-500 mt-1">
              Total: {data.length}
            </p>
          </div>
          <Button onClick={() => setOpen(true)}>
            + Add User
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((el) => (
            <Card key={el.id} className="border border-gray-200 shadow-sm bg-white">
              <CardContent className="p-5 flex flex-col items-center">
                <img
                  src={el.photo}
                  alt={el.name}
                  className="w-16 h-16 rounded-full object-cover border border-gray-200 mb-3"
                />
                
                <h2 className="text-base font-semibold">{el.name}</h2>
                <p className="text-sm text-gray-500 mb-3">{el.job}</p>

                <div className="flex items-center gap-2 mb-4 text-xs">
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">
                    Age: {el.age}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-medium ${
                      el.status
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {el.status ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex w-full gap-2 mt-auto pt-2 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/info/${el.id}`)}
                  >
                    Info
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setEditUser(el)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      dispatch(deleteUserR(el.id))
                      deleteUserZ(el.id)
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AddDialog open={open} setOpen={setOpen} />
        <EditDialog
          key={editUser ? editUser.id : "edit-dialog"}
          open={editUser !== null}
          setOpen={(value) => !value && setEditUser(null)}
          user={editUser}
        />
      </div>
    </div>
  )
}