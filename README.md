# 🎓 CEFET-RJ Updates Watcher
> Bot automatizado para monitorar atualizações no site do CEFET-RJ e enviar notificações via e-mail.

Este projeto foi desenvolvido para garantir que nenhuma atualização importante do CEFET seja perdida, utilizando técnicas de **Web Scraping** e **CI/CD**.

## 🚀 Tecnologias Utilizadas
* **TypeScript** & **Node.js**: Linguagem e ambiente de execução.
* **Axios** & **Cheerio**: Para requisições HTTP e extração de dados do HTML.
* **Nodemailer**: Para o envio automatizado de alertas por e-mail.
* **GitHub Actions**: Para a automação do script na nuvem a cada 30 minutos.

## ⚙️ Como Funciona
1. O robô acessa o site oficial do CEFET-RJ a cada 30 minutos.
2. Ele compara o conteúdo atual com o último estado salvo em um arquivo de texto.
3. Caso detecte uma mudança, um e-mail de alerta é enviado instantaneamente para o administrador.

## 🛠️ Configuração de Segurança
O projeto utiliza **GitHub Secrets** para proteger credenciais sensíveis (E-mail e App Passwords), garantindo que informações privadas nunca fiquem expostas no código público.
