import { useParams, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useZustand } from '../store/zustand'
import { type UserR } from '../store/TodoSlice'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'

export default function Info() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { dataZ } = useZustand()
  const { dataR } = useSelector((state: { data: { dataR: UserR[] } }) => state.data)

  const userZ = dataZ.find((el) => el.id == Number(id))
  const userR = dataR.find((el) => el.id == Number(id))

  if (!userZ) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-gray-700">User not found</h1>
        <Button onClick={() => navigate('/')}>Back to list</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button className="mb-4" variant="outline" onClick={() => navigate('/')}>
          ← Back
        </Button>

        <Card className="border border-gray-200 shadow-sm bg-white overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600" />
          <CardContent className="px-6 pb-8 -mt-12 flex flex-col items-center">
            <img
              src={userR?.photo}
              alt={userZ.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            <h1 className="text-2xl font-bold mt-3">{userZ.name}</h1>
            <span className="mt-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm">
              {userR?.job}
            </span>

            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 border border-gray-200">
                <span className="text-gray-500 text-sm">Age</span>
                <span className="font-semibold text-sm">{userZ.age}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 border border-gray-200">
                <span className="text-gray-500 text-sm">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    userR?.status
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  {userR?.status ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 border border-gray-200">
                <span className="text-gray-500 text-sm">ID</span>
                <span className="font-semibold text-sm">#{userZ.id}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}