# Installation Instructions

Due to PowerShell execution policy restrictions, you may need to install dependencies manually. Please follow these steps:

## Option 1: Allow PowerShell Scripts (Recommended)

Run PowerShell as Administrator and execute:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then run:
```bash
npm install
```

## Option 2: Use Command Prompt

Open Command Prompt (cmd) instead of PowerShell and run:
```bash
npm install
```

## Option 3: Manual Installation

If the above options don't work, manually install the required packages:

```bash
npm install express uuid
```

## After Installation

Once dependencies are installed, start the server:

```bash
npm start
```

The server will start on port 3000 by default.
