import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import avatar from '../../../assets/images/avatar.jpg';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { IMG_BB_API_KEY, WebUrl } from '../../../constants';


interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  avatar?: string;
}

interface InformationProps {
  onSaveComplete: () => void;
}

const Information: React.FC<InformationProps> = ({ onSaveComplete }) => {
  
  const token = sessionStorage.getItem('token');
  const [profileUser, setProfileUser] = useState<User>();
  const { control, handleSubmit, setValue, reset  } = useForm<User>();
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(avatar);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDisableButton, setIsDisableButton] = useState<boolean>(false);
  const [urlAvatar, setUrlAvatar] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {

      const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validImageTypes.includes(file.type)) {
        setErrorMessage("File format must be JPEG, PNG, GIF, or WebP.");
        return;
      }

      if (file.size > 1024 * 1024) {
        setErrorMessage("Photo size must not exceed 1MB.");
        return;
      }
      setErrorMessage("");
      setAvatarPreview(URL.createObjectURL(file));
      handleUploadAvatar(file); 
    }
  };

  const handleUploadAvatar = async (file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsDisableButton(true)
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUrlAvatar(response.data.data.url)
      setIsDisableButton(false)
    } catch (error) {
      console.error("Error uploading avatar to imgBB:", error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(`${WebUrl}/api/v1/users/profile`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          Authorization: `Bearer ${token}`,
        },
      });

      setProfileUser(response.data);

      const data = response.data;
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
      });
      setAvatarPreview(data.avatar)
    } catch (error) {
      console.error('Unexpected Error:', error);
    }
  };

  const onSubmit = async (data: User) => {
    try {
      await axios.put(
        `${WebUrl}/api/v1/users/update`,
        { 
          ...data,
          avatar: urlAvatar
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'skip-browser-warning',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSaveComplete();
      getProfile();
    } catch (error) {
      console.error('Update Error:', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className='user-inforation-container w-100 p-3 mb-3'>
      <div>My Account</div>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='d-flex'>
          <div className='user-inforation-value'>
            <ul>
              <li className='input-full-name'>
                <div className='label-input'>First Name</div>
                <Controller
                  name='firstName'
                  control={control}
                  render={({ field }) => <input className="form-control" {...field} placeholder='First Name' />}
                />
              </li>
              <li className='input-full-name'>
                 <div className='label-input'>Last Name</div>
                <Controller
                  name='lastName'
                  control={control}
                  render={({ field }) => <input className="form-control" {...field} placeholder='Last Name' />}
                />
              </li>
              <li className='input-full-name'>
                <div className='label-input'>Email</div>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => <input disabled className="form-control" {...field} placeholder='Email' />}
                />
              </li>
              <li className='input-full-name'>
                <div className='label-input'>Phone Number</div>
                <Controller
                  name='phoneNumber'
                  control={control}
                  render={({ field }) => <input className="form-control" {...field} placeholder='Phone Number' />}
                />
              </li>
              <li className='input-full-name'>
                <div className='label-input'>Gender</div>
                <Controller
                  name='gender'
                  control={control}
                  render={({ field }) => (
                    <select className="form-select" {...field}>
                      <option value='MALE'>Male</option>
                      <option value='FEMALE'>Female</option>
                      <option value='OTHER'>Other</option>
                    </select>
                  )}
                />
              </li>
            </ul>
            <button className='btn-primary' type='submit' disabled={isDisableButton} style={{width:"200px"}}>
              Save
            </button>
          </div>
          <div className='user-inforation-avatar'>
            <div className='avatar'>
              <img src={avatarPreview || avatar} />
            </div>
            <input
              type="file"
              ref={fileInputRef} 
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button disabled={isDisableButton} onClick={() => fileInputRef.current?.click()} type='button' className='btn-primary'>
              Select photo
            </button>
            <div>Maximum file size 1 MB</div>
            <div>Format: .JPEG, .PNG</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Information;
