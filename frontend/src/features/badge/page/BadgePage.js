import { useContext, useState } from 'react';
import {
    useCreateBadgeMutation,
    useDeleteBadgeByIdMutation,
    useFetchAllBadgesQuery,
    useUpdateBadgeByIdMutation,
} from '../../../store/api';
import { useLoader } from '../../modernLoader/context';
import BadgeForm from './form';
import NotificationContext from '../../notification/context/NotificationContext';
import AuthContext from '../../../common/AuthContext';
import './BadgePage.css';

const BadgePage = () => {
    const { showLoader, hideLoader } = useLoader();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState(null);
    const { isAdmin } = useContext(AuthContext);
    const {
        data: badges,
        isLoading: fetchAllBadgesLoading,
        isFetching: fetchAllBadgesFetching,
    } = useFetchAllBadgesQuery();

    const [createBadge] = useCreateBadgeMutation();
    const [updateBadgeById] = useUpdateBadgeByIdMutation();
    const [deleteBadgeById] = useDeleteBadgeByIdMutation();
    const { showNotification } = useContext(NotificationContext);

    // const {
    //     data: earnedBadges,
    //     isLoading: fetchUserBadgesLoading,
    //     isFetching: fetchUserBadgesFetching,
    // } = useFetchUserBadgesQuery();

    if (fetchAllBadgesLoading || fetchAllBadgesFetching) {
        showLoader();
        return null;
    } else {
        hideLoader();
    }

    const closeModal = (event) => {
        if (event.target.className === 'modal') {
            setSelectedBadge(null);
            setModalOpen(false);
        }
    };
    const openModal = () => setModalOpen(true);

    const handleUpdateBadgeButton = (badge) => {
        setSelectedBadge(badge);
        openModal();
    };

    const handleDeleteBadgeButton = async (badgeId) => {
        showLoader();
        const deleteBadgeResult = await deleteBadgeById(badgeId);
        hideLoader();

        if (!deleteBadgeResult.error) {
            showNotification({
                title: 'Badge Deleted!',
                message: 'See ya later, Badge...',
            });
        } else {
            showNotification({
                title: 'Something Went Wrong',
                message:
                    'There was an issue deleting the Badge. Please try again later.',
            });
        }
    };

    const onBadgeFormSubmit = async (badge, prevBadgeId) => {
        showLoader();
        let result;

        if (prevBadgeId) {
            result = await updateBadgeById({
                id: prevBadgeId,
                badgeData: badge,
            });
        } else {
            result = await createBadge(badge);
        }

        if (result.error) {
            setSelectedBadge(badge);
            setModalOpen(true);
            showNotification({
                title: 'Something Went Wrong',
                message:
                    'There was an issue updating the Badge. Please try again later.',
            });
        } else {
            setModalOpen(false);
            setSelectedBadge(null);
            showNotification({
                title: 'Badge Updated!',
                message: 'Your Badge is good to go!',
            });
        }

        hideLoader();
    };

    return (
        <div className='page-container badge-page-container'>
            <div className='badge-page'>
                {modalOpen && (
                    <div className='modal' onClick={closeModal}>
                        <BadgeForm
                            onSubmit={onBadgeFormSubmit}
                            badge={selectedBadge}
                            isEditMode={!!selectedBadge}
                        />
                    </div>
                )}
                {isAdmin && (
                    <div className='page-header badge-page-header'>
                        <h1>Badges</h1>
                        <p>
                            As an administrator, you can create, update, and
                            delete badges.
                        </p>
                        <button
                            className='action-button create-badge-btn'
                            onClick={openModal}
                        >
                            Create Badge
                        </button>
                    </div>
                )}
                <div className='page-content badge-page-content'>
                    <div className='badge-list'>
                        {badges?.length &&
                            badges.map((badge) => {
                                return (
                                    <div className='badge-item'>
                                        <div className='badge-icon'>
                                            {badge.icon}
                                        </div>
                                        <div className='badge-details'>
                                            <h1 className='badge-name'>
                                                {badge.name}
                                            </h1>
                                            <p className='badge-description'>
                                                {badge.description}
                                            </p>
                                        </div>
                                        {isAdmin && (
                                            <div className='badge-actions'>
                                                <button
                                                    className='action-button update-badge-btn'
                                                    onClick={() =>
                                                        handleUpdateBadgeButton(
                                                            badge,
                                                        )
                                                    }
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className='action-button delete-badge-btn'
                                                    onClick={() =>
                                                        handleDeleteBadgeButton(
                                                            badge.id,
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BadgePage;
