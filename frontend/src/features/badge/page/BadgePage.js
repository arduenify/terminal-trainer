import { useContext, useEffect, useState } from 'react';
import {
    useCreateBadgeMutation,
    useDeleteBadgeByIdMutation,
    useFetchAllBadgesQuery,
    useFetchCurrentUserBadgesQuery,
    useUpdateBadgeByIdMutation,
} from '../../../store/api';
import BadgeForm from './form';
import NotificationContext from '../../notification/context/NotificationContext';
import { useAuth } from '../../../common/hooks/useAuth';
import { setLoading } from '../../../store/loadingSlice';
import { useDispatch } from 'react-redux';
import './BadgePage.css';

const BadgePage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState(null);
    const { isAdmin } = useAuth();
    const dispatch = useDispatch();
    const {
        data: badges,
        isLoading: fetchAllBadgesLoading,
        isFetching: fetchAllBadgesFetching,
        refetch: refetchBadges,
    } = useFetchAllBadgesQuery();

    const [createBadge] = useCreateBadgeMutation();
    const [updateBadgeById] = useUpdateBadgeByIdMutation();
    const [deleteBadgeById] = useDeleteBadgeByIdMutation();
    const { showNotification } = useContext(NotificationContext);

    const {
        data: earnedBadges,
        isLoading: fetchUserBadgesLoading,
        isFetching: fetchUserBadgesFetching,
        refetch: refetchEarnedBadges,
    } = useFetchCurrentUserBadgesQuery();

    useEffect(() => {
        if (
            !badges?.length ||
            fetchAllBadgesLoading ||
            fetchAllBadgesFetching ||
            fetchUserBadgesLoading ||
            fetchUserBadgesFetching
        ) {
            dispatch(setLoading(true));
        }
    }, [
        fetchAllBadgesLoading,
        fetchAllBadgesFetching,
        badges,
        fetchUserBadgesLoading,
        fetchUserBadgesFetching,
    ]);

    useEffect(() => {
        refetchBadges();
        refetchEarnedBadges();
    }, [refetchBadges, refetchEarnedBadges]);

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
        const deleteBadgeResult = await deleteBadgeById(badgeId);

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
                <h1>Available Badges</h1>
                {isAdmin && (
                    <div className='page-header badge-page-header'>
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
                        {badges?.length > 0 &&
                            badges.map((badge) => {
                                return (
                                    <div className='badge-item' key={badge.id}>
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
                    {earnedBadges?.length > 0 ? (
                        <div>
                            <h1 className='badge-list-title'>Your Badges</h1>
                            <div className='badge-list'>
                                {earnedBadges?.length > 0 &&
                                    earnedBadges.map((earnedBadge) => {
                                        const { badge } = earnedBadge;
                                        return (
                                            <div
                                                className='badge-item'
                                                key={badge.id}
                                            >
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
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ) : (
                        <h1 className='no-badges-earned-msg'>
                            You haven't earned any badges just yet.
                        </h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BadgePage;
