@echo off
if not exist .env (
  copy .env.example .env
)
notepad .env
