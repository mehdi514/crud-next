import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useRef, useState } from 'react';
import { createUser, updateUser } from '../pages/api/userService';
import { User } from '../types/User';
import { Toast } from 'primereact/toast';

interface UpdateModalProps {
  user?: User;
  fetchAllUsers: () => Promise<void>;
  onHide: () => void;
  setIsLoading: any;
}

const UpdateModal = ({ user, fetchAllUsers, onHide, setIsLoading }: UpdateModalProps) => {
  const toast = useRef(null);
  const [username, setUsername] = useState(user?.username || '');
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');

  const handleUpdateUser = async () => {
    if (username.length < 3 || username.length > 40) {
      toast.current.show({ severity: 'warn', summary: 'Alert!', detail: 'Username must be between 3 and 40 characters', life: 3000 });
      return;
    }

    if (firstName.length < 3 || firstName.length > 55) {
      toast.current.show({ severity: 'warn', summary: 'Alert!', detail: 'First name must be between 3 and 55 characters', life: 3000 });
      return;
    }

    if (lastName.length > 55) {
      toast.current.show({ severity: 'warn', summary: 'Alert!', detail: 'Last name must be less than or equal to 55 characters', life: 3000 });
      return;
    }

    const userData = {
      username,
      firstName,
      lastName,
    };

    const updatedUserData = {
      id: user?.id,
      username,
      firstName,
      lastName,
    };
    setIsLoading(true);
    try {
      if (user) {
        await updateUser(updatedUserData);
      } else {
        await createUser(userData);
      }
      onHide();
      fetchAllUsers();
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: error?.response?.data?.message, life: 3000 });
      console.error('Error updating/adding user:', error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible
        onHide={onHide}
        header={user ? 'Update User' : 'Add User'}
        className="update-modal pb-4"
        contentClassName="update-modal-content"
        footer={
          <div>
            <Button label="Cancel" severity="secondary" onClick={onHide} text size='small' />
            <Button label={user ? 'Update' : 'Add'} severity="info" onClick={handleUpdateUser} outlined size='small' />
          </div>
        }
      >
        <div className="p-grid p-fluid">
          {!user && (
            <div className="p-col-12">
              <span className="p-float-label">
                <InputText
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="username">Username</label>
              </span>
            </div>
          )}
          <div className="p-col-12">
            <span className="p-float-label">
              <InputText
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="firstName">First Name</label>
            </span>
          </div>
          <div className="p-col-12">
            <span className="p-float-label">
              <InputText
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="lastName">Last Name</label>
            </span>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default UpdateModal;
