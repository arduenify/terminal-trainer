import { useState } from 'react';
import {
    useCreateBadgeMutation,
    useFetchAllBadgesQuery,
    useUpdateBadgeByIdMutation,
} from '../../../store/api';
import { useLoader } from '../../modernLoader/context';
import BadgeForm from './form';
import './BadgePage.css';

const BadgePage = () => {
    const { showLoader, hideLoader } = useLoader();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState(null);

    const {
        data: badges,
        isLoading: fetchAllBadgesLoading,
        isFetching: fetchAllBadgesFetching,
    } = useFetchAllBadgesQuery();

    const [createBadge] = useCreateBadgeMutation();
    const [updateBadgeById] = useUpdateBadgeByIdMutation();

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

    const onBadgeFormSubmit = async (badge, prevBadgeId) => {
        setModalOpen(false);
        setSelectedBadge(null);

        if (prevBadgeId) {
            const updateBadgeResult = await updateBadgeById({
                id: prevBadgeId,
                badgeData: badge,
            });
            console.log(updateBadgeResult);
        } else {
            const createBadgeResult = await createBadge(badge);
            console.log(createBadgeResult);
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
                <div className='page-header badge-page-header'>
                    <h1>Badges</h1>
                    <p>
                        As an administrator, you can create, update, and delete
                        badges.
                    </p>
                    <button
                        className='action-button create-badge-btn'
                        onClick={openModal}
                    >
                        Create Badge
                    </button>
                </div>
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
                                            <button className='action-button delete-badge-btn'>
                                                Delete
                                            </button>
                                        </div>
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
