# 📝 Journal Application

A simple full-stack journal app where users can write, view, and delete journal entries.
The application is deployed using Docker and Kubernetes.

---

## 🚀 Features

* Add journal entries
* View all entries
* Delete entries
* Data stored in MongoDB

---

## Video Demonstration

https://github.com/user-attachments/assets/df3153af-3e00-4648-956d-68a2d11ae573



## 🛠️ Tech Stack

* Node.js + Express
* MongoDB
* HTML, CSS, JavaScript
* Docker
* Kubernetes (Minikube)

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/anshika231106/Journal-Application.git
cd Journal-Application
```

---

### 2. Start Minikube

```
minikube start
```

---

### 3. Connect Docker to Minikube

**Git Bash:**

```
eval $(minikube -p minikube docker-env)
```

**PowerShell:**

```
minikube -p minikube docker-env | Invoke-Expression
```

---

### 4. Build Docker Image

```
docker build --no-cache -t journal-app .
```

---

### 5. Deploy to Kubernetes

```
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-service.yaml

kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
```

---

### 6. Run the App

```
minikube service journal-service
```

---

## 🧪 Usage

* Open the app in browser
* Write a journal entry
* Click **Add Entry**
* Entries will be saved and displayed
* You can delete entries anytime

---

## 🧠 Notes

* If you change code, rebuild the Docker image:

```
docker build --no-cache -t journal-app .
```

* MongoDB connection is handled using Kubernetes service (`mongo`)

---

## 📌 Project Overview

This project demonstrates a full-stack application deployed using Docker and Kubernetes, with Node.js serving both frontend and backend, and MongoDB for data storage.

---
