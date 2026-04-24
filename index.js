const express = require('express');
const app = express();
const port = 3000;

const { google } = require("googleapis");
const path = require("path");

const KEY_FILE_PATH = path.join(__dirname, "key.json");
const SPREADSHEET_ID = '1ohb09wXcnq7edjCP5WhUKj8qAgcxX3d9_YjfjBmm3V8';
const RANGE = 'Class Data!A1:Z1000';



app.get('/getSheetData', async (req, res) => {
    try {

        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_FILE_PATH,
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const client = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: client });


        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No data found in the spreadsheet",
                data: []
            });
        }

        const formattedData = rows.map((row, index) => ({
            rowNumber: index + 1,
            values: row
        }));


        const useHeaders = req.query.useHeaders === 'true';
        let result;

        if (useHeaders && rows.length > 0) {
            const headers = rows[0];
            const dataRows = rows.slice(1);

            result = {
                success: true,
                headers: headers,
                data: dataRows.map(row => {
                    const obj = {};
                    headers.forEach((header, index) => {
                        obj[header] = row[index] || '';
                    });
                    return obj;
                }),
                totalRows: dataRows.length
            };
        } else {
            result = {
                success: true,
                totalRows: rows.length,
                data: rows,
                formattedData: formattedData
            };
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error("Error:", error.message);
        console.error("Full error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch spreadsheet data",
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});