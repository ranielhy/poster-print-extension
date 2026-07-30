# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
# poster-print-extension

## Configuração

Crie uma variável de ambiente `VITE_MELLOWTEL_CONFIGURATION_KEY` com a chave do seu projeto no painel do Mellowtel. Sem essa chave, o popup funciona normalmente, mas os links de suporte do Mellowtel ficam desativados.

Se quiser personalizar o link de apoio, defina também `VITE_MELLOWTEL_INVITE_ID`. O valor padrão usado no app é `cua2gok3nf9`.

Observação: o snippet remoto `widget.js` do site do Mellowtel não é a forma adequada para esta extensão MV3, porque páginas de extensão não devem carregar script remoto. Aqui a monetização fica integrada pelo SDK e pelo link de apoio do painel da Mellowtel.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Publicação

Antes de enviar para a Chrome Web Store, rode `npm run build` e publique o conteúdo gerado em `dist/`. O manifesto já inclui o service worker, o content script do Mellowtel, permissões necessárias e o popup da extensão.
