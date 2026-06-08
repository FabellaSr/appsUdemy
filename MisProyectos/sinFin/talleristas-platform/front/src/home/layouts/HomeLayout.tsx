import { CustomTitle } from "@/components/custom/CustomTitle"
import { Outlet } from "react-router"

export const HomeLayout = () => {
    return (
        <>
            <CustomTitle
                title="Talleristas que hacen las cosas bien."
                subtitle="Explorá los trabajos de nuestros proveedores y contactá directo con quien necesites." />
            <Outlet />
        </>
    )
}
