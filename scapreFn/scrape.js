const pupeteer = require("puppeteer");
const fs = require("fs");
const data = {
    list: []
}


async function main(skill){
    const browser = await pupeteer.launch({headless: false});   //launches chromium

    const page = await browser.newPage(); //open new tab
    await page.goto(`https://in.indeed.com/jobs?q=${skill}&l=Bengaluru%2C+Karnataka`, {
        timeout: 0,
        waitUntil: 'networkidle0'
    });

    // const pdf = await page.pdf({
    //     path: "",
    //     format: "A4"
    // })

    // const screenShot = page.screenshot({
    //   path: "",
    //   fullPage: true  
    // })

    const jobData = await page.evaluate(async(data) =>{
        const items = document.querySelectorAll('td.resultContent');
        items.forEach((item, index) =>{
            const title = item.querySelector('h2.jobTitle>a')?.innerText;
            const link = item.querySelector('h2.jobTitle>a')?.href;
            let salary = item.querySelector('div.metadata.salary-snippet-container > div')?.innerText;
            const companyName = item.querySelector('span.company-name')?.innerHTML;
            
            if(salary === null){
                salary = "not defined"
            }

            data.list.push({
                title,
                salary,
                companyName,
                link
            })
        });
        return data;
    }, data);

    let response = await jobData;
    let json = await JSON.stringify(jobData, null, 2);
    fs.writeFile("job.json", json, "utf-8", () => {
        console.log("Written in nob.json");
    });
    browser.close(); //closes the browser
    return response;
};

module.exports = main;