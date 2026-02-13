# 🚀 First-Time GitHub Setup in WSL (Ubuntu) Using SSH

Follow these steps to configure Git and connect WSL to GitHub securely using SSH authentication.

---

## 1️⃣ Install Git (if not installed)

```bash
sudo apt update
sudo apt install git -y
git --version
```

---

## 2️⃣ Configure Git Identity (One-Time Setup)

```bash
git config --global user.name "Your Name"
git config --global user.email "your_github_email@example.com"
git config --global --list
```

---

## 3️⃣ Generate SSH Key

```bash
ssh-keygen -t ed25519 -C "your_github_email@example.com"
```

Press **Enter** for file location and passphrase.

---

## 4️⃣ Start SSH Agent and Add Key

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

---

## 5️⃣ Copy Public Key

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the output and add it to:

GitHub → Settings → SSH and GPG Keys → New SSH Key  
https://github.com/settings/keys

---

## 6️⃣ Test SSH Connection

```bash
ssh -T git@github.com
```

Type `yes` if prompted.

You should see:
```
Hi YOUR_USERNAME! You've successfully authenticated.
```

---

## 7️⃣ Initialize Repository (Inside Project Folder)

```bash
cd /path/to/your/project
git init
```

---

## 8️⃣ Add Remote Repository (SSH)

```bash
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPOSITORY.git
git remote -v
```

---

## 9️⃣ Add, Commit and Push

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

---

## ✅ Future Pushes

```bash
git push
```

No passwords required after SSH setup.

---

## 🔧 Common Fixes

### If branch error:
```bash
git add .
git commit -m "Initial commit"
```

### If remote was HTTPS:
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPOSITORY.git
```

---

🎉 Your WSL is now permanently connected to GitHub using SSH.
