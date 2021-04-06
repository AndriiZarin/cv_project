# cv_project
A simple project for  creating, viewing, and editing CVs.

Windows instructions:

//----Install WSL2+Ubuntu 20.04

//----Install docker desktop, windows terminal


WSL route: \\wsl$\Ubuntu-20.04\home\<username>

//----Create new directory, "CV" for example. Move  all files to working linux directory

//----Update repos

  sudo apt-get update
  
  sudo apt-get upgrade 
  
//----Install vim redactor (optianoly)

  sudo apt-get install vim
  
//----Insall node.js(14 for Ubuntu)

  curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
  
  sudo apt-get install -y nodejs
  
//----Install node modules(server&client): 

  npm run setup
  
//----Add proxy to client/package.json : 

  "proxy": "http://localhost:4000"
  
//----Start Docker Desktop

//----Start docker mongo image(from root folder ("CV")) use makefile

  make up
  
//----Start project (from root folder ("CV"))  (runs on localhost 3000)

  npm start
  
