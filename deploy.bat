@echo off
echo 🌠 诗意星空 - GitHub Pages 部署脚本
echo =====================================
echo.

echo 请按照以下步骤完成部署：
echo.
echo 1. 在GitHub上创建新仓库 (建议名称: poetry-converter)
echo 2. 确保仓库设置为 Public
echo 3. 运行以下命令：
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/poetry-converter.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 4. 在GitHub仓库设置中启用 Pages
echo 5. 选择 "GitHub Actions" 作为源
echo.
echo 部署完成后，您的网站将在以下地址可用：
echo https://YOUR_USERNAME.github.io/poetry-converter/
echo.
echo 详细说明请查看 "部署指南.md" 文件
echo.
pause

