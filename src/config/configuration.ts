export default () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    database: {
        url: process.env.DATABASE_URL,
        poolMax: process.env.DATABASE_POOL_MAX || 10
    },
    nodeEnv: process.env.NODE_ENV || 'development',
});
