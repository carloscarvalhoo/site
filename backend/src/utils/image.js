const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
const { ptBR } = require('date-fns/locale');
const sharp = require('sharp');

// Diretório onde as imagens serão salvas
const UPLOAD_DIR = path.join(__dirname, '../uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
}

// Gera um nome único para a imagem no formato JPG
function generateImageName() {
    const date = format(new Date(), "yyyyMMdd-HHmmss", { locale: ptBR });
    const randomNumber = Math.floor(Math.random() * 10000);
    return `${date}-${randomNumber}.jpg`;
}

// Função para fazer o upload e converter imagens para JPG
async function uploadImages(imageFiles) {
    try {
        const uploadedImages = [];
        for (const file of imageFiles) {
            const fileName = generateImageName();
            const filePath = path.join(UPLOAD_DIR, fileName);

            // Verifica o tipo de conteúdo do arquivo
            if (!file.buffer || !Buffer.isBuffer(file.buffer) || file.buffer.length === 0) {
                throw new Error('O buffer da imagem não é válido.');
            }

            await sharp(file.buffer)
                .jpeg({ quality: 75 })
                .toFile(filePath);

            uploadedImages.push(fileName);
        }
        return uploadedImages;
    } catch (error) {
        throw new Error('Erro ao fazer upload das imagens: ' + error.message);
    }
}

// Função para excluir múltiplas imagens
async function deleteImages(imageNames) {
    try {
        for (const imageName of imageNames) {
            const filePath = path.join(UPLOAD_DIR, imageName);

            if (fs.existsSync(filePath)) {
                await fs.promises.unlink(filePath);
            } else {
                console.warn(`Arquivo ${imageName} não encontrado.`);
            }
        }
    } catch (error) {
        throw new Error('Erro ao excluir as imagens: ' + error.message);
    }
}

module.exports = { uploadImages, deleteImages };