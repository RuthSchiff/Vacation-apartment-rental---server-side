# Vacation apartment rental

## Description
This project is a Node.js application that uses Express.js for building a RESTful API. The application connects to a MongoDB database and provides endpoints for managing advertisers, cities, categories, and apartments. It also supports user authentication using JWT tokens and file uploads using Multer.

## Installation
1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd nodeJS
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Environment Variables
Create a `.env` file in the root directory and add the following environment variables:
```
SECRET=<your-secret-key>
LOCAL_URI=mongodb://localhost:27017/Project_DB
```

## Running the Application
Start the application:
```sh
npm start
```
The application will be running on `http://localhost:3002`.

## API Endpoints
### Advertisers
- `GET /advertiser` - Get all advertisers
- `POST /advertiser/register` - Register a new advertiser
- `POST /advertiser/login` - Login an advertiser
- `PATCH /advertiser/:id` - Update an advertiser
- `PATCH /advertiser/:id/addTokens` - Add tokens to all advertisers

### Cities
- `GET /city` - Get all cities
- `POST /city` - Create a new city
- `PATCH /city/:id` - Update a city

### Categories
- `GET /categorys` - Get all categories
- `POST /categorys` - Create a new category
- `PATCH /categorys/:id` - Update a category

### Apartments
- `GET /apartments` - Get all apartments
- `POST /apartments` - Create a new apartment
- `DELETE /apartments/:id` - Delete an apartment
- `PATCH /apartments/:id` - Update an apartment
- `GET /apartments/getById/:id` - Get an apartment by ID
- `GET /apartments/getByCatgeory/:id` - Get apartments by category
- `GET /apartments/getByCity/:id` - Get apartments by city
- `GET /apartments/getByBedsLt/:beds` - Get apartments with beds less than or equal to
- `GET /apartments/getByBedsBg/:beds` - Get apartments with beds greater than
- `GET /apartments/getByBedseq/:beds` - Get apartments with beds equal to
- `GET /apartments/getByPriceLt/:price` - Get apartments with price less than
- `GET /apartments/getByPriceMi/:price` - Get apartments with price between
- `GET /apartments/getByPriceBg/:price` - Get apartments with price greater than
- `GET /apartments/getByAdvertiser/:id` - Get apartments by advertiser



---

# השכרת דירות

## תיאור
פרויקט זה הוא יישום Node.js המשתמש ב-Express.js לבניית API RESTful. היישום מתחבר למסד נתונים MongoDB ומספק נקודות קצה לניהול מפרסמים, ערים, קטגוריות ודירות. הוא גם תומך באימות משתמשים באמצעות טוקנים של JWT והעלאת קבצים באמצעות Multer.

## התקנה
1. שיבוט המאגר:
    ```sh
    git clone <repository-url>
    ```
2. נווט לספריית הפרויקט:
    ```sh
    cd nodeJS
    ```
3. התקן את התלויות:
    ```sh
    npm install
    ```

## משתני סביבה
צור קובץ `.env` בספריית השורש והוסף את משתני הסביבה הבאים:
```
SECRET=<your-secret-key>
LOCAL_URI=mongodb://localhost:27017/Project_DB
```

## הפעלת היישום
הפעל את היישום:
```sh
npm start
```
היישום יפעל ב-`http://localhost:3002`.

## נקודות קצה של ה-API
### מפרסמים
- `GET /advertiser` - קבל את כל המפרסמים
- `POST /advertiser/register` - רישום מפרסם חדש
- `POST /advertiser/login` - התחברות מפרסם
- `PATCH /advertiser/:id` - עדכון מפרסם
- `PATCH /advertiser/:id/addTokens` - הוספת טוקנים לכל המפרסמים

### ערים
- `GET /city` - קבל את כל הערים
- `POST /city` - יצירת עיר חדשה
- `PATCH /city/:id` - עדכון עיר

### קטגוריות
- `GET /categorys` - קבל את כל הקטגוריות
- `POST /categorys` - יצירת קטגוריה חדשה
- `PATCH /categorys/:id` - עדכון קטגוריה

### דירות
- `GET /apartments` - קבל את כל הדירות
- `POST /apartments` - יצירת דירה חדשה
- `DELETE /apartments/:id` - מחיקת דירה
- `PATCH /apartments/:id` - עדכון דירה
- `GET /apartments/getById/:id` - קבל דירה לפי מזהה
- `GET /apartments/getByCatgeory/:id` - קבל דירות לפי קטגוריה
- `GET /apartments/getByCity/:id` - קבל דירות לפי עיר
- `GET /apartments/getByBedsLt/:beds` - קבל דירות עם מיטות פחות או שווה ל
- `GET /apartments/getByBedsBg/:beds` - קבל דירות עם מיטות יותר מ
- `GET /apartments/getByBedseq/:beds` - קבל דירות עם מיטות שווה ל
- `GET /apartments/getByPriceLt/:price` - קבל דירות עם מחיר פחות מ
- `GET /apartments/getByPriceMi/:price` - קבל דירות עם מחיר בין
- `GET /apartments/getByPriceBg/:price` - קבל דירות עם מחיר יותר מ
- `GET /apartments/getByAdvertiser/:id` - קבל דירות לפי מפרסם


