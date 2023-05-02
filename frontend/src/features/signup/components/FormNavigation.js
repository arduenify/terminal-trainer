const FormNavigation = ({ currentStep, handleNext, handlePrevious }) => {
    return (
        <div className='form-navigation'>
            <button
                type='button'
                onClick={handlePrevious}
                id='prev-button'
                className='button button-primary'
                disabled={currentStep === 1}
                hidden={currentStep === 1}
            >
                Previous
            </button>
            <button
                type='button'
                onClick={handleNext}
                id='next-button'
                className='button button-primary'
                style={currentStep === 1 ? { width: '100%' } : {}}
            >
                Next
            </button>
        </div>
    );
};

export default FormNavigation;
