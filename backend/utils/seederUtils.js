const getQueryInterfaceOptions = () => {
    if (process.env.NODE_ENV === 'production') {
        return { schema: process.env.DB_SCHEMA };
    }

    return {
        logging: console.log,
    };
};

module.exports = {
    getQueryInterfaceOptions,
};
