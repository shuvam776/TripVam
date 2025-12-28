export default function Test() {
  return <div className="text-green-500">Alias works</div>
}
import api from "@/services/api"

api.get("/")
  .then(res => console.log(res.data))
  .catch(console.error)
