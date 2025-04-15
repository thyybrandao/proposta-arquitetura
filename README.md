# 🌐 Arquitetura Frontend Multi-Tenant

Este projeto propõe uma arquitetura frontend moderna e escalável para aplicações **internacionais (multi-tenant)**, permitindo que cada país (ou tenant) tenha:

- Suas **próprias regras de negócio** e componentes;
- Compartilhamento de funcionalidades globais;
- Carregamento dinâmico de módulos conforme o país acessado;
- Uma estrutura organizada e fácil de manter.

---

## 📌 Objetivos

- Escalabilidade e separação clara por país;
- Redução de esforço e retrabalho entre equipes;
- Aproveitamento máximo de componentes e regras globais;
- Baixo acoplamento e fácil manutenção;
- Flexibilidade para incluir novos países com baixo impacto.

---

## 🏁 Configuração de Ambiente

### 🪟 Windows

Edite o arquivo de hosts:
`C:\Windows\System32\drivers\etc\hosts`

### 🐧 Linux

Edite o arquivo de hosts:
`/etc/hosts`

```bash
127.0.0.1  br.localhost
127.0.0.1  es.localhost
127.0.0.1  us.localhost
```

## 🚀 Instalação
#####  📦 Primeiro, instale os pacotes:
```bash
bash
npm install
# or
yarn
```

##### ▶️ Subir o ambiente de desenvolvimento:
```bash
bash
npm run dev
# or
yarn dev
```


## 📁 Estrutura de pastas
| Pasta / Arquivo                 | Descrição                                                                                                                                       |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| src/app                      | Pasta principal do Next.js App Router. Contém rotas e páginas.                                                                                   |
| src/assets                   | Recursos estáticos como imagens, ícones, fontes, etc.                                                                                             |
| src/components               | Componentes reutilizáveis do projeto.                                                                                                             |
| src/components/customs       | Componentes personalizados e específicos de negócio ou domínio.                                                                                  |
| src/components/ui            | Componentes de interface genéricos (botões, modais, inputs, etc).                                                                                 |
| src/constants                | Constantes globais, configurações fixas, textos padrão, etc.                                                                          |
| src/hooks                    | Hooks personalizados do React usados no projeto.                                                                                                  |
| src/lib                      | Funções utilitárias, SDKs, helpers externos ou configurações globais (ex: Axios, i18n).                                                           |
| src/modules                  | Módulos de negócio separados por país (br, es, us). Cada pasta pode conter páginas, containers, lógicas e componentes próprios.            |
| src/repositories             | Abstrações de acesso a dados, APIs ou serviços externos.                                                                                          |
| src/repositories/strategies | Implementações específicas por país das regras de negócio, seguindo o Strategy Pattern. Ex: br/, es/, us/.                                |
| src/shared                   | Recursos compartilhados entre todos os países.                                                                                                    |
| src/shared/@types           | Definições de tipos TypeScript globais.                                                                                                           |
| src/shared/components       | Componentes reutilizáveis globais entre os tenants.                                                                                               |
| src/shared/styles           | Estilos globais ou temas.                                                                                                                         |
| src/shared/stores           | Gerenciamento de estado global (ex: Zustand, Redux, etc).                                                                                         |
| src/shared/utils            | Funções auxiliares genéricas.                                                                                                                     |
| src/middleware.ts           | Middleware do Next.js, utilizado para lógica como roteamento por subdomínio, autenticação ou injeção de tenant.                                  |


## ❓ FAQ

#### ✅ Por que usar constantes ao invés de enums?

- Constantes (as const) são mais leves e funcionam melhor com ferramentas modernas como bundlers e minificadores.
- Permitem melhor inferência de tipos com TypeScript.
- Não geram código JavaScript desnecessário em tempo de execução.
- Mais compatíveis com bibliotecas como zod, react, next, etc.

---

#### ✅ Por que usar Zustand ao invés de Context API ou Redux?

- Zustand é simples, leve e fácil de usar.
- Não precisa de boilerplate como Redux (actions, reducers...).
- Melhora a performance com atualizações mais controladas (por seletores).
- Mais fácil de escalar do que Context API, que re-renderiza tudo.

---

#### ✅ Por que usar design patterns?

- Ajudam a organizar o código e separar responsabilidades.
- Facilitam a manutenção e leitura por outros devs.
- Tornam o projeto escalável e mais fácil de testar.
- Permitem reutilizar soluções já validadas para problemas comuns.

---

#### ✅ Por que criar uma pasta para cada país?

- Cada país pode ter regras e componentes próprios.
- Mantém o código isolado e organizado.
- Facilita a manutenção e personalização por região.
- Permite reaproveitar o que for comum e sobrescrever o que for específico.
