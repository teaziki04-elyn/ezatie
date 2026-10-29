@echo off
title Push Project Ezati Kamila ke GitHub
color 0B
echo ================================================================
echo       MENGUNGGAH PROYEK CV EZATI KAMILA KE GITHUB
echo   Target: https://github.com/teaziki04-elyn/ezatie.git
echo ================================================================
echo.
cd /d "C:\ezati-cv"
set "PATH=C:\Program Files\Git\cmd;%PATH%"

echo [1/3] Menyiapkan remote origin...
git remote set-url origin https://github.com/teaziki04-elyn/ezatie.git

echo [2/3] Memeriksa status commit...
git add .
git commit -m "Update: Website CV Ezati Kamila - Digital Marketing Strategist & Business Analyst" 2>nul

echo [3/3] Melakukan git push ke branch main...
echo.
echo * Catatan: Jika jendela browser muncul, silakan klik 'Authorize' / 'Sign in'.
echo.

git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ================================================================
    echo   [BERHASIL!] Seluruh proyek telah terunggah ke GitHub!
    echo   Kunjungi: https://github.com/teaziki04-elyn/ezatie
    echo ================================================================
) else (
    echo ================================================================
    echo   [PERHATIAN] Push belum selesai. 
    echo   Pastikan Anda telah menyetujui login GitHub pada browser.
    echo ================================================================
)

echo.
echo Tekan tombol apa saja untuk menutup jendela ini...
pause >nul
