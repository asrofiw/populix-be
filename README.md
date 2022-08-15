<p align="center">
  <h3 align="center">Populix Backend Test</h3>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Populix backend test

### Built With

[![Node.js](https://img.shields.io/badge/Node.js-v.14.18.3-green.svg?style=rounded-square)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://github.com/expressjs/express)
[![MySQL](https://img.shields.io/badge/MySQL-2.x-brightgreen.svg?style=rounded-square)](https://github.com/sidorares/node-mysql2)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/asrofiw/populix-be.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Setup environment variable
   ```sh
   cp .env.example .env
   ```
   adjust all credential on .env file
4. Migrating database & seed first role + admin

   ```sh
   npm run migrations
   ```

   sample output

   ```sh
   Database populix created.
   Table role created
   Table user created
   Rows role added
   Rows user added
      user 1: super-admin@admin.com
      user 2: admin@admin.com
      password default: 12345678#
   ```

<!-- USAGE EXAMPLES -->

## Usage

1. Development Mode

   ```sh
   npm run dev
   ```

   Now you can login using admin account created on migration (Installation step 5)

2. Test Mode

   ```sh
   npm run test
   ```
