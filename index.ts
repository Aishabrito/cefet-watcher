import axios from 'axios';
import * as cheerio from 'cheerio';
import nodemailer from 'nodemailer';
import fs from 'fs';
import 'dotenv/config';

const URL = 'https://www.cefet-rj.br/index.php/alunos-graduacao/10049-processo-seletivo-para-os-cursos-de-graduacao-edicao-unica-do-sisu-2026-para-preenchimento-das-vagas-de-2026-1-e-2026-2';
const FILE_PATH = './last_content.txt';

console.log("🚀 O script começou!");
async function monitorarCefet() {
    try {
        console.log("🔍 Verificando site do CEFET...");
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);
        const currentContent = $('.item-page').text().trim();

        const lastContent = fs.existsSync(FILE_PATH) ? fs.readFileSync(FILE_PATH, 'utf8') : "";

        if (currentContent !== lastContent && lastContent !== "") {
            const mensagem = `Houve uma nova atualização na página do SISU 2026 do CEFET. Verifique aqui: ${URL}`;
            await sendEmail("🚨 ATUALIZAÇÃO CEFET 2026", mensagem);
            fs.writeFileSync(FILE_PATH, currentContent);
            console.log("📢 Notificação enviada para aisha.paola14@gmail.com");
        } else {
            console.log("✅ Sem alterações.");
            if (lastContent === "") fs.writeFileSync(FILE_PATH, currentContent);
        }
    } catch (error: any) {
        console.error("❌ Erro:", error.message || error);
    }
}

async function sendEmail(subject: string, text: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: `"Monitor CEFET" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECEIVER,
        subject,
        text
    });
}

monitorarCefet();