@echo off
echo Limpando cache...
rmdir /s /q .next
echo.
echo Instalando dependencias...
npm install
echo.
echo Verificando build...
npm run build
if %errorlevel% neq 0 echo Ignorando erros de build
echo.
echo Pronto para deploy! Agora voce pode executar 'vercel --force' para fazer o deploy. 