import { useParams, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useZustand } from '../store/zustand'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'

export default function Info() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { dataZ } = useZustand()
  const { dataR } = useSelector((state) => state.data)

  const userZ = dataZ.find((el) => el.id == id)
  const userR = dataR.find((el) => el.id == id)

  if (!userZ) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 text-gray-900">
        <h1 className="text-2xl font-bold">User not found</h1>
        <Button variant="outline" onClick={() => navigate('/')}>
          Back to list
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-gray-900">
      <div className="w-full max-w-md">
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => navigate('/')}
        >
          ← Back
        </Button>

        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-6 flex flex-col items-center">
            <img
              src={userR?.photo}
              alt={userZ.name}
              className="w-20 h-20 rounded-full object-cover border border-gray-200 mb-3"
            />
            <h1 className="text-xl font-bold">{userZ.name}</h1>
            <p className="text-sm text-gray-500 mb-6">{userR?.job}</p>

            <div className="w-full space-y-2 border-t border-gray-100 pt-4 text-sm">
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-500">ID</span>
                <span className="font-medium">#{userZ.id}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-500">Age</span>
                <span className="font-medium">{userZ.age}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-500">Status</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    userR?.status
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  {userR?.status ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}