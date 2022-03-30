import { renderToString } from "react-dom/server";
import { Invoice } from "../schemas/types/invoice";
import { showInvoice } from "../templates/invoices/show";
import puppeteer = require('puppeteer');

export async function createPdf(invoiceBody: Invoice) {
    // launch a new chrome instance
    const browser = await puppeteer.launch({
        headless: true
    });

    // create a new page
    const page = await browser.newPage();

    // disable javascript
    await page.setJavaScriptEnabled(false);

    // get the string html page
    const html = renderToString(await showInvoice(invoiceBody));
  
    // set your html as the pages content
    await page.setContent(html);
  
    // create a pdf buffer
    const pdfBuffer = await page.pdf();
  
    // close the page and the browser
    await page.close();
    await browser.close();
  
    return pdfBuffer;
}