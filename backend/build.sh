#!/usr/bin/env bash
# script to build backend on remote servers like Render

echo "Installing required dependencies..."
pip install -r requirements.txt
pip install gdown

echo "Creating models directory..."
mkdir -p models

echo "Downloading ML models from Google Drive..."
# IMPORTANT: Replace these dummy IDs with your actual Google Drive file IDs.
# For example, if your file link is https://drive.google.com/file/d/1ABC/view, the ID is 1ABC.

# 1. Download lstm_model.pkl
gdown --id "1Ot3qYZ2PPeV-3aWRwAE63aggwPi_vbXE" -O models/lstm_model.pkl

# 2. Download xgb_model.pkl 
gdown --id "1SkMzV9Qx3ob7AA9eDMDsuG0ru7A85yup" -O models/xgb_model.pkl

# 3. Download gb_model.pkl (Note: Ensure this ID is correct, it was identical to lstm_model's ID in your paste)
gdown --id "1Ot3qYZ2PPeV-3aWRwAE63aggwPi_vbXE" -O models/gb_model.pkl

# 4. Download xgb_scaler.pkl
gdown --id "1G6EmG2GqMzYzbT4lyGKbKLDIkkOc3WqU" -O models/xgb_scaler.pkl

echo "Build and model download completed successfully!"
