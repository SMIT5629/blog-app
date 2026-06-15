import { useUsers } from "../hooks/useProfile";
function Users() {
    const { users, loading, error } = useUsers();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const usersList = users || [];

    return (
        <div>
            {usersList.map((user) => (
                <div key={user._id}>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                </div>
            ))}
        </div>
    );
}

export default Users;