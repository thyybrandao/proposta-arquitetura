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
| src/middleware.ts           | Middleware do Next.js, utilizado para lógica como roteamento por subdomínio, autenticação ou injeção de tenant.  

---

## 🧭 Atalhos de Importação (`tsconfig paths`)

Para facilitar e padronizar os imports no projeto, utilizamos **aliases** definidos no `tsconfig.json`. Isso evita caminhos relativos longos e melhora a organização e legibilidade do código.

```json
"paths": {
  "@/*": ["./src/*", "./cypress", "./cypress.config.ts"],
  "@/assets/*": ["./src/assets/*"],
  "@/components/*": ["./src/components/*"],
  "@/lib/*": ["./src/lib/*"],
  "@/modules/*": ["./src/modules/*"],
  "@/repositories/*": ["./src/repositories/*"],
  "@/shared/*": ["./src/shared/*"],
  "@/utils/*": ["./src/utils/*"]
} 
```

| Alias             | Caminho real           | Descrição                                                                 |
|-------------------|------------------------|---------------------------------------------------------------------------|
| `@/`             | `src/`                | Acesso genérico à raiz da pasta `src/`. Também inclui arquivos de configuração e testes. |
| `@/assets`       | `src/assets/`         | Imagens, ícones, fontes e demais recursos estáticos.                     |
| `@/components`   | `src/components/`     | Componentes reutilizáveis, incluindo `customs` e `ui`.                   |
| `@/lib`          | `src/lib/`            | SDKs, helpers externos e configurações globais (ex: `i18n`, `axios`).    |
| `@/modules`      | `src/modules/`        | Módulos de negócio por país/tenant, com lógica e componentes próprios.   |
| `@/repositories` | `src/repositories/`   | Acesso a dados externos, APIs e estratégias específicas por país.        |
| `@/shared`       | `src/shared/`         | Código e recursos compartilhados entre todos os países.                 |
| `@/utils`        | `src/utils/`          | Funções auxiliares genéricas reutilizáveis em qualquer parte do projeto. |

---

## 🧩 Design Patterns Utilizados

Para manter o projeto organizado, escalável e de fácil manutenção, aplicamos alguns **design patterns** no código, em especial o **Strategy Pattern** e o **Mediator Pattern**.

### 🧠 Strategy Pattern

Usado para separar **regras de negócio específicas por país (tenant)**.  
Cada país pode ter uma implementação diferente de determinada funcionalidade (como frete, descontos, tributos, exibição de conteúdo, etc), sem afetar os demais.

#### ✅ Benefícios:
- Facilita a substituição ou extensão de regras sem alterar o código principal.
- Permite isolar lógica específica de cada país.
- Ideal para ambientes multi-tenant e internacionalização.


### 🧠 Mediator Pattern

No contexto de aplicações React, o Mediator Pattern é utilizado para **promover a comunicação entre componentes sem que eles estejam diretamente acoplados entre si**.

Em vez de um componente pai passar props para vários níveis de filhos (*prop drilling*), ou de componentes irmãos se comunicarem diretamente, usamos um intermediador — que pode ser:

- Um store de estado global (como Zustand);
- Um event bus customizado;
- Um contexto bem isolado;
- Ou até mesmo um pub/sub simples.

#### ✅ Benefícios:
- Reduz o acoplamento entre componentes.
- Melhora a escalabilidade da aplicação.
- Facilita o reaproveitamento e testes dos componentes.
- Evita que alterações em um componente impactem diretamente outros.

#### 📌 Exemplos práticos:
- Um componente de modal que pode ser aberto a partir de qualquer parte da aplicação.
- Um sistema de notificações (toast) que escuta eventos globais.
- Um formulário complexo dividido em múltiplos componentes que se coordenam via store (ex: Zustand).
- Um carrinho de compras acessível por componentes distintos.

---


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

---

#### ✅ Por que usar o React Hook Form?

- Tem melhor performance e evita re-renders desnecessários.
- Possui API enxuta e focada em produtividade.
- Integra-se facilmente com bibliotecas de UI (como MUI, AntD, etc.).
- Suporta validação nativa e com bibliotecas como Zod e Yup.
- É ideal para projetos modernos com foco em performance e escalabilidade.

---

#### ✅ Por que usar o Zod?

- Gera automaticamente os tipos TypeScript a partir do schema.
- Tem sintaxe declarativa, funcional e moderna.
- É mais leve que outras bibliotecas de validação (como o Yup).
- Integra-se perfeitamente com ferramentas como React Hook Form e tRPC.
- É ideal para stacks modernas baseadas em TypeScript.

---

#### ✅ Por que usar o Jest?

- É o framework de testes mais popular no ecossistema React.
- Permite testar funções, hooks, componentes e lógica de negócio.
- Tem suporte nativo a mocks, spies e cobertura de código.
- Integra-se facilmente com TypeScript e bibliotecas como Testing Library.
- Ideal para testes unitários e de integração leves e rápidos.

---

#### ✅ Por que usar o Cypress?

- Permite testes end-to-end com uma interface visual e intuitiva.
- Simula o comportamento real do usuário no navegador.
- Possui recarregamento automático, timelapse e debug visual.
- Ideal para garantir que o fluxo completo da aplicação funciona.
- Ótimo para validar jornadas do usuário em ambientes reais.