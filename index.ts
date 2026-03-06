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

        // --- MELHORIA AQUI: Captura e Limpeza ---
        // Pegamos o texto e removemos TUDO que é espaço extra, quebra de linha ou tabulação.
        // Isso garante que só o TEXTO real das notícias seja comparado.
        const rawContent = $('.item-page').text();
        const currentContent = rawContent.replace(/\s+/g, ' ').trim(); 

        if (!currentContent) {
            console.log("⚠️ Alerta: Conteúdo central não encontrado. O seletor pode ter mudado.");
            return;
        }

        const lastContent = fs.existsSync(FILE_PATH) ? fs.readFileSync(FILE_PATH, 'utf8').trim() : "";

        // Verificamos se mudou E se não é a primeira vez que o bot roda
        if (lastContent !== "" && currentContent !== lastContent) {
            console.log("📢 Mudança detectada! Enviando e-mail...");
            
            const mensagem = `Houve uma nova atualização na página do SISU 2026 do CEFET. Verifique aqui: ${URL}`;
            await sendEmail("🚨 ATUALIZAÇÃO CEFET 2026", mensagem);
            
            // Só atualizamos o arquivo se realmente mudou e enviamos o e-mail
            fs.writeFileSync(FILE_PATH, currentContent);
            console.log("✅ Notificação enviada para " + process.env.EMAIL_RECEIVER);
        } else {
            console.log("✅ Sem alterações reais nas postagens.");
            
            // Se o arquivo estiver vazio (primeira rodada), apenas salva o estado atual
            if (lastContent === "") {
                console.log("📦 Salvando conteúdo inicial para futuras comparações...");
                fs.writeFileSync(FILE_PATH, currentContent);
            }
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
monitorarCefet();
