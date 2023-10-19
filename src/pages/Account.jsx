import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineCancel, MdOutlineCheckCircle } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { updatePeopleApi } from '../api/people_calls';
import Button from '../components/Button';
import InputText from '../components/InputText';
import LoadingContainer from '../components/LoadingContainer';
import Modal from '../components/Modal';
import { updateUser } from '../features/user/userSlice';

const Account = () => {
    const { userInfo, userLoading } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [info, setInfo] = useState({ ...userInfo });
    const [isEdit, setIsEdit] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    if (userLoading) return <LoadingContainer />;

    function editToggle() {
        setIsEdit(!isEdit);
    }

    function modalToggle() {
        setOpenModal(!openModal);
    }

    async function confirmHandler() {
        const response = await updatePeopleApi(
            { peopleId: userInfo.peopleId },
            { data: info }
        );
        if (!response?.success) return new alert('Error, not updated');

        dispatch(updateUser(info));
        setOpenModal(false);
        setIsEdit(false);
    }
    return (
        <section className="account">
            <Modal
                text="Save changes?"
                openModal={openModal}
                modalToggle={modalToggle}
                confirmButtonIcon={<MdOutlineCheckCircle className="icon" />}
                confirmButtonText="Confirm"
                confirmHandler={confirmHandler}
                cancelButtonIcon={<MdOutlineCancel className="icon" />}
                cancelButtonText="Cancel"
                cancelHandler={modalToggle}
            />
            <h2>Your Account</h2>
            <div className="account_avatar">
                {/* <div
                    className={
                        isEdit
                            ? 'account_avatar_edit active'
                            : 'account_avatar_edit'
                    }
                >
                    <span>Click to</span>
                    <span>
                        <AiOutlineEdit className="icon" /> Edit
                    </span>
                </div> */}
                <img
                    className="account_avatar_image"
                    src={userInfo.avatar}
                    loading="lazy"
                />
            </div>

            <InputText
                name="first name"
                id="first_name"
                defaultValue={info['first_name']}
                setInfo={setInfo}
                info={info}
                disabled={!isEdit}
                className={'account_first_name'}
            />
            <InputText
                name="last name"
                id="last_name"
                defaultValue={info['last_name']}
                setInfo={setInfo}
                info={info}
                disabled={!isEdit}
                className={'account_last_name'}
            />
            <InputText
                name="email"
                id="email"
                defaultValue={info['email']}
                setInfo={setInfo}
                info={info}
                disabled={true}
                className={'account_email'}
            />
            <InputText
                type="date"
                name="birthdate"
                id="birthdate"
                defaultValue={info['birthdate']}
                setInfo={setInfo}
                info={info}
                disabled={!isEdit}
                className={'account_birthdate'}
            />
            <InputText
                type="address"
                name="address"
                id="address"
                defaultValue={info['address']}
                setInfo={setInfo}
                info={info}
                disabled={!isEdit}
                className={'account_address'}
            />
            <div className="account_button">
                {isEdit && (
                    <Button
                        clickHandler={() => modalToggle()}
                        buttonIcon={<MdOutlineCheckCircle className="icon" />}
                        buttonText="Save"
                    />
                )}
                <Button
                    clickHandler={() => {
                        editToggle();
                    }}
                    buttonIcon={
                        isEdit ? (
                            <MdOutlineCancel className="icon" />
                        ) : (
                            <AiOutlineEdit className="icon" />
                        )
                    }
                    buttonText={isEdit ? 'Cancel' : 'Edit'}
                />
            </div>
        </section>
    );
};

export default Account;
