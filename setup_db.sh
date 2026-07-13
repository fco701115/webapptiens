#!/bin/bash
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '123456';"
sudo -u postgres psql -c "CREATE DATABASE weboutshop;"
echo SETUP_DONE
