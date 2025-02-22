const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getColors(req, res) {
  try {
    const colors = await prisma.colors.findMany();
    res.status(200).json(colors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getColors };