# CEFET Watcher 

## 💬 Contexto

Esse projeto nasceu de uma necessidade muito específica e pessoal: eu precisava saber assim que a página do processo seletivo SISU 2026 do CEFET-RJ fosse atualizada — e não queria depender de ficar checando manualmente.

Então escrevi um script que faz isso por mim e roda automaticamente a cada 30 minutos, sem precisar de servidor, sem custo, sem manutenção.

---

## 🤖 Como funciona

```
GitHub Actions acorda a cada 30 minutos
        ↓
Script acessa a página do CEFET
        ↓
Compara o conteúdo com a última versão salva
        ↓
Se mudou → envia e-mail de alerta
Se não mudou → volta a dormir
```

O conteúdo anterior fica salvo via **GitHub Actions Cache**, garantindo que a comparação funcione corretamente entre execuções.

---

## 🛠️ Stack

| Tecnologia | Função |
|---|---|
| TypeScript | Linguagem principal |
| Axios + Cheerio | Web scraping da página |
| Nodemailer | Envio de e-mail de alerta |
| GitHub Actions | Agendamento e execução automática |
| GitHub Cache | Persistência do conteúdo entre execuções |

---

## ⚙️ Estrutura

```
cefet-watcher/
├── index.ts                        # Script principal
├── .github/
│   └── workflows/
│       └── monitor.yml             # Agendamento via GitHub Actions
└── .env                            # Credenciais (não versionado)
```

---

## 🔒 Segurança

As credenciais de e-mail ficam armazenadas nos **GitHub Secrets** — nunca expostas no código ou no histórico de commits.

---

## 💡 O que esse projeto demonstra

- Automação com **GitHub Actions** sem precisar de servidor
- **Web scraping** com detecção de mudança de conteúdo
- Uso de **cache entre execuções** de CI/CD
- Gestão segura de credenciais com **secrets**
- Resolução de um problema real com código simples e direto

---

## 👩‍💻 Sobre

Desenvolvido por **Aisha Brito** — estudante de Engenharia Eletrônica e de Computação na UFRJ.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Aísha_Brito-blue)](https://www.linkedin.com/in/a%C3%ADsha-brito-9567bb226/)
[![GitHub](https://img.shields.io/badge/GitHub-Aishabrito-black)](https://github.com/Aishabrito)
