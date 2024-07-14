const { PrismaClient } = require('@prisma/client')
let prisma = null
const logger = require('./logger')
try {
    const prisma = new PrismaClient()
    logger.info(`[System] Prisma Client connected successfully!!`)
    module.exports = prisma
} catch (error) {
    logger.error(`[System] Prisma Client connection failed with reason: ${error.message}`)
}
