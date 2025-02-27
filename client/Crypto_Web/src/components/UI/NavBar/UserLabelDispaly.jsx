import { useAuth } from "../../../hooks"

export const UserLabelDispaly = () => {
    const { user } = useAuth()
    return (
        <div className="px-4 py-2 rounded-sm border-zinc-600 border-2">
            <i className="bi bi-person"></i> {(user?.username) ? user.username : 'Usuario'}
        </div>
    )
}