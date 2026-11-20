@echo off
title ImmoVision VR - Capstone Project Launcher (Alinur S. 240014)
color 0b
echo =======================================================================
echo   IMMOVISION VR: Interactive Off-Plan Apartment Tour
echo   Student: Alinur Sabit (ID: 240014, Group: AIB-2401)
echo   Client:  BI Group Development (Astana Central Sales)
echo =======================================================================
echo.
echo [1/2] Checking local WebXR HTTP server...

cd /d "%~dp0"
if exist "ImmoVisionVR\index.html" cd ImmoVisionVR

netstat -ano | findstr :8080 | findstr LISTENING >nul
if %errorlevel% equ 0 (
    echo   -^> Local server is already running on http://localhost:8080
) else (
    echo   -^> Starting Python HTTP server on port 8080...
    start "ImmoVision VR HTTP Server" /min python -m http.server 8080
    timeout /t 1 /nobreak >nul
)

echo.
echo [2/2] Opening Chrome / Default WebXR Browser at http://localhost:8080 ...
start http://localhost:8080
echo.
echo =======================================================================
echo   PROJECT RUNNING!
echo   Open your browser to: http://localhost:8080
echo =======================================================================
echo.
timeout /t 5
