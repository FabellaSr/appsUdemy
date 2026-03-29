import { Outlet } from "react-router"

export const AdminLayout = () => {
  return (
    <div className="bg-green-500">
        <Outlet/>    
    </div>
  )
}

export default AdminLayout;