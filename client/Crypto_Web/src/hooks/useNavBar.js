import Swal from 'sweetalert2'
import { useAuth } from "../hooks"

export const useNavBar = () => {
    const { logout } = useAuth()

    const onLogOut = async () => {
        Swal.fire({
            title: 'Realmente deseas cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6366F1',
            cancelButtonColor: '#EF4444',
            confirmButtonText: 'Si, cerrar sesión',
            cancelButtonText: 'Cancelar',
        }).then((result) => result.isConfirmed && logout())
    }

    return {
        onLogOut
    }
}
