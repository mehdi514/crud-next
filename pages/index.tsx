import { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { fetchUsers, deleteUser, updateUser } from './api/userService';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { User } from '../types/User';
import UpdateModal from '../components/UpdateModal';
import Loader from '../components/Loader';
import { Toast } from 'primereact/toast';

const Home = () => {
  const toast = useRef(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const accept = (id) => {
    handleDelete(id);
  };

  const reject = () => { };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      setIsLoading(true);
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: error?.response?.data?.message, life: 3000 });
      console.error('Error fetching users:', error);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteUser(id);
      fetchAllUsers();
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: error?.response?.data?.message, life: 3000 });
      console.error('Error deleting user:', error);
    }
    setIsLoading(false);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setUpdateModalVisible(true);
  };

  const handleUpdate = (user: User) => {
    setSelectedUser(user);
    setUpdateModalVisible(true);
  };

  const handleHideUpdateModal = () => {
    setUpdateModalVisible(false);
    setSelectedUser(null);
  };

  const onConfirm = (e, id) => {
    confirmPopup({
      target: e.currentTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => accept(id),
      reject
    });
  };

  return (
    <>
      <div className="header-container">
        <h2>Users</h2>
        {isLoading ? (
          <Loader visible={isLoading} />
        ) : (
          <Button label="Add User" onClick={handleCreate} icon="pi pi-plus" size='small' />
        )}
      </div>
      <div className="card-container">
        {users?.length > 0 ? (
          <>
            {users.map((user) => (
              <Card key={user.id} className="user-card p-0">
                <h3 className='p-0 m-0'>Username: {user.username}</h3>
                <p>First Name: {user.firstName}</p>
                <p>Last Name: {user.lastName}</p>
                <div className="button-group" style={{ marginTop: 50 }}>
                  <Button
                    label="Update"
                    style={{ marginRight: 10 }}
                    onClick={() => handleUpdate(user)}
                    size='small'
                    outlined
                  />
                  <ConfirmPopup />
                  <Button onClick={(e) => onConfirm(e, user.id)} icon="pi pi-times" size='small' label="Delete" className="p-button-danger p-button-outlined"></Button>
                </div>
              </Card>
            ))}
          </>
        ) : <h3 className='text-center'>No users found!</h3>}
      </div>
      <Toast ref={toast} />
      {updateModalVisible && (
        <UpdateModal
          user={selectedUser}
          fetchAllUsers={fetchAllUsers}
          onHide={handleHideUpdateModal}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
};

export default Home;