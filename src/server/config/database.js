const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'rsar_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || '', 
    {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3307, // استخدام البورت 3307
        dialect: 'mysql',
        logging: false, // تعطيل السجلات للإنتاج
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// اختبار الاتصال
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('تم إنشاء اتصال قاعدة البيانات بنجاح.');
    } catch (error) {
        console.error('غير قادر على الاتصال بقاعدة البيانات:', error);
    }
}

testConnection();

module.exports = sequelize;
