@echo off
echo Limpando cache...
rmdir /s /q .next
echo.
echo Instalando dependencias...
npm install
echo.
echo Verificando build...
npm run build
echo.
echo Pronto para deploy! Agora voce pode executar 'vercel' para fazer o deploy. 