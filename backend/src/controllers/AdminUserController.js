const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Função para registrar um novo usuário administrador
async function registerAdminUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Validação simples
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email e senha são obrigatórios.' });
    }

    // Verifica se o usuário já existe (por email ou username)
    const existingUser = await prisma.admin_users.findFirst({
      where: { OR: [{ email }, { username }] }
    });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    // Gera hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário no banco de dados
    const newUser = await prisma.admin_users.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });

    // Retorna os dados do usuário sem a senha
    res.status(201).json({
      message: 'Usuário cadastrado com sucesso.',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        created_at: newUser.created_at
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Função para login do usuário administrador
async function loginAdminUser(req, res) {
  try {
    const { email, password } = req.body;

    // Validação simples
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    // Procura o usuário pelo email
    const user = await prisma.admin_users.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Credenciais inválidas.' });
    }

    // Compara a senha fornecida com o hash armazenado
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Credenciais inválidas.' });
    }

    // Gera um token JWT (certifique-se de definir JWT_SECRET em suas variáveis de ambiente)
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login realizado com sucesso.',
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  registerAdminUser,
  loginAdminUser
};